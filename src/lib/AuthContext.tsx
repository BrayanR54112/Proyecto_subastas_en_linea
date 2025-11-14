import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User as MockUserType } from './mockData'; // Importamos tu tipo de usuario
import { auth, db } from './firebaseConfig'; // <-- ¡CORREGIDO! Faltaba el "./"
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User as FirebaseUser // Renombramos el tipo de Firebase
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

// El tipo de usuario en la app puede ser tu tipo, o null
type AppUser = MockUserType | null;

interface AuthContextType {
  user: AppUser;
  firebaseAuthUser: FirebaseUser | null; // El usuario real de Firebase
  isAuthenticated: boolean;
  loading: boolean; // Añadimos un estado de carga
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser>(null); // Tu perfil de usuario de Firestore
  const [firebaseAuthUser, setFirebaseAuthUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true); // Empezamos cargando

  useEffect(() => {
    // onAuthStateChanged es el listener en tiempo real de Firebase Auth
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setFirebaseAuthUser(fbUser); // Guarda el usuario de auth de Firebase

      if (fbUser) {
        // Si el usuario se loguea, busca su perfil en Firestore
        const userDocRef = doc(db, 'users', fbUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUser(userDoc.data() as MockUserType); // Guarda el perfil de Firestore
        } else {
          // Esto puede pasar si un usuario se registra pero falla la creación del doc
          setUser(null);
        }
      } else {
        // Si no hay usuario, limpiar ambos estados
        setUser(null);
      }
      setLoading(false); // Terminamos de cargar
    });

    // Limpia el listener al desmontar
    return () => unsubscribe();
  }, []);

  // --- Función de Login ---
  const login = async (email: string, password: string) => {
    // signInWithEmailAndPassword se encarga de todo.
    // El listener 'onAuthStateChanged' de arriba detectará el cambio y actualizará el estado.
    await signInWithEmailAndPassword(auth, email, password);
  };

  // --- Función de Logout ---
  const logout = () => {
    signOut(auth); // El listener 'onAuthStateChanged' se encargará del resto.
  };

  // --- Función de Registro ---
  const register = async (name: string, email: string, password: string) => {
    // 1. Crea el usuario en Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const fbUser = userCredential.user;

    // 2. Crea el documento de perfil en Firestore
    // Usamos tu tipo 'User' de mockData como plantilla
    const newUserProfile: MockUserType = {
      id: fbUser.uid,
      name: name,
      email: email,
      avatar: `https://ui-avatars.com/api/?name=${name.replace(' ', '+')}`, // Avatar por defecto
      rating: 0,
      totalAuctions: 0,
      activeSales: 0,
      upcomingSales: 0
    };

    // 3. Guarda el perfil en la colección 'users' con el ID del usuario
    await setDoc(doc(db, 'users', fbUser.uid), newUserProfile);
    
    // El listener 'onAuthStateChanged' detectará el nuevo usuario
    // y cargará este perfil que acabamos de guardar.
  };

  return (
    <AuthContext.Provider value={{
      user, // Tu objeto de perfil
      firebaseAuthUser, // El objeto de auth de Firebase
      isAuthenticated: !!user,
      loading, // Para que App.tsx sepa si está cargando
      login,
      register, // Añadimos registrar
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
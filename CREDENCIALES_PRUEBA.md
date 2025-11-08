

### Administrador
- **Email:** `michael@quiendamas.com`
- **Contraseña:** `admin123`
- **Nombre:** Administrador

###  Usuario Prueba
- **Email:** `usuario@quienmas.com`
- **Contraseña:** `usuario123`
- **Nombre:** Usuario Prueba

### Usuario Test
- **Email:** `prueba@quiendamas.com`
- **Contraseña:** `prueba123`
- **Nombre:** Usuario para probar




##  Características del Mock

- **Delay realista:** Simula el tiempo de respuesta de un servidor real
- **Tokens JWT mock:** Genera tokens válidos para pruebas
- **Validación completa:** Verifica email y contraseña
- **Persistencia:** Guarda el token en localStorage
- **Recordarme:** Funciona la opción de recordar usuario
- **Logout:** Limpia correctamente la sesión

##  Cambiar a Servicio Real

Para cambiar al servicio real del backend, simplemente cambia en `src/app/login/page.tsx`:

```typescript
// Cambiar de:
import { useMockAuth } from '../../hooks/useMockAuth';
const { login, isLoading, error, clearError } = useMockAuth();

// A:
import { useAuth } from '../../hooks/useAuth';
const { login, isLoading, error, clearError } = useAuth();
```
}

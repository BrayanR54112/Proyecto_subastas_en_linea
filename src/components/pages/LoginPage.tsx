import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../lib/AuthContext';

export function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-red-600 tracking-wider mb-4">¿QUIÉN DA MÁS?</h1>
          <h2 className="text-white mb-2">Bienvenido de Nuevo</h2>
          <p className="text-white/60">Inicia sesión para acceder a tu cuenta</p>
        </div>

        {/* Login Form */}
        <div className="bg-zinc-900 border border-white/5 rounded-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-white/80 text-sm mb-2 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <Input
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-black/50 border-white/10 text-white pl-10"
                />
              </div>
            </div>

            <div>
              <label className="text-white/80 text-sm mb-2 block">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-black/50 border-white/10 text-white pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-white/60 cursor-pointer">
                <input type="checkbox" className="rounded border-white/10" />
                Recordarme
              </label>
              <a href="#" className="text-red-600 hover:text-red-500">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
              Iniciar Sesión
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-white/60">
            ¿No tienes cuenta?{' '}
            <a href="#" className="text-red-600 hover:text-red-500">
              Regístrate aquí
            </a>
          </div>
        </div>

        {/* Demo Info */}
        <div className="mt-6 bg-red-600/10 border border-red-600/20 rounded-lg p-4">
          <p className="text-red-400 text-sm text-center">
            💡 Demo: Ingresa cualquier email y contraseña para acceder
          </p>
        </div>
      </div>
    </div>
  );
}

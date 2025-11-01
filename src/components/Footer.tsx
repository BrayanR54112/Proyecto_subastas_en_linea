import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/5">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h2 className="text-red-600 mb-4">¿QUIÉN DA MÁS?</h2>
            <p className="text-white/60 mb-6">
              La plataforma de subastas más confiable de Latinoamérica. Encuentra tesoros únicos y participa en subastas emocionantes.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-white/5 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors">
                <Linkedin className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white mb-6">Enlaces Rápidos</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/60 hover:text-red-600 transition-colors">Sobre Nosotros</a></li>
              <li><a href="#" className="text-white/60 hover:text-red-600 transition-colors">Cómo Funciona</a></li>
              <li><a href="#" className="text-white/60 hover:text-red-600 transition-colors">Categorías</a></li>
              <li><a href="#" className="text-white/60 hover:text-red-600 transition-colors">Blog</a></li>
              <li><a href="#" className="text-white/60 hover:text-red-600 transition-colors">Contacto</a></li>
            </ul>
          </div>

          {/* Categorías */}
          <div>
            <h4 className="text-white mb-6">Categorías</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/60 hover:text-red-600 transition-colors">Relojes de Lujo</a></li>
              <li><a href="#" className="text-white/60 hover:text-red-600 transition-colors">Vehículos Clásicos</a></li>
              <li><a href="#" className="text-white/60 hover:text-red-600 transition-colors">Arte y Pinturas</a></li>
              <li><a href="#" className="text-white/60 hover:text-red-600 transition-colors">Coleccionables</a></li>
              <li><a href="#" className="text-white/60 hover:text-red-600 transition-colors">Joyería</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white mb-6">Newsletter</h4>
            <p className="text-white/60 mb-4">
              Recibe notificaciones sobre nuevas subastas y ofertas exclusivas.
            </p>
            <div className="flex gap-2">
              <div className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 flex items-center gap-2">
                <Mail className="w-4 h-4 text-white/50" />
                <input 
                  type="email" 
                  placeholder="Tu email" 
                  className="bg-transparent border-none outline-none text-white placeholder:text-white/50 w-full"
                />
              </div>
              <button className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg text-white transition-colors">
                Suscribir
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © 2025 ¿Quién da más? Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-white/40 hover:text-white transition-colors">Privacidad</a>
            <a href="#" className="text-white/40 hover:text-white transition-colors">Términos</a>
            <a href="#" className="text-white/40 hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

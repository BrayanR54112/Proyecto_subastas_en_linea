import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { useState } from 'react';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('¡Mensaje enviado! Nos pondremos en contacto contigo pronto.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-black pt-32 pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Hero */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <span className="text-red-600 tracking-widest uppercase text-sm mb-4 block">
            Contacto
          </span>
          <h2 className="text-white mb-6">
            ¿Necesitas <span className="text-red-600">Ayuda?</span>
          </h2>
          <p className="text-white/70">
            Estamos aquí para ayudarte. Envíanos un mensaje y te responderemos lo antes posible.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-zinc-900 border border-white/5 rounded-xl p-6">
              <div className="w-12 h-12 bg-red-600/10 rounded-full flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-red-600" />
              </div>
              <h4 className="text-white mb-2">Email</h4>
              <p className="text-white/60 text-sm">contacto@quiendamas.com</p>
              <p className="text-white/60 text-sm">soporte@quiendamas.com</p>
            </div>

            <div className="bg-zinc-900 border border-white/5 rounded-xl p-6">
              <div className="w-12 h-12 bg-red-600/10 rounded-full flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-red-600" />
              </div>
              <h4 className="text-white mb-2">Teléfono</h4>
              <p className="text-white/60 text-sm">+52 55 1234 5678</p>
              <p className="text-white/60 text-sm">Lun - Vie: 9:00 - 18:00</p>
            </div>

            <div className="bg-zinc-900 border border-white/5 rounded-xl p-6">
              <div className="w-12 h-12 bg-red-600/10 rounded-full flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-red-600" />
              </div>
              <h4 className="text-white mb-2">Oficina</h4>
              <p className="text-white/60 text-sm">
                Av. Paseo de la Reforma 505
                <br />
                Ciudad de México, CDMX
                <br />
                México 06500
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-zinc-900 border border-white/5 rounded-xl p-8">
            <h3 className="text-white mb-6">Envíanos un Mensaje</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-white/80 text-sm mb-2 block">Nombre</label>
                  <Input
                    type="text"
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-black/50 border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="text-white/80 text-sm mb-2 block">Email</label>
                  <Input
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-black/50 border-white/10 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-white/80 text-sm mb-2 block">Asunto</label>
                <Input
                  type="text"
                  placeholder="¿En qué podemos ayudarte?"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="bg-black/50 border-white/10 text-white"
                />
              </div>

              <div>
                <label className="text-white/80 text-sm mb-2 block">Mensaje</label>
                <Textarea
                  placeholder="Escribe tu mensaje aquí..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={6}
                  className="bg-black/50 border-white/10 text-white resize-none"
                />
              </div>

              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                <Send className="w-4 h-4 mr-2" />
                Enviar Mensaje
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

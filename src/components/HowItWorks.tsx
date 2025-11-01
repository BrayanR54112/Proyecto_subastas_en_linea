import { Search, Gavel, Trophy, Shield } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: Search,
      number: '01',
      title: 'Explora',
      description: 'Busca entre miles de artículos únicos y encuentra lo que buscas.'
    },
    {
      icon: Gavel,
      number: '02',
      title: 'Oferta',
      description: 'Participa en subastas en tiempo real y haz tu mejor oferta.'
    },
    {
      icon: Trophy,
      number: '03',
      title: 'Gana',
      description: 'Consigue el artículo al mejor precio y recíbelo en casa.'
    },
    {
      icon: Shield,
      number: '04',
      title: 'Seguridad',
      description: 'Todas las transacciones están protegidas y garantizadas.'
    }
  ];

  return (
    <section className="bg-zinc-950 py-20 border-y border-white/5">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-red-600 tracking-widest uppercase text-sm mb-3 block">
            ¿Cómo funciona?
          </span>
          <h3 className="text-white mb-4">Simple y Seguro</h3>
          <p className="text-white/60 max-w-2xl mx-auto">
            Participa en subastas de manera fácil y segura en solo 4 pasos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="relative group">
              <div className="bg-zinc-900 border border-white/5 rounded-xl p-8 hover:border-red-600/50 transition-all duration-300">
                {/* Number */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-16 h-16 bg-red-600/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-600/20 transition-colors">
                  <step.icon className="w-8 h-8 text-red-600" />
                </div>

                {/* Content */}
                <h4 className="text-white mb-3">{step.title}</h4>
                <p className="text-white/60 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Connector Line */}
              {step.number !== '04' && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-red-600/50 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

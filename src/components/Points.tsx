import { Leaf, Calendar, Heart, Sparkles } from 'lucide-react';

const points = [
  {
    icon: Leaf,
    title: 'Prodotti a Km 0',
    description: 'Ingredienti provenienti dalle aziende agricole del territorio',
  },
  {
    icon: Calendar,
    title: 'Menù stagionale',
    description: 'Piatti che cambiano con le stagioni per garantire sempre freschezza e varietà',
  },
  {
    icon: Heart,
    title: 'Atmosfera familiare',
    description: 'Un ambiente accogliente e rustico, ideale per chi cerca tranquillità e qualità',
  },
  {
    icon: Sparkles,
    title: 'Passione e cura nei dettagli',
    description: 'Alessandro e il suo team seguono ogni piatto con amore, dalla selezione delle materie prime alla presentazione in tavola',
  },
];

export default function Points() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Benvenuti in Agritur
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Agritur nasce dalla passione di Alessandro, che ogni giorno porta in tavola i prodotti del territorio trentino
            con la stessa cura e dedizione di una volta. Qui ogni piatto racconta una storia fatta di sapori autentici,
            ingredienti locali e rispetto per la natura.
          </p>
        </div>

        <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
          I nostri punti di forza
        </h3>

        <div className="grid md:grid-cols-2 gap-8">
          {points.map((point, index) => {
            const Icon = point.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-lg flex-shrink-0">
                    <Icon className="h-8 w-8 text-green-700" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      {point.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#alessandro"
            className="inline-block bg-green-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-800 transition"
          >
            Scopri cosa ci rende unici
          </a>
        </div>
      </div>
    </section>
  );
}

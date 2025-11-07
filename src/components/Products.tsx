import { Beef, Milk, Carrot, Droplet } from 'lucide-react';

const suppliers = [
  {
    icon: Milk,
    name: 'Caseificio Valle dei Laghi',
    description: 'Formaggi freschi e stagionati a latte crudo',
  },
  {
    icon: Beef,
    name: 'Macelleria Trentini',
    description: 'Carni selezionate di allevamenti sostenibili',
  },
  {
    icon: Carrot,
    name: 'Orto di San Vigilio',
    description: 'Verdure di stagione coltivate senza pesticidi',
  },
  {
    icon: Droplet,
    name: 'Apicoltura Alpina',
    description: 'Miele di montagna 100% naturale',
  },
];

export default function Products() {
  return (
    <section className="py-20 bg-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            I nostri prodotti e fornitori
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            La qualità dei nostri piatti nasce dalla collaborazione con piccoli produttori locali
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {suppliers.map((supplier, index) => {
            const Icon = supplier.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition text-center"
              >
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-8 w-8 text-green-700" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {supplier.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {supplier.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <p className="text-lg text-gray-700 text-center leading-relaxed mb-8">
            Crediamo nella filiera corta e nel rispetto della stagionalità. Ogni ingrediente racconta la nostra terra
            e chi la lavora ogni giorno con passione.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src="/images/fattoria%20fornitore%201%20.jpg"
                alt="Fattoria di uno dei nostri fornitori locali"
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src="/images/fattoria%20fornitore%202%20.jpg"
                alt="Campi coltivati dei fornitori di Agritur"
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src="/images/marmellate.jpeg"
                alt="Marmellate fatte in casa con frutta locale"
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

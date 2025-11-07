export default function Alessandro() {
  return (
    <section id="alessandro" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Chi è Alessandro
            </h2>
            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
              <p>
                Alessandro è il cuore di Agritur. Da oltre 15 anni porta avanti con dedizione l'attività di famiglia,
                unendo esperienza, amore per la cucina e rispetto per la terra.
              </p>
              <p>
                Ogni giorno seleziona personalmente gli ingredienti, sperimenta ricette nuove e accoglie gli ospiti
                come a casa propria.
              </p>
              <p className="font-semibold text-green-800">
                La sua filosofia è semplice: offrire piatti autentici, legati al territorio e preparati con la massima cura.
              </p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="/images/alessandro.jpg"
              alt="Alessandro, proprietario di Agritur"
              className="w-full h-96 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

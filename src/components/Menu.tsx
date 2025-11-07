export default function Menu() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Il nostro menù
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Il menù di Agritur rispetta i ritmi della natura e propone specialità del territorio rivisitate con creatività.
            Scopri le proposte del momento e lasciati guidare dai sapori autentici del Trentino.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img
              src="/images/carne%20alla%20griglia.webp"
              alt="Carne alla griglia preparata da Agritur"
              className="w-full h-64 object-cover"
            />
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img
              src="/images/menu.jpg"
              alt="Sala interna accogliente di Agritur"
              className="w-full h-64 object-cover"
            />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-8 text-center text-white shadow-lg">
          <h3 className="text-2xl font-bold mb-3">
            Da dove vengono i nostri prodotti
          </h3>
          <p className="text-base mb-6 max-w-2xl mx-auto leading-relaxed">
            Le nostre carni, verdure e formaggi provengono esclusivamente da fornitori locali.
            Crediamo in un'agricoltura sostenibile, nel rispetto dei cicli naturali e delle persone che lavorano la terra.
            Ogni piatto è un omaggio al nostro territorio.
          </p>
          <a
            href="#contatti"
            className="inline-block bg-white text-green-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105"
          >
            Visualizza il menù stagionale
          </a>
        </div>
      </div>
    </section>
  );
}

import { MapPin, ExternalLink } from 'lucide-react';

export default function Location() {
  return (
    <section className="py-20 bg-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Dove siamo
          </h2>
          <div className="flex items-center justify-center space-x-2 text-xl text-gray-700 mb-4">
            <MapPin className="h-6 w-6 text-green-700" />
            <span className="font-semibold">Via Roma, Trento (TN)</span>
          </div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Un angolo di campagna a pochi minuti dal centro, immerso nella natura e facilmente raggiungibile.
            Goditi un pranzo o una cena con vista sui vigneti e i monti trentini.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="/images/agriturismo%20esterno%202.png"
              alt="Vista esterna di Agritur"
              className="w-full h-96 object-cover"
            />
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <img
              src="/images/agriturismo%20interno.jpg"
              alt="Agritur immerso nel verde a Trento"
              className="w-full h-64 object-cover rounded-xl mb-6"
            />
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition w-full"
            >
              <span>Apri su Google Maps</span>
              <ExternalLink className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

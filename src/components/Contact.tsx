import { Phone, Mail, Clock, MessageCircle } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contatti" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Contatti e orari
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-green-50 rounded-xl p-8 text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="h-8 w-8 text-green-700" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Telefono</h3>
            <a
              href="tel:3271131188"
              className="text-lg text-green-700 font-semibold hover:underline"
            >
              327 113 1188
            </a>
          </div>

          <div className="bg-green-50 rounded-xl p-8 text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8 text-green-700" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
            <a
              href="mailto:info@agritur.it"
              className="text-lg text-green-700 font-semibold hover:underline"
            >
              info@agritur.it
            </a>
          </div>

          <div className="bg-green-50 rounded-xl p-8 text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-green-700" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Orari</h3>
            <p className="text-gray-700">
              <span className="font-semibold">Pranzo:</span> 12:00 - 15:00
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Cena:</span> 20:00 - 23:30
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-12 text-center text-white shadow-2xl">
          <h3 className="text-3xl sm:text-4xl font-bold mb-4">
            Prenota la tua esperienza
          </h3>
          <p className="text-lg mb-8 max-w-3xl mx-auto leading-relaxed">
            Ogni piatto nasce dalla passione di Alessandro, dalla selezione delle materie prime al sorriso con cui ti accoglie.
            Vieni a scoprire un'esperienza autentica, fatta di sapori veri e persone genuine.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="tel:3271131188"
              className="inline-flex items-center space-x-2 bg-white text-green-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105"
            >
              <Phone className="h-5 w-5" />
              <span>Chiama per prenotare</span>
            </a>
            <a
              href="https://wa.me/3271131188"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-white text-green-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105"
            >
              <MessageCircle className="h-5 w-5" />
              <span>Scrivici su WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

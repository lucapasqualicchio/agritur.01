import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const MenuSeasonale: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Torna alla Home</span>
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Menù Stagionale</h1>
            <div className="w-24"></div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold mb-6">I Nostri Menù Stagionali</h2>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Scopri i sapori autentici di ogni stagione, preparati con ingredienti freschi 
            del nostro orto e dei produttori locali del Trentino
          </p>
        </div>
      </section>

      {/* Content Placeholder */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-3xl">🍃</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Menù in Preparazione</h3>
              <p className="text-lg text-gray-600 mb-8">
                Stiamo curando con amore i dettagli dei nostri menù stagionali. 
                Presto troverai qui tutte le delizie che la nostra cucina prepara 
                seguendo il ritmo della natura.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-green-50 rounded-xl p-6">
                <h4 className="text-xl font-bold text-green-800 mb-3">🌸 Primavera</h4>
                <p className="text-green-700">
                  Asparagi selvatici, rucola di campo, primizie dell'orto
                </p>
              </div>
              <div className="bg-yellow-50 rounded-xl p-6">
                <h4 className="text-xl font-bold text-yellow-800 mb-3">☀️ Estate</h4>
                <p className="text-yellow-700">
                  Pomodori maturi al sole, erbe aromatiche, frutta di stagione
                </p>
              </div>
              <div className="bg-orange-50 rounded-xl p-6">
                <h4 className="text-xl font-bold text-orange-800 mb-3">🍂 Autunno</h4>
                <p className="text-orange-700">
                  Funghi porcini, castagne, zucca, uva dei nostri vigneti
                </p>
              </div>
              <div className="bg-blue-50 rounded-xl p-6">
                <h4 className="text-xl font-bold text-blue-800 mb-3">❄️ Inverno</h4>
                <p className="text-blue-700">
                  Carni locali, zuppe calde, conserve della nonna
                </p>
              </div>
            </div>

            <div className="border-t pt-8">
              <h4 className="text-2xl font-bold text-gray-900 mb-4">Contattaci per Info</h4>
              <p className="text-gray-600 mb-6">
                Vuoi sapere cosa stiamo preparando oggi? Chiamaci o scrivici!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors">
                  📞 Chiama Ora
                </button>
                <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                  📧 Invia Email
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Agriturismo di Alessandro</h3>
          <p className="text-gray-400 mb-6">
            Sapori autentici a Km 0 nel cuore di Trento
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            Torna alla Home
          </button>
        </div>
      </footer>
    </div>
  );
};

export default MenuSeasonale;
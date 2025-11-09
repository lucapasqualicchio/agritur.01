import { Mountain, Phone, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" aria-label="Vai alla Home" className="flex items-center space-x-2">
            <Mountain className="h-8 w-8 text-green-700" />
            <span className="text-2xl font-bold text-green-800">Agritur</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <a
              href="tel:3271131188"
              className="hidden sm:flex items-center space-x-2 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition"
            >
              <Phone className="h-5 w-5" />
              <span>327 113 1188</span>
            </a>
            
            {/* Hamburger Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-green-700 hover:bg-gray-100 transition"
              aria-label="Menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsMenuOpen(false)} />
        )}

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-8">
              <Link to="/" aria-label="Vai alla Home" className="flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
                <Mountain className="h-8 w-8 text-green-700" />
                <span className="text-2xl font-bold text-green-800">Agritur</span>
              </Link>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-md text-gray-600 hover:text-green-700 hover:bg-gray-100 transition"
                aria-label="Chiudi menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="space-y-4">
              <Link
                to="/prenotazioni"
                className="block px-4 py-3 text-lg font-semibold text-gray-900 hover:bg-green-50 hover:text-green-700 rounded-lg transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Prenotazioni
              </Link>

              <Link
                to="/chi-siamo"
                className="block px-4 py-3 text-lg font-semibold text-gray-900 hover:bg-green-50 hover:text-green-700 rounded-lg transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Chi siamo
              </Link>

              <Link
                to="/prodotti"
                className="block px-4 py-3 text-lg font-semibold text-gray-900 hover:bg-green-50 hover:text-green-700 rounded-lg transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Prodotti
              </Link>

              <Link
                to="/contatti"
                className="block px-4 py-3 text-lg font-semibold text-gray-900 hover:bg-green-50 hover:text-green-700 rounded-lg transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Info e contatti
              </Link>

              <Link
                to="/shop"
                className="block px-4 py-3 text-lg font-semibold text-gray-900 hover:bg-green-50 hover:text-green-700 rounded-lg transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>

              <Link
                to="/carrello"
                className="block px-4 py-3 text-lg font-semibold text-gray-900 hover:bg-green-50 hover:text-green-700 rounded-lg transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Carrello
              </Link>
            </nav>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <a
                href="tel:3271131188"
                className="flex items-center space-x-2 text-green-700 hover:text-green-800 transition"
              >
                <Phone className="h-5 w-5" />
                <span className="font-semibold">327 113 1188</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

import { Mountain } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center space-x-2 mb-4">
            <Mountain className="h-8 w-8 text-green-500" />
            <span className="text-2xl font-bold">Agritur</span>
          </div>
          <p className="text-gray-400 mb-2">
            Sapori autentici a Km 0 nel cuore di Trento
          </p>
          <p className="text-gray-500 text-sm">
            Via Roma, Trento (TN) | Tel: 327 113 1188 | info@agritur.it
          </p>
          <div className="mt-4 pt-4 border-t border-gray-800">
            {/* Link prenotazioni rimosso: visibile solo per admin */}
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-6 text-xs text-gray-500">
            <Link to="/privacy-policy" className="hover:text-green-400 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-conditions" className="hover:text-green-400 transition-colors">
              Termini e Condizioni
            </Link>
            <Link to="/cookie-policy" className="hover:text-green-400 transition-colors">
              Cookie Policy
            </Link>
          </div>
          <p className="text-gray-600 text-sm mt-6">
            © 2024 Agritur. Tutti i diritti riservati.
          </p>
        </div>
      </div>
    </footer>
  );
}

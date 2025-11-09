import { Link } from 'react-router-dom';
import { Home, ArrowLeft, AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 p-4 rounded-full">
            <AlertCircle className="h-12 w-12 text-red-600" />
          </div>
        </div>
        
        <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
        
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Pagina non trovata</h2>
        
        <p className="text-gray-600 mb-8">
          La pagina che stai cercando non esiste o è stata spostata. 
          Torna alla home page o contattaci se pensi ci sia un errore.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors"
          >
            <Home className="h-5 w-5 mr-2" />
            Torna alla Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 hover:border-gray-400 text-gray-700 font-medium rounded-md transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Torna indietro
          </button>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-2">Hai bisogno di aiuto?</p>
          <Link
            to="/contatti"
            className="text-green-600 hover:text-green-800 text-sm font-medium transition-colors"
          >
            Contattaci →
          </Link>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { sendBookingEmail, saveBookingToStorage } from '../utils/emailService';

interface BookingData {
  name: string;
  surname: string;
  email: string;
  phone: string;
  mealType: 'lunch' | 'dinner';
  time: string;
  people: number;
  date: string;
}

const BookingForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Prendi la data dal parametro URL o dal state
  const selectedDate = location.state?.date || new Date().toISOString().split('T')[0];
  
  const [formData, setFormData] = useState<BookingData>({
    name: '',
    surname: '',
    email: '',
    phone: '',
    mealType: 'lunch',
    time: '12:00',
    people: 2,
    date: selectedDate
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'people' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Invia email reale con EmailJS
      const emailSuccess = await sendBookingEmail(formData);
      
      if (emailSuccess) {
        // Salva la prenotazione in localStorage
        saveBookingToStorage({
          ...formData,
          timestamp: new Date().toISOString()
        });
        
        setIsSubmitting(false);
        setShowSuccess(true);
        
        // Torna alla home dopo 3 secondi
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        // Errore nell'invio email
        setIsSubmitting(false);
        alert('Errore nell\'invio della prenotazione. Riprova più tardi.');
      }
    } catch (error) {
      console.error('Errore nella prenotazione:', error);
      setIsSubmitting(false);
      alert('Si è verificato un errore. Riprova più tardi.');
    }
  };

  const timeOptions = formData.mealType === 'lunch' 
    ? ['12:00', '12:30', '13:00', '13:30', '14:00']
    : ['19:00', '19:30', '20:00', '20:30', '21:00', '21:30'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center text-green-600 hover:text-green-700">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Torna alla Home
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">Prenotazione</h1>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-12">
        {showSuccess ? (
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Prenotazione inviata!</h2>
            <p className="text-gray-600 mb-4">
              La tua prenotazione è stata registrata con successo! 
              Una email di conferma è stata inviata a luca.pasqualicchio@gmail.com
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-green-800">
                <strong>✅ Email inviata!</strong> I dettagli della tua prenotazione sono stati inviati via email.
              </p>
            </div>
            <p className="text-sm text-gray-500">Verrai reindirizzato alla homepage tra pochi secondi...</p>
          </div>
        ) : (
          <div className="bg-white shadow-lg rounded-lg p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Prenota il tuo tavolo</h2>
              <p className="text-gray-600">Data selezionata: <span className="font-semibold">{new Date(selectedDate).toLocaleDateString('it-IT')}</span></p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nome *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="Mario"
                  />
                </div>

                <div>
                  <label htmlFor="surname" className="block text-sm font-medium text-gray-700 mb-2">
                    Cognome *
                  </label>
                  <input
                    type="text"
                    id="surname"
                    name="surname"
                    required
                    value={formData.surname}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="Rossi"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="tua.email@esempio.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Numero di telefono *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="+39 123 456 7890"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="mealType" className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo di pasto
                  </label>
                  <select
                    id="mealType"
                    name="mealType"
                    value={formData.mealType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="lunch">Pranzo</option>
                    <option value="dinner">Cena</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                    Orario
                  </label>
                  <select
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  >
                    {timeOptions.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="people" className="block text-sm font-medium text-gray-700 mb-2">
                    Numero di persone
                  </label>
                  <select
                    id="people"
                    name="people"
                    value={formData.people}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  >
                    {[1,2,3,4,5,6,7,8,9,10].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'persona' : 'persone'}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Invio...
                    </span>
                  ) : (
                    'Prenota'
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingForm;
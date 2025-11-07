import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface DayAvailability {
  date: Date;
  status: 'available' | 'waiting' | 'unavailable';
}

const BookingCalendar: React.FC = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availability, setAvailability] = useState<DayAvailability[]>([]);

  // Genera disponibilità casuale per il mese corrente
  useEffect(() => {
    const generateAvailability = () => {
      const days: DayAvailability[] = [];
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const random = Math.random();
        
        let status: 'available' | 'waiting' | 'unavailable';
        if (random < 0.6) {
          status = 'available';
        } else if (random < 0.8) {
          status = 'waiting';
        } else {
          status = 'unavailable';
        }

        days.push({ date, status });
      }
      setAvailability(days);
    };

    generateAvailability();
  }, [currentDate]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Giorni vuoti all'inizio del mese
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Giorni del mese
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const getAvailabilityStatus = (day: number) => {
    const dayAvailability = availability.find(d => d.date.getDate() === day);
    return dayAvailability?.status || 'available';
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const getStatusColor = (status: 'available' | 'waiting' | 'unavailable') => {
    switch (status) {
      case 'available':
        return 'text-green-600 font-semibold';
      case 'waiting':
        return 'text-yellow-600 font-semibold';
      case 'unavailable':
        return 'text-red-600 font-semibold';
    }
  };

  const getStatusText = (status: 'available' | 'waiting' | 'unavailable') => {
    switch (status) {
      case 'available':
        return 'Disponibile';
      case 'waiting':
        return 'Sala di attesa';
      case 'unavailable':
        return 'Non disponibile';
    }
  };

  const getDayButtonClass = (day: number) => {
    const status = getAvailabilityStatus(day);
    const baseClass = 'w-full h-12 rounded-lg font-semibold transition-all duration-200 hover:scale-105';
    
    if (isToday(day)) {
      return `${baseClass} bg-blue-500 text-white ring-2 ring-blue-300`;
    }
    
    switch (status) {
      case 'available':
        return `${baseClass} bg-green-100 text-green-800 hover:bg-green-200`;
      case 'waiting':
        return `${baseClass} bg-yellow-100 text-yellow-800 hover:bg-yellow-200`;
      case 'unavailable':
        return `${baseClass} bg-gray-100 text-gray-500 cursor-not-allowed`;
    }
  };

  const handleDateClick = (day: number) => {
    const status = getAvailabilityStatus(day);
    if (status !== 'unavailable') {
      const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      setSelectedDate(selectedDate);
      
      // Naviga alla pagina di prenotazione con la data selezionata
      navigate('/prenota', { 
        state: { 
          date: selectedDate.toISOString().split('T')[0] 
        } 
      });
    }
  };

  const changeMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const monthNames = [
    'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
    'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
  ];

  const weekDays = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];
  const days = getDaysInMonth(currentDate);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Prenota il tuo tavolo</h2>
          <p className="text-lg text-gray-600">Seleziona una data disponibile per la tua prenotazione</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header del calendario */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => changeMonth('prev')}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <h3 className="text-2xl font-bold text-gray-900">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            
            <button
              onClick={() => changeMonth('next')}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Giorni della settimana */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {weekDays.map(day => (
              <div key={day} className="text-center font-semibold text-gray-600 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendario */}
          <div className="grid grid-cols-7 gap-2">
            {days.map((day, index) => (
              <div key={index} className="flex flex-col items-center">
                {day ? (
                  <>
                    <button
                      onClick={() => handleDateClick(day)}
                      className={getDayButtonClass(day)}
                      disabled={getAvailabilityStatus(day) === 'unavailable'}
                    >
                      {day}
                    </button>
                    <div className={`text-xs mt-1 ${getStatusColor(getAvailabilityStatus(day))}`}>
                      {getStatusText(getAvailabilityStatus(day))}
                    </div>
                  </>
                ) : (
                  <div className="w-full h-12"></div>
                )}
              </div>
            ))}
          </div>

          {/* Legenda */}
          <div className="mt-8 flex justify-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-100 rounded"></div>
              <span className="text-sm text-gray-600">Disponibile</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-100 rounded"></div>
              <span className="text-sm text-gray-600">Sala di attesa</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gray-100 rounded"></div>
              <span className="text-sm text-gray-600">Non disponibile</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingCalendar;
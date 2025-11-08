import emailjs from 'emailjs-com';

// Configurazione EmailJS - variabili d'ambiente (senza fallback)
const EMAILJS_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY
};

const isConfigValid = () => {
  return Boolean(
    EMAILJS_CONFIG.SERVICE_ID &&
    EMAILJS_CONFIG.TEMPLATE_ID &&
    EMAILJS_CONFIG.PUBLIC_KEY
  );
};

export interface BookingEmailData {
  date: string;
  email: string;
  phone: string;
  mealType: string;
  time: string;
  people: number;
  name?: string;
  surname?: string;
}

export const sendBookingEmail = async (data: BookingEmailData): Promise<boolean> => {
  try {
    if (!isConfigValid()) {
      console.error('EmailJS non configurato correttamente: controlla SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY.');
      return false;
    }
    const templateParams = {
      // Invia la mail al cliente e usa il suo indirizzo come reply-to
      to_email: data.email,
      reply_to: data.email,
      date: data.date,
      phone: data.phone,
      meal_type: data.mealType === 'lunch' ? 'Pranzo' : 'Cena',
      time: data.time,
      people: data.people,
      name: data.name || 'N/A',
      surname: data.surname || 'N/A'
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams,
      EMAILJS_CONFIG.PUBLIC_KEY
    );

    console.log('Email inviata con successo:', response);
    return true;
  } catch (error) {
    console.error('Errore nell\'invio email:', error);
    return false;
  }
};

// Funzione per salvare la prenotazione in localStorage
export const saveBookingToStorage = (data: BookingEmailData & { timestamp: string }) => {
  try {
    const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    existingBookings.push(data);
    localStorage.setItem('bookings', JSON.stringify(existingBookings));
    console.log('Prenotazione salvata in localStorage');
  } catch (error) {
    console.error('Errore nel salvataggio:', error);
  }
};

// Funzione per recuperare tutte le prenotazioni
export const getAllBookings = () => {
  try {
    return JSON.parse(localStorage.getItem('bookings') || '[]');
  } catch (error) {
    console.error('Errore nel recupero prenotazioni:', error);
    return [];
  }
};

// Funzione per esportare le prenotazioni in formato testo
export const exportBookingsToText = (): string => {
  const bookings = getAllBookings();
  let textContent = '=== PRENOTAZIONI AGRITURISMO ===\n\n';
  
  bookings.forEach((booking: any, index: number) => {
    textContent += `Prenotazione ${index + 1}:\n`;
    textContent += `Data: ${booking.date}\n`;
    textContent += `Email: ${booking.email}\n`;
    textContent += `Telefono: ${booking.phone}\n`;
    textContent += `Nome: ${booking.name || 'N/A'}\n`;
    textContent += `Cognome: ${booking.surname || 'N/A'}\n`;
    textContent += `Tipo: ${booking.mealType === 'lunch' ? 'Pranzo' : 'Cena'}\n`;
    textContent += `Orario: ${booking.time}\n`;
    textContent += `Persone: ${booking.people}\n`;
    textContent += `Timestamp: ${booking.timestamp}\n`;
    textContent += '---\n\n';
  });
  
  return textContent;
};
import { ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calcola l'opacità e la scala in base allo scroll
  const opacity = Math.max(0, 1 - scrollY / 800);
  const scale = Math.max(0.5, 1 - scrollY / 1200);
  const blur = Math.min(10, scrollY / 100);

  return (
    <section className="relative h-screen flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-500 ease-out"
        style={{
          backgroundImage: 'url(/images/agriturismo%20esterno%201.jpg)',
          opacity: opacity,
          transform: `scale(${scale})`,
          filter: `blur(${blur}px)`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      <div 
        className="relative z-10 text-center text-white px-4 max-w-4xl transition-all duration-500"
        style={{ opacity: opacity }}
      >
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight">
          Sapori autentici a Km 0 nel cuore di Trento
        </h1>
        <p className="text-xl sm:text-2xl mb-8 text-gray-100">
          Un luogo dove la tradizione incontra la genuinità
        </p>
        <a
          href="#booking-calendar"
          className="inline-block bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition transform hover:scale-105"
        >
          Prenota ora la tua esperienza
        </a>
      </div>

      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce transition-all duration-500"
        style={{ opacity: opacity }}
      >
        <ChevronDown className="h-10 w-10 text-white" />
      </div>
    </section>
  );
}

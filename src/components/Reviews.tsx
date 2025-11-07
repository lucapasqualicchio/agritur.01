import React, { useState } from 'react';

interface Review {
  id: number;
  name: string;
  rating: number;
  date: string;
  comment: string;
  avatar?: string;
}

const Reviews: React.FC = () => {
  const [currentReview, setCurrentReview] = useState(0);

  const reviews: Review[] = [
    {
      id: 1,
      name: "Maria Rossi",
      rating: 5,
      date: "15 Gennaio 2024",
      comment: "Esperienza magnifica! Il cibo era delizioso, tutto fatto con prodotti locali e di stagione. L'atmosfera dell'agriturismo è incantevole, immersa nella natura. Alessandro e il suo staff sono stati gentilissimi e molto professionali. Tornerò sicuramente!"
    },
    {
      id: 2,
      name: "Giuseppe Bianchi",
      rating: 5,
      date: "8 Gennaio 2024",
      comment: "Siamo stati qui per una cena di famiglia e siamo rimasti entusiasti. I piatti tipici trentini sono stati preparati alla perfezione, i salumi e i formaggi del territorio eccezionali. Il servizio è stato impeccabile. Consigliatissimo!"
    },
    {
      id: 3,
      name: "Anna e Marco",
      rating: 4,
      date: "2 Gennaio 2024",
      comment: "Bellissima location con vista sulle montagne. Abbiamo apprezzato molto la filosofia del km 0 e la qualità degli ingredienti. I tortelli di patate erano strepitosi! Unico piccolo appunto, i tempi di attesa un po' lunghi, ma capibili dato che tutto è preparato al momento."
    },
    {
      id: 4,
      name: "Luca Verdi",
      rating: 5,
      date: "28 Dicembre 2023",
      comment: "Che scoperta meravigliosa! L'agriturismo è un angolo di paradiso. Abbiamo fatto anche un tour della fattoria e visto gli animali. I bambini sono stati entusiasti. La carne alla griglia era tenerissima e saporita. Da ritornare assolutamente!"
    },
    {
      id: 5,
      name: "Francesca Neri",
      rating: 5,
      date: "20 Dicembre 2023",
      comment: "Perfetto per una fuga dalla città! L'ambiente è rustico ma curato nei dettagli. Il menù cambia stagionalmente e si nota la cura nella scelta degli ingredienti. Il vino locale che ci hanno consigliato era ottimo. Servizio cordiale e professionale."
    }
  ];

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Cosa dicono di noi</h2>
          <p className="text-lg text-gray-600">Le recensioni dei nostri ospiti</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Contenitore principale delle recensioni */}
          <div className="bg-gray-50 rounded-2xl p-8 shadow-lg overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentReview * 100}%)` }}
            >
              {reviews.map((review) => (
                <div key={review.id} className="w-full flex-shrink-0 px-4">
                  <div className="text-center">
                    {/* Avatar placeholder */}
                    <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl font-bold text-green-600">
                        {review.name.charAt(0)}
                      </span>
                    </div>
                    
                    {/* Nome e data */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{review.name}</h3>
                    <p className="text-sm text-gray-500 mb-4">{review.date}</p>
                    
                    {/* Stelle */}
                    <div className="flex justify-center mb-4">
                      {renderStars(review.rating)}
                    </div>
                    
                    {/* Commento */}
                    <p className="text-gray-700 text-lg leading-relaxed max-w-2xl mx-auto">
                      "{review.comment}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pulsanti di navigazione */}
          <button
            onClick={prevReview}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow border border-gray-200"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextReview}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow border border-gray-200"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Indicatori di posizione */}
          <div className="flex justify-center mt-6 space-x-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentReview(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentReview ? 'bg-green-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Statistiche */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-green-50 rounded-lg p-6">
            <div className="text-3xl font-bold text-green-600 mb-2">4.8</div>
            <div className="text-gray-600">Valutazione media</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">200+</div>
            <div className="text-gray-600">Recensioni positive</div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-6">
            <div className="text-3xl font-bold text-yellow-600 mb-2">98%</div>
            <div className="text-gray-600">Clienti soddisfatti</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
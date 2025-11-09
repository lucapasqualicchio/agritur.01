import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link 
          to="/" 
          className="inline-flex items-center text-green-600 hover:text-green-800 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Torna alla Home
        </Link>
        
        <div className="prose prose-lg max-w-none">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Termini e Condizioni</h1>
          
          <div className="text-gray-700 space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Accettazione dei Termini</h2>
              <p>
                Utilizzando il sito web Agritur e i servizi offerti, accetti di essere vincolato da questi Termini e Condizioni. 
                Se non sei d'accordo con questi termini, ti preghiamo di non utilizzare il nostro sito o servizi.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">2. Prenotazioni</h2>
              <h3 className="text-lg font-medium text-gray-700 mb-2">2.1 Processo di Prenotazione</h3>
              <p>
                Le prenotazioni possono essere effettuate online attraverso il nostro sito web. 
                Tutte le prenotazioni sono soggette a disponibilità e conferma da parte nostra.
              </p>
              
              <h3 className="text-lg font-medium text-gray-700 mb-2 mt-4">2.2 Conferma Prenotazione</h3>
              <p>
                La prenotazione si considera confermata solo dopo aver ricevuto la nostra email di conferma 
                contenente tutti i dettagli della prenotazione.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">3. Pagamenti</h2>
              <h3 className="text-lg font-medium text-gray-700 mb-2">3.1 Modalità di Pagamento</h3>
              <p>
                Accettiamo pagamenti tramite carta di credito, bonifico bancario e contanti presso la struttura.
                I dettagli completi delle modalità di pagamento saranno forniti durante il processo di prenotazione.
              </p>
              
              <h3 className="text-lg font-medium text-gray-700 mb-2 mt-4">3.2 Acconto</h3>
              <p>
                Per confermare la prenotazione potrebbe essere richiesto il pagamento di un acconto. 
                L'importo e le condizioni dell'acconto saranno specificati al momento della prenotazione.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">4. Politica di Cancellazione</h2>
              <h3 className="text-lg font-medium text-gray-700 mb-2">4.1 Cancellazione da parte del Cliente</h3>
              <p>
                Le cancellazioni devono essere effettuate con almeno 48 ore di preavviso. 
                In caso di cancellazione tardiva o mancata presentazione, potrebbe essere trattenuto l'acconto.
              </p>
              
              <h3 className="text-lg font-medium text-gray-700 mb-2 mt-4">4.2 Cancellazione da parte nostra</h3>
              <p>
                Ci riserviamo il diritto di cancellare una prenotazione in casi eccezionali (forza maggiore, 
                problemi tecnici, ecc.). In tali casi, verrà offerto un rimborso completo o una data alternativa.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">5. Responsabilità</h2>
              <p>
                Agritur non è responsabile per:
              </p>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Danni a proprietà personali durante la permanenza</li>
                <li>Interruzioni di servizio dovute a cause di forza maggiore</li>
                <li>Comportamento di altri ospiti della struttura</li>
                <li>Eventuali allergie o intolleranze non comunicate preventivamente</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">6. Comportamento degli Ospiti</h2>
              <p>
                Gli ospiti sono tenuti a:
              </p>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Rispettare gli orari di check-in e check-out</li>
                <li>Mantenere un comportamento educato e rispettoso</li>
                <li>Comunicare eventuali allergie o restrizioni alimentari</li>
                <li>Rispettare le norme di sicurezza della struttura</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">7. Modifiche ai Termini</h2>
              <p>
                Ci riserviamo il diritto di modificare questi Termini e Condizioni in qualsiasi momento. 
                Le modifiche entreranno in vigore immediatamente dopo la pubblicazione sul sito web.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">8. Legge Applicabile</h2>
              <p>
                Questi Termini e Condizioni sono regolati e interpretati in conformità con le leggi italiane. 
                Qualsiasi controversia sarà di competenza esclusiva dei tribunali di Trento.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">9. Contatti</h2>
              <p>
                Per qualsiasi domanda riguardante questi Termini e Condizioni, puoi contattarci:
              </p>
              <p className="mt-2">
                Email: info@agritur.it<br />
                Telefono: 327 113 1188<br />
                Indirizzo: Via Roma, Trento (TN)
              </p>
            </section>

            <section>
              <p className="text-sm text-gray-600 mt-8">
                Ultimo aggiornamento: Gennaio 2024
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEO from './SEO';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Privacy Policy – Agritur: dati personali e diritti dell’utente"
        description="Informativa privacy Agritur: trattiamo i dati personali in modo sicuro. Finalità, basi giuridiche, conservazione, sicurezza e diritti esercitabili."
        urlPath="/privacy-policy"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link 
          to="/" 
          className="inline-flex items-center text-green-600 hover:text-green-800 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Torna alla Home
        </Link>
        
        <div className="prose prose-lg max-w-none">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="text-gray-700 space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Informazioni Generali</h2>
              <p>
                Agritur ("noi", "ci", "nostro") rispetta la tua privacy e si impegna a proteggere i tuoi dati personali. 
                Questa politica sulla privacy spiega come raccogliamo, utilizziamo e proteggiamo le tue informazioni personali 
                quando visiti il nostro sito web e utilizzi i nostri servizi.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">2. Dati che Raccogliamo</h2>
              <p>Possiamo raccogliere e trattare i seguenti dati personali:</p>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Informazioni di contatto (nome, email, telefono)</li>
                <li>Dati delle prenotazioni (date, numero di persone, preferenze)</li>
                <li>Informazioni di pagamento (processate tramite servizi di pagamento sicuri)</li>
                <li>Dati di navigazione (IP, tipo di browser, pagine visitate)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">3. Utilizzo dei Dati</h2>
              <p>Utilizziamo i tuoi dati personali per:</p>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Gestire le prenotazioni e fornire i servizi richiesti</li>
                <li>Comunicare con te riguardo alle tue prenotazioni</li>
                <li>Migliorare i nostri servizi e l'esperienza utente</li>
                <li>Inviare comunicazioni marketing (solo con il tuo consenso esplicito)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">4. Base Giuridica del Trattamento</h2>
              <p>Trattiamo i tuoi dati personali sulla base di:</p>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Esecuzione del contratto (per fornire i servizi richiesti)</li>
                <li>Consenso esplicito (per marketing e comunicazioni)</li>
                <li>Interessi legittimi (miglioramento dei servizi)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">5. Conservazione dei Dati</h2>
              <p>
                Conserviamo i tuoi dati personali solo per il tempo necessario a raggiungere le finalità per cui sono stati raccolti, 
                incluso il soddisfacimento di eventuali obblighi legali, contabili o di segnalazione.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">6. I Tuoi Diritti</h2>
              <p>Hai il diritto di:</p>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Accedere ai tuoi dati personali</li>
                <li>Correggere dati inesatti o incompleti</li>
                <li>Cancellare i tuoi dati personali</li>
                <li>Opporti al trattamento dei tuoi dati</li>
                <li>Richiedere la portabilità dei dati</li>
                <li>Ritirare il consenso in qualsiasi momento</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">7. Sicurezza dei Dati</h2>
              <p>
                Implementiamo misure di sicurezza tecniche e organizzative appropriate per proteggere i tuoi dati personali 
                da accessi non autorizzati, alterazioni, divulgazione o distruzione.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">8. Contatti</h2>
              <p>
                Per esercitare i tuoi diritti o per qualsiasi domanda sulla privacy, puoi contattarci:
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
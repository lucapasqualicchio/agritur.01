import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEO from './SEO';

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Cookie Policy – Agritur: consenso, preferenze e analytics"
        description="Cookie Policy di Agritur: tipologie di cookie, finalità, gestione del consenso, preferenze browser, terze parti e diritti GDPR."
        urlPath="/cookie-policy"
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
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Cookie Policy</h1>
          
          <div className="text-gray-700 space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Cosa sono i Cookie</h2>
              <p>
                I cookie sono piccoli file di testo che i siti web visitati dall'utente inviano al suo dispositivo 
                (computer, tablet, smartphone, ecc.), dove vengono memorizzati per essere poi ritrasmessi agli stessi siti 
                alla successiva visita.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">2. Tipologie di Cookie Utilizzati</h2>
              
              <h3 className="text-lg font-medium text-gray-700 mb-2">2.1 Cookie Tecnici</h3>
              <p>
                Sono necessari per il corretto funzionamento del sito e per garantire la navigazione. 
                Senza questi cookie, il sito potrebbe non funzionare correttamente.
              </p>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Cookie di sessione: gestiscono l'autenticazione e la sessione di navigazione</li>
                <li>Cookie di funzionalità: memorizzano le preferenze dell'utente</li>
              </ul>
              
              <h3 className="text-lg font-medium text-gray-700 mb-2 mt-4">2.2 Cookie Analitici</h3>
              <p>
                Ci aiutano a comprendere come i visitatori interagiscono con il sito web, raccogliendo informazioni 
                in forma anonima. Questi dati ci permettono di migliorare costantemente il nostro sito.
              </p>
              
              <h3 className="text-lg font-medium text-gray-700 mb-2 mt-4">2.3 Cookie di Terze Parti</h3>
              <p>
                Utilizziamo servizi di terze parti che potrebbero impostare cookie per:
              </p>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Analisi del traffico (Google Analytics)</li>
                <li>Integrazione con social media</li>
                <li>Servizi di prenotazione online</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">3. Finalità dell'Utilizzo dei Cookie</h2>
              <p>Utilizziamo i cookie per:</p>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Garantire il corretto funzionamento del sito</li>
                <li>Migliorare l'esperienza di navigazione</li>
                <li>Analizzare il traffico e l'utilizzo del sito</li>
                <li>Personalizzare contenuti e annunci</li>
                <li>Fornire funzionalità di social media</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">4. Gestione dei Cookie</h2>
              <h3 className="text-lg font-medium text-gray-700 mb-2">4.1 Consenso</h3>
              <p>
                Alla prima visita del sito, viene mostrato un banner che richiede il consenso all'utilizzo dei cookie. 
                Puoi accettare tutti i cookie o personalizzare le tue preferenze.
              </p>
              
              <h3 className="text-lg font-medium text-gray-700 mb-2 mt-4">4.2 Modifica delle Preferenze</h3>
              <p>
                Puoi modificare le tue preferenze sui cookie in qualsiasi momento attraverso:
              </p>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Le impostazioni del tuo browser</li>
                <li>Strumenti di gestione del consenso integrati nel sito</li>
              </ul>
              
              <h3 className="text-lg font-medium text-gray-700 mb-2 mt-4">4.3 Disattivazione dei Cookie</h3>
              <p>
                Puoi disattivare i cookie attraverso le impostazioni del tuo browser, ma tieni presente che 
                alcune funzionalità del sito potrebbero non funzionare correttamente.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">5. Cookie di Terze Parti</h2>
              <p>
                Il nostro sito utilizza servizi di terze parti che potrebbero impostare i propri cookie. 
                Di seguito elenchiamo i principali servizi utilizzati:
              </p>
              
              <h3 className="text-lg font-medium text-gray-700 mb-2 mt-4">Google Analytics</h3>
              <p>
                Utilizziamo Google Analytics per analizzare il traffico del sito. I dati raccolti sono anonimi 
                e utilizzati esclusivamente per scopi statistici.
              </p>
              
              <h3 className="text-lg font-medium text-gray-700 mb-2 mt-4">Servizi di Prenotazione</h3>
              <p>
                Per gestire le prenotazioni online, potremmo utilizzare servizi di terze parti che impostano cookie 
                necessari per il funzionamento del sistema di prenotazione.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">6. Conservazione dei Dati</h2>
              <p>
                I cookie hanno diverse durate di conservazione:
              </p>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Cookie di sessione: vengono eliminati alla chiusura del browser</li>
                <li>Cookie persistenti: rimangono sul dispositivo per un periodo specificato</li>
              </ul>
              <p className="mt-2">
                La durata esatta di ogni cookie è indicata nelle impostazioni del browser.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">7. Diritti dell'Utente</h2>
              <p>
                In conformità con il GDPR, hai il diritto di:
              </p>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Acconsentire o rifiutare l'utilizzo dei cookie</li>
                <li>Modificare le tue preferenze in qualsiasi momento</li>
                <li>Eliminare i cookie già memorizzati</li>
                <li>Richiedere informazioni sul trattamento dei tuoi dati</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">8. Aggiornamenti della Policy</h2>
              <p>
                Questa Cookie Policy potrebbe essere aggiornata periodicamente. Ti invitiamo a consultare regolarmente 
                questa pagina per essere informato su eventuali modifiche.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">9. Contatti</h2>
              <p>
                Per qualsiasi domanda riguardante questa Cookie Policy, puoi contattarci:
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
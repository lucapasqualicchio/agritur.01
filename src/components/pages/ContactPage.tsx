import Header from '../Header';
import Footer from '../Footer';
import Contact from '../Contact';
import SEO from '../SEO';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Contatti – Agritur: orari, telefono ed email"
        description="Contatta Agritur: telefono, email e orari di apertura. Prenota la tua esperienza autentica in campagna."
        urlPath="/contatti"
      />
      <Header />
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8">Contatti</h1>
        </div>
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
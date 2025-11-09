import Header from '../Header';
import Footer from '../Footer';
import Alessandro from '../Alessandro';
import SEO from '../SEO';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Chi siamo – Agritur: storia, valori e ospitalità"
        description="Scopri chi siamo: la storia di Agritur, i valori, la passione di Alessandro e l'ospitalità autentica della nostra terra."
        urlPath="/chi-siamo"
      />
      <Header />
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8">Chi siamo</h1>
        </div>
        <Alessandro />
      </main>
      <Footer />
    </div>
  );
}
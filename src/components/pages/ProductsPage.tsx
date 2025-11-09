import Header from '../Header';
import Footer from '../Footer';
import Products from '../Products';
import SEO from '../SEO';

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Prodotti – Agritur: fornitori locali e qualità"
        description="I nostri prodotti: selezione di carni, formaggi, verdure e miele da fornitori locali. Filiera corta e qualità garantita."
        urlPath="/prodotti"
      />
      <Header />
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8">Prodotti</h1>
        </div>
        <Products />
      </main>
      <Footer />
    </div>
  );
}
import Header from '../Header';
import Footer from '../Footer';
import { useCart, Product } from '../../context/CartContext';
import SEO from '../SEO';

const products: Product[] = [
  { id: 'speck-500', name: 'Speck artigianale 500g', price: 9.9 },
  { id: 'miele-500', name: 'Miele di montagna 500g', price: 7.5 },
  { id: 'marmellata-250', name: 'Marmellata di frutti di bosco 250g', price: 5.9 },
  { id: 'formaggio-700', name: 'Formaggio stagionato 700g', price: 12.0 },
];

export default function ProductCatalog() {
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Prodotti tipici – Acquista online"
        description="Acquista prodotti tipici del Trentino: speck, miele, marmellate e formaggi. Aggiungi al carrello e procedi al checkout."
        urlPath="/shop"
      />
      <Header />
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8">Prodotti tipici</h1>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((p) => (
              <div key={p.id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{p.name}</h3>
                <p className="text-gray-700 mb-4">€ {p.price.toFixed(2)}</p>
                <button
                  onClick={() => addToCart(p, 1)}
                  className="w-full bg-green-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-800 transition"
                >
                  Aggiungi al carrello
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
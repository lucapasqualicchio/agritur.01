import Header from '../Header';
import Footer from '../Footer';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import SEO from '../SEO';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart();

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Carrello – Riepilogo ordine"
        description="Rivedi i prodotti nel carrello, modifica le quantità e procedi al checkout."
        urlPath="/carrello"
      />
      <Header />
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8">Carrello</h1>
          {items.length === 0 ? (
            <p className="text-gray-700">Il carrello è vuoto.</p>
          ) : (
            <div className="space-y-6">
              {items.map((i) => (
                <div key={i.product.id} className="flex items-center justify-between bg-white rounded-xl p-4 shadow">
                  <div>
                    <p className="font-semibold text-gray-900">{i.product.name}</p>
                    <p className="text-gray-700">€ {i.product.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={1}
                      value={i.quantity}
                      onChange={(e) => updateQuantity(i.product.id, parseInt(e.target.value || '1', 10))}
                      className="w-20 border rounded px-2 py-1"
                    />
                    <button
                      onClick={() => removeFromCart(i.product.id)}
                      className="text-red-600 hover:text-red-800 font-semibold"
                    >
                      Rimuovi
                    </button>
                  </div>
                </div>
              ))}

              <div className="flex items-center justify-between mt-6">
                <p className="text-xl font-bold">Totale: € {total.toFixed(2)}</p>
                <div className="flex gap-3">
                  <button onClick={clearCart} className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200">Svuota</button>
                  <Link to="/checkout" className="px-4 py-2 rounded bg-green-700 text-white hover:bg-green-800">Checkout</Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
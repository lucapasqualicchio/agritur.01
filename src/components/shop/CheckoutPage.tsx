import Header from '../Header';
import Footer from '../Footer';
import { useCart } from '../../context/CartContext';
import SEO from '../SEO';
import { mapCartItems, saveOrder } from '../../utils/orderService';
import { useState } from 'react';

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [status, setStatus] = useState<string>('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = {
      buyer_name: String(form.get('name') || ''),
      buyer_surname: String(form.get('surname') || ''),
      buyer_email: String(form.get('email') || ''),
      phone: String(form.get('phone') || ''),
      shipping_address: String(form.get('address') || ''),
      city: String(form.get('city') || ''),
      zip: String(form.get('zip') || ''),
      payment_method: (String(form.get('payment') || 'card') as 'card' | 'paypal'),
      amount: total,
      items: mapCartItems(items),
    };
    const { data, error } = await saveOrder(payload);
    if (error) {
      setStatus(String(error));
    } else {
      setStatus('Grazie per il tuo acquisto. Ordine registrato.');
      clearCart();
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Checkout – Dati di spedizione e pagamento"
        description="Inserisci indirizzo di spedizione, seleziona il metodo di pagamento (carta o PayPal) e conferma l’ordine."
        urlPath="/checkout"
      />
      <Header />
      <main className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8">Checkout</h1>
          <p className="mb-6">Totale: <span className="font-bold">€ {total.toFixed(2)}</span></p>
          {items.length === 0 ? (
            <p className="text-gray-700">Il carrello è vuoto.</p>
          ) : (
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <input name="name" placeholder="Nome" className="border rounded px-3 py-2" required />
                <input name="surname" placeholder="Cognome" className="border rounded px-3 py-2" required />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <input name="email" type="email" placeholder="Email" className="border rounded px-3 py-2" required />
                <input name="phone" placeholder="Telefono" className="border rounded px-3 py-2" required />
              </div>
              <input name="address" placeholder="Indirizzo di spedizione" className="border rounded px-3 py-2 w-full" required />
              <div className="grid sm:grid-cols-2 gap-4">
                <input name="city" placeholder="Città" className="border rounded px-3 py-2" required />
                <input name="zip" placeholder="CAP" className="border rounded px-3 py-2" required />
              </div>

              <fieldset className="border rounded px-3 py-2">
                <legend className="font-semibold">Metodo di pagamento</legend>
                <div className="flex gap-6 mt-2">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="payment" value="card" defaultChecked />
                    Carta di credito
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="payment" value="paypal" />
                    PayPal
                  </label>
                </div>
              </fieldset>

              <button type="submit" className="bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800">Conferma e salva ordine</button>
              {status && <p className="text-sm text-gray-700">{status}</p>}
              <p className="text-xs text-gray-500">Login richiesto in futuro: predisporremo autenticazione email/password prima del pagamento reale.</p>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
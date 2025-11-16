import Header from '../Header';
import Footer from '../Footer';
import { useCart } from '../../context/CartContext';
import SEO from '../SEO';
import { mapCartItems, saveOrder, totalPieces } from '../../utils/orderService';
import { useEffect, useRef, useState } from 'react';

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [status, setStatus] = useState<string>('');
  const [finalTotal, setFinalTotal] = useState<number | null>(null);
  const [method, setMethod] = useState<'card' | 'paypal'>('card');
  const paypalContainerRef = useRef<HTMLDivElement | null>(null);
  const paypalClientId = (import.meta.env.VITE_PAYPAL_CLIENT_ID || '').trim();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = {
      email: String(form.get('email') || ''),
      phone: String(form.get('phone') || ''),
      address: String(form.get('address') || ''),
      amount: total,
      people: String(totalPieces(items)),
      payment_method: 'card',
      payment_id: undefined,
    };
    const { data, error, orderCode } = await saveOrder(payload);
    if (error) {
      setStatus(String(error));
    } else {
      const codeText = orderCode ? ` Codice: ${orderCode}` : '';
      setStatus(`Grazie per il tuo acquisto. Ordine registrato.${codeText}`);
      setFinalTotal(total);
      clearCart();
    }
  }

  // Render PayPal buttons when method=paypal
  useEffect(() => {
    if (method !== 'paypal') return;
    if (!paypalClientId) {
      setStatus('PayPal non configurato: manca VITE_PAYPAL_CLIENT_ID');
      return;
    }
    // load SDK once
    const existing = document.querySelector('script[data-paypal-sdk]') as HTMLScriptElement | null;
    const load = async () => {
      if (!existing) {
        const script = document.createElement('script');
        script.src = `https://www.paypal.com/sdk/js?client-id=${paypalClientId}&currency=EUR`;
        script.async = true;
        script.setAttribute('data-paypal-sdk', 'true');
        await new Promise<void>((resolve) => {
          script.onload = () => resolve();
          document.head.appendChild(script);
        });
      }
      const paypal = (window as any).paypal;
      if (!paypal || !paypalContainerRef.current) return;
      paypalContainerRef.current.innerHTML = '';
      paypal.Buttons({
        createOrder: async () => {
          const res = await fetch('/api/paypal/create-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: total, currency_code: 'EUR' }),
          });
          const json = await res.json();
          if (!res.ok) throw new Error(JSON.stringify(json));
          return json.id;
        },
        onApprove: async (data: any) => {
          const res = await fetch('/api/paypal/capture-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderID: data.orderID }),
          });
          const json = await res.json();
          if (!res.ok) {
            setStatus('Pagamento PayPal non riuscito');
            return;
          }
          // After successful capture, save order as fulfilled purchase
          const formEl = document.querySelector('form');
          const form = formEl ? new FormData(formEl as HTMLFormElement) : new FormData();
          // Estrarre l'id di cattura PayPal se disponibile
          const captureId = (json?.purchase_units?.[0]?.payments?.captures?.[0]?.id)
            || json?.id
            || data?.orderID;
          const payload = {
            email: String(form.get('email') || ''),
            phone: String(form.get('phone') || ''),
            address: String(form.get('address') || ''),
            amount: total,
            people: String(totalPieces(items)),
            payment_method: 'paypal',
            payment_id: captureId ? String(captureId) : undefined,
          };
          const { error, orderCode } = await saveOrder(payload);
          if (error) {
            setStatus(String(error));
          } else {
            const codeText = orderCode ? ` Codice: ${orderCode}` : '';
            setStatus(`Pagamento PayPal confermato. Ordine registrato.${codeText}`);
            setFinalTotal(total);
            clearCart();
          }
        },
        onError: (err: any) => {
          setStatus(`Errore PayPal: ${String(err)}`);
        },
      }).render(paypalContainerRef.current);
    };
    load();
    return () => {
      if (paypalContainerRef.current) paypalContainerRef.current.innerHTML = '';
    };
  }, [method, paypalClientId, total, items]);

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
          <p className="mb-6">Totale: <span className="font-bold">€ {(finalTotal ?? total).toFixed(2)}</span></p>
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
                    <input type="radio" name="payment" value="card" defaultChecked onChange={() => setMethod('card')} />
                    Carta di credito
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="payment" value="paypal" onChange={() => setMethod('paypal')} />
                    PayPal
                  </label>
                </div>
              </fieldset>

              {method === 'paypal' ? (
                <div>
                  {!paypalClientId && (
                    <p className="text-red-700">Configura VITE_PAYPAL_CLIENT_ID per abilitare PayPal.</p>
                  )}
                  <div ref={paypalContainerRef} />
                </div>
              ) : (
                <button type="submit" className="bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800">Conferma e salva ordine</button>
              )}

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
import Header from '../Header';
import Footer from '../Footer';
import SEO from '../SEO';
import { supabase } from '../../utils/supabaseClient';
import { useEffect, useState } from 'react';

type OrderRow = {
  id: number;
  buyer_name: string;
  buyer_surname: string;
  buyer_email: string;
  phone: string;
  shipping_address: string;
  city: string;
  zip: string;
  payment_method: string;
  amount: number;
  created_at: string;
  items: any;
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const isAdmin = localStorage.getItem('admin') === 'true';
    if (!isAdmin) {
      window.location.href = '/admin/login';
      return;
    }
    if (!supabase) {
      setError('Supabase non configurato. Imposta VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.');
      return;
    }
    (async () => {
      const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
      if (error) setError(String(error.message || error));
      else setOrders(data as OrderRow[]);
    })();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <SEO title="Admin – Ordini" description="Visualizza e gestisci gli ordini salvati su Supabase." urlPath="/admin" />
      <Header />
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-6">Ordini</h1>
          {error && <p className="text-red-700 mb-4">{error}</p>}
          <div className="overflow-x-auto bg-white rounded-xl shadow">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-3">Data</th>
                  <th className="p-3">Cliente</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Telefono</th>
                  <th className="p-3">Indirizzo</th>
                  <th className="p-3">Importo</th>
                  <th className="p-3">Metodo</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o.id} className="border-t">
                    <td className="p-3">{new Date(o.created_at).toLocaleString()}</td>
                    <td className="p-3">{o.buyer_name} {o.buyer_surname}</td>
                    <td className="p-3">{o.buyer_email}</td>
                    <td className="p-3">{o.phone}</td>
                    <td className="p-3">{o.shipping_address}, {o.city} {o.zip}</td>
                    <td className="p-3">€ {o.amount.toFixed(2)}</td>
                    <td className="p-3">{o.payment_method}</td>
                  </tr>
                ))}
                {orders.length === 0 && !error && (
                  <tr>
                    <td className="p-3" colSpan={7}>Nessun ordine presente.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
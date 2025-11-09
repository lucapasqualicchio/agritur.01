import Header from '../Header';
import Footer from '../Footer';
import SEO from '../SEO';
import { useEffect, useState } from 'react';
import { getOrders, getBookings } from '../../utils/adminApi';

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

type BookingRow = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  date: string; // date
  people: number;
  note?: string;
  status: string;
  created_at: string; // timestamptz
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [bookings, setBookings] = useState<BookingRow[]>([]);
  const [error, setError] = useState<string>('');
  const [tab, setTab] = useState<'orders' | 'bookings'>('orders');

  useEffect(() => {
    const token = localStorage.getItem('admin_token') || '';
    if (!token) {
      window.location.href = '/admin/login';
      return;
    }
    (async () => {
      const gotOrders = await getOrders(token);
      if (gotOrders.error) setError(String(gotOrders.error));
      else setOrders((gotOrders.orders as OrderRow[]) || []);

      const gotBookings = await getBookings(token);
      if (gotBookings.error) setError(String(gotBookings.error));
      else setBookings((gotBookings.bookings as BookingRow[]) || []);
    })();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <SEO title="Admin – Gestione" description="Visualizza e gestisci ordini e prenotazioni salvati su Supabase." urlPath="/admin" />
      <Header />
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-6">Area Admin</h1>
          <div className="flex gap-2 mb-6">
            <button onClick={() => setTab('orders')} className={`px-4 py-2 rounded ${tab==='orders' ? 'bg-green-700 text-white' : 'bg-gray-100 text-gray-800'}`}>Ordini</button>
            <button onClick={() => setTab('bookings')} className={`px-4 py-2 rounded ${tab==='bookings' ? 'bg-green-700 text-white' : 'bg-gray-100 text-gray-800'}`}>Prenotazioni</button>
          </div>
          {error && <p className="text-red-700 mb-4">{error}</p>}
          {tab === 'orders' ? (
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
          ) : (
            <div className="overflow-x-auto bg-white rounded-xl shadow">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="p-3">Creazione</th>
                    <th className="p-3">Data Prenotazione</th>
                    <th className="p-3">Nome</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Telefono</th>
                    <th className="p-3">Persone</th>
                    <th className="p-3">Stato</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map(b => (
                    <tr key={b.id} className="border-t">
                      <td className="p-3">{new Date(b.created_at).toLocaleString()}</td>
                      <td className="p-3">{new Date(b.date).toLocaleDateString()}</td>
                      <td className="p-3">{b.name}</td>
                      <td className="p-3">{b.email}</td>
                      <td className="p-3">{b.phone || '-'}</td>
                      <td className="p-3">{b.people}</td>
                      <td className="p-3">{b.status}</td>
                    </tr>
                  ))}
                  {bookings.length === 0 && !error && (
                    <tr>
                      <td className="p-3" colSpan={7}>Nessuna prenotazione presente.</td>
                    </tr>
                  )}
                </tbody>
              </table>
              {bookings.some(b => b.note) && (
                <p className="text-xs text-gray-500 p-3">Nota disponibile nei dati: aggiungeremo una colonna dedicata se desideri.</p>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
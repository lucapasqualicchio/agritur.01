import Header from '../Header';
import Footer from '../Footer';
import SEO from '../SEO';
import { useEffect, useState } from 'react';
import { getOrders, getBookings, updateOrderStatus } from '../../utils/adminApi';

type OrderRow = {
  orders: string;
  email: string;
  phone?: string;
  address?: string;
  date?: string;
  people?: string;
  status?: string;
  created_et: string;
  amount?: number;
  payment_method?: string;
  payment_id?: string;
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
  const [saving, setSaving] = useState<string>('');
  const token = localStorage.getItem('admin_token') || '';

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
                    <th className="p-3">Codice</th>
                    <th className="p-3">Creato</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Telefono</th>
                    <th className="p-3">Indirizzo</th>
                    <th className="p-3">Totale</th>
                    <th className="p-3">Persone</th>
                    <th className="p-3">Pagamento</th>
                    <th className="p-3">Transazione</th>
                    <th className="p-3">Stato</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(o => (
                    <tr key={o.orders} className="border-t">
                      <td className="p-3">{o.orders}</td>
                      <td className="p-3">{new Date(o.created_et).toLocaleString()}</td>
                      <td className="p-3">{o.email}</td>
                      <td className="p-3">{o.phone || '-'}</td>
                      <td className="p-3">{o.address || '-'}</td>
                      <td className="p-3">€ {Number(o.amount || 0).toFixed(2)}</td>
                      <td className="p-3">{o.people || '-'}</td>
                      <td className="p-3">{o.payment_method || '-'}</td>
                      <td className="p-3">{o.payment_id || '-'}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <select
                            defaultValue={o.status || 'nuovo'}
                            onChange={async (e) => {
                              const next = e.target.value as 'nuovo' | 'evaso';
                              setSaving(o.orders);
                              const { error } = await updateOrderStatus(token, o.orders, next);
                              setSaving('');
                              if (error) {
                                setError(String(error));
                              } else {
                                setOrders(prev => prev.map(p => p.orders === o.orders ? { ...p, status: next } : p));
                              }
                            }}
                            className="border rounded px-2 py-1"
                          >
                            <option value="nuovo">nuovo</option>
                            <option value="evaso">evaso</option>
                          </select>
                          {saving === o.orders && (
                            <span className="text-xs text-gray-500">Salvataggio…</span>
                          )}
                        </div>
                      </td>
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
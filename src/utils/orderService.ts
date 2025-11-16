import { supabase } from './supabaseClient';
import type { CartItem } from '../context/CartContext';

export type OrderPayload = {
  email: string;
  phone?: string;
  amount: number;
  people?: string; // numero totale pezzi/acquisti, in testo
  date?: string;   // opzionale (YYYY-MM-DD)
  address?: string; // indirizzo di spedizione
  payment_method?: string; // tipologia di pagamento (es. 'paypal', 'card')
  payment_id?: string; // id transazione (es. capture id PayPal)
};

export async function saveOrder(payload: OrderPayload) {
  // Prefer serverless API if available (works in Vercel, no anon key needed)
  try {
    const base = (import.meta.env.VITE_ADMIN_API_URL || '').trim();
    const url = `${base ? base : ''}/api/orders`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    if (!res.ok) return { error: json.error || 'Errore nel salvataggio ordine' };
    const orderCode = Array.isArray(json.data) ? json.data[0]?.orders : json.data?.orders;
    return { data: json.data, orderCode };
  } catch (e) {
    // Fallback: salva direttamente via Supabase client se configurato
    if (!supabase) {
      return { error: 'Supabase non configurato. Imposta VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.' };
    }
    // Fallback diretto: mappa ai nomi colonna forniti
    const row = {
      orders: `ORD-${Date.now()}`,
      email: payload.email,
      phone: payload.phone || null,
      // Se la data non è fornita, usa oggi in formato YYYY-MM-DD
      date: payload.date || new Date().toISOString().slice(0, 10),
      people: payload.people || null,
      address: payload.address || null,
      payment_method: payload.payment_method || null,
      payment_id: payload.payment_id || null,
      status: 'nuovo',
      created_et: new Date().toISOString(),
      amount: payload.amount,
    };
    const { data, error } = await supabase
      .from('orders')
      .insert([row])
      .select();
    const orderCode = Array.isArray(data) ? data[0]?.orders : (data as any)?.orders;
    return { data, error, orderCode };
  }
}

export function mapCartItems(items: CartItem[]) {
  return items.map(i => ({
    product_id: i.product.id,
    name: i.product.name,
    price: i.product.price,
    quantity: i.quantity,
  }));
}

export function totalPieces(items: CartItem[]) {
  return items.reduce((sum, i) => sum + i.quantity, 0);
}
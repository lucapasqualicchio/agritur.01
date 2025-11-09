import { supabase } from './supabaseClient';
import type { CartItem } from '../context/CartContext';

export type OrderPayload = {
  buyer_name: string;
  buyer_surname: string;
  buyer_email: string;
  phone: string;
  shipping_address: string;
  city: string;
  zip: string;
  payment_method: 'card' | 'paypal';
  amount: number;
  items: { product_id: string; name: string; price: number; quantity: number }[];
  created_at?: string;
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
    return { data: json.data };
  } catch (e) {
    // Fallback: salva direttamente via Supabase client se configurato
    if (!supabase) {
      return { error: 'Supabase non configurato. Imposta VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.' };
    }
    const { data, error } = await supabase
      .from('orders')
      .insert([{ ...payload, created_at: new Date().toISOString() }])
      .select();
    return { data, error };
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
import { createClient } from '@supabase/supabase-js';
import type { PostgrestError } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || '';
const supabase = SUPABASE_URL && SUPABASE_SERVICE_KEY
  ? createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)
  : null;

function allowCors(res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
}

function generateOrderCode() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  const h = String(now.getHours()).padStart(2, '0');
  const min = String(now.getMinutes()).padStart(2, '0');
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `ORD-${y}${m}${d}-${h}${min}-${rand}`;
}

export default async function handler(req: any, res: any) {
  allowCors(res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  if (!supabase) return res.status(500).json({ error: 'Supabase non configurato' });

  // Payload previsto: { email, phone?, amount, people?, date? }
  const body = req.body || {};
  const email = String(body.email || '');
  const phone = body.phone != null ? String(body.phone) : null;
  const address = body.address != null ? String(body.address) : null;
  const amount = Number(body.amount || 0);
  const people = body.people != null ? String(body.people) : null;
  const payment_method = body.payment_method != null ? String(body.payment_method) : null;
  const payment_id = body.payment_id != null ? String(body.payment_id) : null;
  // Se non fornita, usa la data odierna (YYYY-MM-DD)
  const date = body.date != null ? String(body.date) : new Date().toISOString().slice(0, 10);

  if (!email) return res.status(400).json({ error: 'Campo mancante: email' });

  const row = {
    orders: generateOrderCode(),
    email,
    phone,
    address,
    date,
    people: people || null,
    payment_method,
    payment_id,
    status: 'nuovo',
    created_et: new Date().toISOString(),
    amount,
  };

  // Inserimento con fallback: se alcune colonne opzionali non esistono, ritenta senza di esse.
  let insert1 = await supabase.from('orders').insert([row]).select();
  if (insert1.error) {
    const msg = String((insert1.error as PostgrestError)?.message || insert1.error).toLowerCase();
    if (msg.includes('address') || msg.includes('payment_method') || msg.includes('payment_id')) {
      const { address: _a, payment_method: _pm, payment_id: _pid, ...rowSans } = row as any;
      insert1 = await supabase.from('orders').insert([rowSans]).select();
    }
  }
  if (insert1.error) return res.status(500).json({ error: String(insert1.error.message || insert1.error) });
  return res.status(200).json({ data: insert1.data });
}
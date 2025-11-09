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

export default async function handler(req: any, res: any) {
  allowCors(res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  if (!supabase) return res.status(500).json({ error: 'Supabase non configurato' });

  // Basic payload validation
  const body = req.body || {};
  const payload = {
    buyer_name: String(body.buyer_name || ''),
    buyer_surname: String(body.buyer_surname || ''),
    buyer_email: String(body.buyer_email || ''),
    phone: String(body.phone || ''),
    shipping_address: String(body.shipping_address || ''),
    city: String(body.city || ''),
    zip: String(body.zip || ''),
    payment_method: String(body.payment_method || 'card'),
    amount: Number(body.amount || 0),
    items: Array.isArray(body.items) ? body.items : [],
    created_at: new Date().toISOString(),
  };

  const required = ['buyer_name','buyer_surname','buyer_email'];
  for (const k of required) {
    if (!payload[k as keyof typeof payload]) {
      return res.status(400).json({ error: `Campo mancante: ${k}` });
    }
  }

  const { data, error }: { data: any; error: PostgrestError | null } = await supabase
    .from('orders')
    .insert([payload])
    .select();

  if (error) return res.status(500).json({ error: String(error.message || error) });
  return res.status(200).json({ data });
}
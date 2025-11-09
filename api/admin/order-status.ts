import { createHash } from 'crypto';
import { createClient } from '@supabase/supabase-js';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || '';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';
const ADMIN_TOKEN = createHash('sha256')
  .update(String(ADMIN_EMAIL) + ':' + String(ADMIN_PASSWORD))
  .digest('hex');

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || '';
const supabase = SUPABASE_URL && SUPABASE_SERVICE_KEY
  ? createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)
  : null;

export default async function handler(req: any, res: any) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const auth = String(req.headers['authorization'] || '');
  const token = auth.startsWith('Bearer ') ? auth.slice('Bearer '.length) : '';
  if (!token || token !== ADMIN_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (!supabase) {
    return res.status(500).json({ error: 'Supabase non configurato' });
  }

  const { orders, status } = req.body || {};
  if (!orders || typeof orders !== 'string') {
    return res.status(400).json({ error: 'Parametro mancante: orders' });
  }
  const next = String(status || '').trim();
  if (!next || (next !== 'nuovo' && next !== 'evaso')) {
    return res.status(400).json({ error: "Stato non valido: usa 'nuovo' o 'evaso'" });
  }

  const { data, error } = await supabase
    .from('orders')
    .update({ status: next })
    .eq('orders', orders)
    .select();

  if (error) return res.status(500).json({ error: String(error.message || error) });
  return res.status(200).json({ data });
}
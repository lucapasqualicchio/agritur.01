const http = require('http');
const { URL } = require('url');
const fs = require('fs');

// Minimal .env loader (no external deps)
function loadEnv(path = '.env') {
  try {
    const text = fs.readFileSync(path, 'utf8');
    text.split(/\r?\n/).forEach((line) => {
      const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (m) {
        const key = m[1];
        let val = m[2];
        if (val.startsWith('`') && val.endsWith('`')) val = val.slice(1, -1);
        if (!process.env[key]) process.env[key] = val;
      }
    });
  } catch (e) {
    // ignore if .env missing
  }
}
// load local first (higher precedence), then base
loadEnv('.env.local');
loadEnv('.env');

const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const PORT = Number(process.env.ADMIN_PORT || 8787);

function json(res, status, data) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  });
  res.end(JSON.stringify(data));
}

function notFound(res) {
  json(res, 404, { error: 'Not found' });
}

function unauthorized(res) {
  json(res, 401, { error: 'Unauthorized' });
}

function getBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => {
      try { resolve(JSON.parse(body || '{}')); } catch { resolve({}); }
    });
  });
}

const ADMIN_TOKEN = crypto
  .createHash('sha256')
  .update(String(ADMIN_EMAIL || '') + ':' + String(ADMIN_PASSWORD || ''))
  .digest('hex');

const supabase = SUPABASE_URL && SUPABASE_SERVICE_KEY
  ? createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)
  : null;

const server = http.createServer(async (req, res) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    });
    return res.end();
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname;

  if (path === '/api/admin/login' && req.method === 'POST') {
    const body = await getBody(req);
    if (body.email === ADMIN_EMAIL && body.password === ADMIN_PASSWORD) {
      return json(res, 200, { token: ADMIN_TOKEN });
    }
    return unauthorized(res);
  }

  // protected routes
  const auth = req.headers['authorization'] || '';
  const token = String(auth).startsWith('Bearer ')
    ? String(auth).slice('Bearer '.length)
    : '';
  if (!token || token !== ADMIN_TOKEN) return unauthorized(res);

  if (path === '/api/admin/orders' && req.method === 'GET') {
    if (!supabase) return json(res, 500, { error: 'Supabase non configurato' });
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) return json(res, 500, { error: String(error.message || error) });
    return json(res, 200, { orders: data });
  }

  if (path === '/api/admin/bookings' && req.method === 'GET') {
    if (!supabase) return json(res, 500, { error: 'Supabase non configurato' });
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) return json(res, 500, { error: String(error.message || error) });
    return json(res, 200, { bookings: data });
  }

  return notFound(res);
});

server.listen(PORT, () => {
  console.log(`[admin] server running on http://localhost:${PORT}`);
});
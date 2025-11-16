const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID || '';
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET || '';
const PAYPAL_API = 'https://api-m.sandbox.paypal.com';

async function getAccessToken() {
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64');
  const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ grant_type: 'client_credentials' }).toString(),
  });
  if (!res.ok) throw new Error(`PayPal token error: ${res.status}`);
  const json = await res.json();
  return json.access_token as string;
}

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
      return res.status(500).json({ error: 'PayPal non configurato: impostare PAYPAL_CLIENT_ID e PAYPAL_CLIENT_SECRET' });
    }
    const { amount, currency_code = 'EUR' } = (req.body || {}) as { amount: number; currency_code?: string };
    if (!amount || Number(amount) <= 0) return res.status(400).json({ error: 'Importo non valido' });

    const accessToken = await getAccessToken();
    const createRes = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          { amount: { currency_code, value: Number(amount).toFixed(2) } }
        ],
      }),
    });
    const data = await createRes.json();
    if (!createRes.ok) return res.status(createRes.status).json({ error: data });
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ error: String(e) });
  }
}
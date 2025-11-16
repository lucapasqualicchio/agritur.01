# Agritur – Configurazione Supabase sicura (Vercel)

Per evitare che le chiavi vengano committate e garantire un uso corretto tra client e server:

## Variabili d’ambiente

- Client (esposte al browser):
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
  - `VITE_ADMIN_API_URL` (solo in sviluppo; in produzione lasciala vuota per usare percorsi relativi `/api/...`)
  - `VITE_PAYPAL_CLIENT_ID` (SDK client-side; usa Sandbox/Live a seconda dell’ambiente)

- Server (mai esposte al browser):
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_KEY`
  - `ADMIN_EMAIL`
  - `ADMIN_PASSWORD`
  - `PAYPAL_CLIENT_ID`
  - `PAYPAL_CLIENT_SECRET`

Consulta `.env.example` e NON inserire valori reali nei file del repo.

## Ignora file .env

`/.gitignore` include già:

```
.env
*.local
```

Se per errore hai committato `.env` o `.env.local` in passato, rimuovili dalla cache e ruota le chiavi:

```
git rm --cached .env .env.local
```

## Imposta variabili su Vercel

In Vercel → Project Settings → Environment Variables:

- Production/Preview/Development:
  - `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` (Server-side)
  - `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_PAYPAL_CLIENT_ID` (Client-side)
  - `PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_SECRET` (Server-side)
  - (Opzionale) `VITE_ADMIN_API_URL` solo per sviluppo locale

Poi ridistribuisci il progetto.

## Uso nel codice

- Client: `src/utils/supabaseClient.ts` usa solo `VITE_*` e crea il client con la **anon key**.
- API serverless: file in `api/**` e `server/adminServer.cjs` usano `process.env.SUPABASE_SERVICE_KEY` esclusivamente lato server.
- Le chiamate admin dal browser puntano a `/api/admin/*` e non espongono chiavi.
 - PayPal: 
   - Client carica l’SDK con `VITE_PAYPAL_CLIENT_ID` e usa i pulsanti in `CheckoutPage`.
   - Server: `api/paypal/create-order.ts` e `api/paypal/capture-order.ts` gestiscono la creazione/cattura con `PAYPAL_CLIENT_ID`/`PAYPAL_CLIENT_SECRET`.

## Note

- Se una chiave di servizio è stata resa pubblica, ruotala in Supabase (Settings → API → Service role). 
- In produzione, ometti `VITE_ADMIN_API_URL`: le chiamate useranno i percorsi relativi del dominio Vercel.
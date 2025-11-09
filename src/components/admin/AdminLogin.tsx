import Header from '../Header';
import Footer from '../Footer';
import SEO from '../SEO';
import { useState } from 'react';

export default function AdminLogin() {
  const [msg, setMsg] = useState('');
  const expected = import.meta.env.VITE_ADMIN_PASSWORD as string | undefined;

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const pwd = String(form.get('password') || '');
    if (expected && pwd === expected) {
      localStorage.setItem('admin', 'true');
      window.location.href = '/admin';
    } else {
      setMsg('Password errata o non configurata.');
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <SEO title="Admin – Login" description="Accedi come amministratore per visualizzare gli ordini." urlPath="/admin/login" />
      <Header />
      <main className="py-12">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-6">Login Admin</h1>
          <form onSubmit={onSubmit} className="space-y-4">
            <input type="password" name="password" placeholder="Password" className="border rounded px-3 py-2 w-full" />
            <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded">Accedi</button>
            {msg && <p className="text-sm text-gray-700">{msg}</p>}
            <p className="text-xs text-gray-500">Nota: per sviluppo, imposta VITE_ADMIN_PASSWORD.</p>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
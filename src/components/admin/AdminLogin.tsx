import Header from '../Header';
import Footer from '../Footer';
import SEO from '../SEO';
import { useState } from 'react';
import { adminLogin } from '../../utils/adminApi';

export default function AdminLogin() {
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const email = String(form.get('email') || '');
    const password = String(form.get('password') || '');
    const { token, error } = await adminLogin(email, password);
    setLoading(false);
    if (error || !token) {
      setMsg(error || 'Credenziali non valide');
      return;
    }
    localStorage.setItem('admin_token', token);
    window.location.href = '/admin';
  }

  return (
    <div className="min-h-screen bg-white">
      <SEO title="Admin – Login" description="Accedi come amministratore per visualizzare gli ordini." urlPath="/admin/login" />
      <Header />
      <main className="py-12">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-6">Login Admin</h1>
          <form onSubmit={onSubmit} className="space-y-4">
            <input type="email" name="email" placeholder="Email admin" className="border rounded px-3 py-2 w-full" required />
            <input type="password" name="password" placeholder="Password" className="border rounded px-3 py-2 w-full" required />
            <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded" disabled={loading}>{loading ? 'Accesso…' : 'Accedi'}</button>
            {msg && <p className="text-sm text-red-700">{msg}</p>}
            <p className="text-xs text-gray-500">Le credenziali vengono verificate dal server admin.</p>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
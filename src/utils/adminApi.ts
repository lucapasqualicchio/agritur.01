const API_URL = import.meta.env.VITE_ADMIN_API_URL || 'http://localhost:8787';

export async function adminLogin(email: string, password: string): Promise<{ token?: string; error?: string }> {
  try {
    const res = await fetch(`${API_URL}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const json = await res.json();
    if (!res.ok) return { error: json.error || 'Login failed' };
    return { token: json.token };
  } catch (e) {
    return { error: String(e) };
  }
}

export async function getOrders(token: string): Promise<{ orders?: any[]; error?: string }> {
  try {
    const res = await fetch(`${API_URL}/api/admin/orders`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    const json = await res.json();
    if (!res.ok) return { error: json.error || 'Fetch failed' };
    return { orders: json.orders };
  } catch (e) {
    return { error: String(e) };
  }
}

export async function getBookings(token: string): Promise<{ bookings?: any[]; error?: string }> {
  try {
    const res = await fetch(`${API_URL}/api/admin/bookings`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    const json = await res.json();
    if (!res.ok) return { error: json.error || 'Fetch failed' };
    return { bookings: json.bookings };
  } catch (e) {
    return { error: String(e) };
  }
}
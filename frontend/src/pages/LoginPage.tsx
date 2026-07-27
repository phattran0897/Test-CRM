import { useState } from 'react';
import { useAuthStore } from '../store/auth.store';
import { apiClient } from '../lib/axios';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [tenantId, setTenantId] = useState(''); // Normally this might be extracted from domain/subdomain
    const [error, setError] = useState('');
    const setUser = useAuthStore((state) => state.setUser);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await apiClient.post('/auth/login', { email, password, tenantId });
            setUser(res.data.user);
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="flex bg-gray-100 min-h-screen items-center justify-center">
            <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-96 space-y-4">
                <h2 className="text-2xl font-bold mb-4">Login CRM</h2>
                {error && <div className="text-red-500 text-sm">{error}</div>}

                <div>
                    <label className="block text-sm font-medium">Tenant ID (UUID)</label>
                    <input className="border p-2 w-full mt-1 rounded" required value={tenantId} onChange={(e) => setTenantId(e.target.value)} />
                </div>
                <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input type="email" className="border p-2 w-full mt-1 rounded" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label className="block text-sm font-medium">Password</label>
                    <input type="password" className="border p-2 w-full mt-1 rounded" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
                    Login
                </button>
            </form>
        </div>
    );
}

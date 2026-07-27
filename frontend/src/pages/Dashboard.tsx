import { useEffect, useState } from 'react';
import { apiClient } from '../lib/axios';
import { KPICard } from '../components/ui/KPICard';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

export default function Dashboard() {
    const [metrics, setMetrics] = useState<any>(null);

    useEffect(() => {
        apiClient.get('/dashboard/metrics')
            .then(res => setMetrics(res.data))
            .catch(console.error);
    }, []);

    if (!metrics) return (
        <div className="flex h-screen items-center justify-center bg-gray-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
    );

    return (
        <div className="p-8 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen text-slate-800">
            <h1 className="text-4xl font-extrabold mb-8 tracking-tight text-slate-900 border-b pb-4 border-slate-200">
                Overview Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                <div className="transform transition duration-300 hover:scale-105">
                    <KPICard title="Total Revenue" value={metrics.revenue.toLocaleString()} prefix="$" />
                </div>
                <div className="transform transition duration-300 hover:scale-105">
                    <KPICard title="New Customers" value={metrics.newCustomers} />
                </div>
                <div className="transform transition duration-300 hover:scale-105">
                    <KPICard title="Active Leads" value={metrics.activeLeads} />
                </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 h-96">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-slate-800">Monthly Sales Volume</h3>
                    <span className="text-sm font-medium px-3 py-1 bg-green-100 text-green-700 rounded-full">+12% vs last year</span>
                </div>
                <ResponsiveContainer width="100%" height="90%">
                    <AreaChart data={metrics.monthlySales}>
                        <defs>
                            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tickMargin={10} />
                        <YAxis axisLine={false} tickLine={false} tickMargin={10} />
                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                        <Area type="monotone" dataKey="sales" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

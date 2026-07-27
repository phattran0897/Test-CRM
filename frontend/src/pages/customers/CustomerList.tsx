import { useEffect, useState } from 'react';
import { apiClient } from '../../lib/axios';
import { Link } from 'react-router-dom';

export default function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        apiClient.get('/customers?limit=50')
            .then(res => setCustomers(res.data.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="p-8 bg-slate-50 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-slate-800">Customers</h1>
                <button className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition">
                    + Add Customer
                </button>
            </div>
            <div className="bg-white shadow rounded-lg overflow-hidden border border-slate-200">
                <table className="w-full text-left">
                    <thead className="bg-slate-100 text-slate-600 border-b border-slate-200">
                        <tr>
                            <th className="p-4 font-semibold uppercase text-sm">Name</th>
                            <th className="p-4 font-semibold uppercase text-sm">Email</th>
                            <th className="p-4 font-semibold uppercase text-sm">Company</th>
                            <th className="p-4 font-semibold uppercase text-sm text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={4} className="p-4 text-center">Loading...</td></tr>
                        ) : customers.length === 0 ? (
                            <tr><td colSpan={4} className="p-4 text-center text-slate-500">No customers found.</td></tr>
                        ) : (
                            customers.map((c: any) => (
                                <tr key={c.id} className="border-b last:border-0 hover:bg-slate-50 transition">
                                    <td className="p-4 font-medium text-slate-800">{c.name}</td>
                                    <td className="p-4 text-slate-600">{c.email}</td>
                                    <td className="p-4 text-slate-600">{c.company || '-'}</td>
                                    <td className="p-4 text-right">
                                        <Link to={`/customers/${c.id}`} className="text-blue-500 hover:text-blue-700 font-medium">View</Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

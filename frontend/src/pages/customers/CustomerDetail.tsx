import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiClient } from '../../lib/axios';
import { useAuthStore } from '../../store/auth.store';

export default function CustomerDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState<any>(null);
    const user = useAuthStore(s => s.user);

    useEffect(() => {
        apiClient.get(`/customers/${id}`)
            .then(res => setCustomer(res.data))
            .catch(console.error);
    }, [id]);

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this customer?')) return;
        try {
            await apiClient.delete(`/customers/${id}`);
            navigate('/customers');
        } catch (e: any) {
            alert(e.response?.data?.message || 'Failed to delete');
        }
    };

    if (!customer) return (
        <div className="flex h-screen items-center justify-center bg-gray-50">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-600"></div>
        </div>
    );

    return (
        <div className="p-8 bg-slate-50 min-h-screen">
            <div className="flex items-center space-x-4 mb-6 cursor-pointer text-blue-600 hover:text-blue-800 font-medium" onClick={() => navigate(-1)}>
                &larr; Back to Customers
            </div>
            <div className="flex space-x-6">
                <div className="w-1/3">
                    <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 flex flex-col items-center">
                        <div className="w-24 h-24 bg-gradient-to-tr from-blue-100 to-blue-200 rounded-full flex items-center justify-center text-blue-600 font-bold text-3xl mb-4 shadow-inner">
                            {customer.name?.charAt(0).toUpperCase()}
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900 mb-1">{customer.name}</h1>
                        <p className="text-slate-500 text-center">{customer.company || 'Unknown Company'}</p>

                        {user && ['admin', 'manager'].includes(user.role) && (
                            <button onClick={handleDelete} className="mt-6 bg-red-50 text-red-600 border border-red-100 px-4 py-2 rounded-lg hover:bg-red-100 transition w-full font-medium">
                                Remove Customer
                            </button>
                        )}
                    </div>
                </div>

                <div className="w-2/3 bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
                    <h3 className="text-xl font-bold text-slate-800 border-b pb-4 mb-6">Contact Information</h3>
                    <div className="grid grid-cols-2 gap-y-8 gap-x-6 mb-8 text-slate-700">
                        <div>
                            <span className="block text-xs font-bold uppercase text-slate-400 mb-1">Email Address</span>
                            <span className="font-medium text-lg text-slate-800">{customer.email || 'N/A'}</span>
                        </div>
                        <div>
                            <span className="block text-xs font-bold uppercase text-slate-400 mb-1">Phone Number</span>
                            <span className="font-medium text-lg text-slate-800">{customer.phone || 'N/A'}</span>
                        </div>
                        <div className="col-span-2">
                            <span className="block text-xs font-bold uppercase text-slate-400 mb-1">Office Address</span>
                            <span className="font-medium text-lg text-slate-800">{customer.address || 'N/A'}</span>
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-slate-800 border-b pb-4 mb-6">Activity Timeline</h3>
                    <div className="space-y-4">
                        <div className="flex border-l-2 border-blue-500 pl-4 py-2 opacity-60">
                            <div>
                                <p className="font-medium text-slate-800">Customer record created</p>
                                <p className="text-sm text-slate-500">{new Date(customer.created_at).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

import { useEffect, useState } from 'react';
import { apiClient } from '../../lib/axios';

export default function UserManagementPage() {
    const [message, setMessage] = useState('Loading...');

    useEffect(() => {
        apiClient.get('/users')
            .then(res => setMessage(res.data.message))
            .catch(err => setMessage(`Error: ${err.response?.statusText || err.message}`));
    }, []);

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">User Management (Admin Only)</h1>
            <div className="p-4 bg-white shadow rounded">
                <p>{message}</p>
            </div>
        </div>
    );
}

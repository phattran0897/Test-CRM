export const KPICard = ({ title, value, prefix = '' }: { title: string, value: string | number, prefix?: string }) => (
    <div className="bg-white p-6 rounded shadow">
        <h3 className="text-gray-500 text-sm font-semibold">{title}</h3>
        <p className="text-3xl font-bold mt-2 text-blue-900">{prefix}{value}</p>
    </div>
);

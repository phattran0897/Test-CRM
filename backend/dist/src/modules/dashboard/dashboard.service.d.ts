export declare class DashboardService {
    getMetrics(tenantId: string): Promise<{
        revenue: number;
        newCustomers: number;
        activeLeads: number;
        monthlySales: {
            name: string;
            sales: number;
        }[];
    }>;
}

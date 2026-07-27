import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardService {
    async getMetrics(tenantId: string) {
        // Mock aggregated data for now until we have database modules built for Leads, Contracts, and Customers.
        return {
            revenue: 120500,
            newCustomers: 45,
            activeLeads: 12,
            monthlySales: [
                { name: 'Jan', sales: 4000 },
                { name: 'Feb', sales: 3000 },
                { name: 'Mar', sales: 5000 },
                { name: 'Apr', sales: 7000 },
                { name: 'May', sales: 6000 },
                { name: 'Jun', sales: 9000 },
            ]
        };
    }
}

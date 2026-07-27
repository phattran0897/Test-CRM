import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getMetrics(req: any): Promise<{
        revenue: number;
        newCustomers: number;
        activeLeads: number;
        monthlySales: {
            name: string;
            sales: number;
        }[];
    }>;
}

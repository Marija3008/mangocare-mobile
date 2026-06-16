import { dashboardMock } from "@/mocks/dashboard.mock";
import { DashboardData } from "@/features/dashboard/types";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const dashboardService = {
  getDashboard: async (): Promise<DashboardData> => {
    await wait(500);

    return dashboardMock;
  },
};
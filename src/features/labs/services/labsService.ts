import { labReportsMock } from "@/mocks/labs.mock";
import { LabReport } from "@/features/labs/types";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const labsService = {
  getLabReports: async (): Promise<LabReport[]> => {
    await wait(500);

    return labReportsMock;
  },

  getLabReportById: async (reportId: string): Promise<LabReport | undefined> => {
    await wait(400);

    return labReportsMock.find((report) => report.id === reportId);
  },
};
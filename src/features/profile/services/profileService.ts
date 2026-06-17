import { PatientProfile } from "@/features/profile/types";
import { patientProfileMock } from "@/mocks/profile.mock";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const profileService = {
  getProfile: async (): Promise<PatientProfile> => {
    await wait(400); //const response = await api.get("/patient/profile")

    return patientProfileMock; //return response.data.data;
  },
};



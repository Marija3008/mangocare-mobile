import { Consultation } from "@/features/consultations/types";
import { consultationsMock } from "@/mocks/consultations.mock";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

let consultationsStore: Consultation[] = [...consultationsMock];

export const consultationsService = {
  getConsultations: async (): Promise<Consultation[]> => {
    await wait(400);

    return [...consultationsStore].sort((a, b) => {
      const firstDate = new Date(`${a.date}T${a.time}`).getTime();
      const secondDate = new Date(`${b.date}T${b.time}`).getTime();

      return firstDate - secondDate;
    });
  },

  getConsultationById: async (
    consultationId: string
  ): Promise<Consultation | undefined> => {
    await wait(300);

    return consultationsStore.find(
      (consultation) => consultation.id === consultationId
    );
  },

  cancelConsultation: async (
    consultationId: string
  ): Promise<Consultation | undefined> => {
    await wait(400);

    consultationsStore = consultationsStore.map((consultation) =>
      consultation.id === consultationId
        ? {
            ...consultation,
            status: "cancelled",
          }
        : consultation
    );

    return consultationsStore.find(
      (consultation) => consultation.id === consultationId
    );
  },
};
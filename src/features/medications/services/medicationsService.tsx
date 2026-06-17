import { Medication } from "@/features/medications/types";
import { medicationsMock } from "@/mocks/medications.mock";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

let medicationsStore: Medication[] = [...medicationsMock];

export const medicationsService = {
  getMedications: async (): Promise<Medication[]> => {
    await wait(400);

    return medicationsStore;
  },

  getMedicationById: async (
    medicationId: string
  ): Promise<Medication | undefined> => {
    await wait(300);

    return medicationsStore.find((medication) => medication.id === medicationId);
  },

  markDoseTaken: async ({
    medicationId,
    doseId,
  }: {
    medicationId: string;
    doseId: string;
  }): Promise<Medication | undefined> => {
    await wait(350);

    medicationsStore = medicationsStore.map((medication) => {
      if (medication.id !== medicationId) return medication;

      return {
        ...medication,
        dosesToday: medication.dosesToday.map((dose) =>
          dose.id === doseId
            ? {
                ...dose,
                taken: true,
              }
            : dose
        ),
      };
    });

    return medicationsStore.find((medication) => medication.id === medicationId);
  },

  toggleReminder: async (medicationId: string): Promise<Medication | undefined> => {
    await wait(300);

    medicationsStore = medicationsStore.map((medication) => {
      if (medication.id !== medicationId) return medication;

      return {
        ...medication,
        reminderEnabled: !medication.reminderEnabled,
      };
    });

    return medicationsStore.find((medication) => medication.id === medicationId);
  },
};
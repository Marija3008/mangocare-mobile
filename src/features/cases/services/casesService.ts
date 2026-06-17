import {
  CaseMessage,
  CreateCasePayload,
  MedicalCase,
  SendCaseMessagePayload,
} from "@/features/cases/types";
import {
  caseMessagesMock,
  medicalCasesMock,
} from "@/mocks/cases.mock";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

let casesStore: MedicalCase[] = [...medicalCasesMock];
let caseMessagesStore: Record<string, CaseMessage[]> = {
  ...caseMessagesMock,
};

const createId = () => `${Date.now()}-${Math.random().toString(36).slice(2)}`;

export const casesService = {
  getCases: async (): Promise<MedicalCase[]> => {
    await wait(500);

    return [...casesStore].sort(
      (a, b) =>
        new Date(b.lastUpdatedAt).getTime() -
        new Date(a.lastUpdatedAt).getTime()
    );
  },

  getCaseById: async (caseId: string): Promise<MedicalCase | undefined> => {
    await wait(300);

    return casesStore.find((item) => item.id === caseId);
  },

  getCaseMessages: async (caseId: string): Promise<CaseMessage[]> => {
    await wait(400);

    return caseMessagesStore[caseId] ?? [];
  },

  createCase: async (payload: CreateCasePayload): Promise<MedicalCase> => {
    await wait(600);

    const now = new Date().toISOString();
    const caseId = createId();

    const newCase: MedicalCase = {
      id: caseId,
      title: payload.title,
      description: payload.description,
      priority: payload.priority,
      consultationType: payload.consultationType,
      status: "open",
      doctorName: "Pending assignment",
      specialty: "Healthcare team",
      createdAt: now,
      lastUpdatedAt: now,
    };

    const systemMessage: CaseMessage = {
      id: createId(),
      caseId,
      sender: "system",
      senderName: "MangoCare",
      content:
        "Your case has been created. A healthcare professional will review it.",
      createdAt: now,
    };

    const patientMessage: CaseMessage = {
      id: createId(),
      caseId,
      sender: "patient",
      senderName: "Alex Morgan",
      content: payload.description,
      createdAt: now,
    };

    casesStore = [newCase, ...casesStore];
    caseMessagesStore[caseId] = [systemMessage, patientMessage];

    return newCase;
  },

  sendMessage: async (
    payload: SendCaseMessagePayload
  ): Promise<CaseMessage> => {
    await wait(400);

    const now = new Date().toISOString();

    const message: CaseMessage = {
      id: createId(),
      caseId: payload.caseId,
      sender: "patient",
      senderName: "Alex Morgan",
      content: payload.content,
      createdAt: now,
    };

    caseMessagesStore[payload.caseId] = [
      ...(caseMessagesStore[payload.caseId] ?? []),
      message,
    ];

    casesStore = casesStore.map((item) =>
      item.id === payload.caseId
        ? {
            ...item,
            lastUpdatedAt: now,
            status: "waiting_doctor",
          }
        : item
    );

    return message;
  },
};
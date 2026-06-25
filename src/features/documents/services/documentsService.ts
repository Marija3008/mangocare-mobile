import * as DocumentPicker from "expo-document-picker";
import { Platform } from "react-native";

import {
  BackendMedicalDocument,
  MedicalDocument,
  MedicalDocumentStatus,
  MedicalDocumentType,
} from "@/features/documents/types";
import { API_BASE_URL } from "@/services/api/config";
import { ApiError, apiFetch } from "@/services/api/httpClient";

type UploadDocumentPayload = {
  title: string;
  type: MedicalDocumentType;
  file: DocumentPicker.DocumentPickerAsset;
};

const allowedTypes: MedicalDocumentType[] = [
  "lab_report",
  "clinical_note",
  "prescription",
  "imaging",
  "insurance",
  "discharge_summary",
  "other",
];

const allowedStatuses: MedicalDocumentStatus[] = [
  "reviewed",
  "pending_review",
  "archived",
];

function normalizeDocumentType(type: string): MedicalDocumentType {
  if (allowedTypes.includes(type as MedicalDocumentType)) {
    return type as MedicalDocumentType;
  }

  return "other";
}

function normalizeDocumentStatus(status: string): MedicalDocumentStatus {
  if (allowedStatuses.includes(status as MedicalDocumentStatus)) {
    return status as MedicalDocumentStatus;
  }

  return "pending_review";
}

function formatFileSize(sizeBytes: number) {
  if (sizeBytes < 1024) {
    return `${sizeBytes} B`;
  }

  if (sizeBytes < 1024 * 1024) {
    return `${Math.round(sizeBytes / 1024)} KB`;
  }

  return `${(sizeBytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getTagsFromType(type: MedicalDocumentType) {
  if (type === "lab_report") return ["Lab Report"];
  if (type === "clinical_note") return ["Clinical Note"];
  if (type === "prescription") return ["Prescription"];
  if (type === "imaging") return ["Imaging"];
  if (type === "insurance") return ["Insurance"];
  if (type === "discharge_summary") return ["Discharge Summary"];

  return ["Document"];
}

function getLinkedRecordLabel(type: MedicalDocumentType) {
  if (type === "lab_report") return "Linked to lab reports";
  if (type === "prescription") return "Linked to medications";
  if (type === "clinical_note") return "Linked to clinicals";
  if (type === "insurance") return "Linked to profile";

  return undefined;
}

function mapBackendDocument(document: BackendMedicalDocument): MedicalDocument {
  const type = normalizeDocumentType(document.type);
  const status = normalizeDocumentStatus(document.status);

  return {
    id: String(document.id),
    title: document.title,
    fileName: document.originalFileName,
    type,
    status,
    uploadedAt: document.uploadedAt,
    uploadedBy: "Patient",
    sizeLabel: formatFileSize(document.sizeBytes),
    summary: document.summary,
    tags: getTagsFromType(type),
    linkedRecordLabel: getLinkedRecordLabel(type),
    contentType: document.contentType,

    // We will update authenticated file preview next.
    fileUrl: `${API_BASE_URL}/documents/${document.id}/file`,

    isDeleted: document.isDeleted,
    deletedAt: document.deletedAt,
  };
}

export const documentsService = {
  getDocuments: async (): Promise<MedicalDocument[]> => {
    const data = await apiFetch<BackendMedicalDocument[]>("/documents");

    return data.map(mapBackendDocument);
  },

  getDocumentById: async (
    documentId: string,
  ): Promise<MedicalDocument | undefined> => {
    try {
      const data = await apiFetch<BackendMedicalDocument>(
        `/documents/${documentId}`,
      );

      return mapBackendDocument(data);
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) {
        return undefined;
      }

      throw error;
    }
  },

  uploadDocument: async ({
    title,
    type,
    file,
  }: UploadDocumentPayload): Promise<MedicalDocument> => {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("type", type);

    if (Platform.OS === "web") {
      const fileResponse = await fetch(file.uri);
      const blob = await fileResponse.blob();

      formData.append("file", blob, file.name);
    } else {
      formData.append("file", {
        uri: file.uri,
        name: file.name,
        type: file.mimeType ?? "application/octet-stream",
      } as any);
    }

    const data = await apiFetch<BackendMedicalDocument>("/documents/upload", {
      method: "POST",
      body: formData,
    });

    return mapBackendDocument(data);
  },

  moveToTrash: async (documentId: string): Promise<void> => {
    await apiFetch<void>(`/documents/${documentId}`, {
      method: "DELETE",
    });
  },

  getTrashDocuments: async (): Promise<MedicalDocument[]> => {
    const data = await apiFetch<BackendMedicalDocument[]>("/documents/trash");

    return data.map(mapBackendDocument);
  },

  restoreDocument: async (documentId: string): Promise<MedicalDocument> => {
    const data = await apiFetch<BackendMedicalDocument>(
      `/documents/${documentId}/restore`,
      {
        method: "POST",
      },
    );

    return mapBackendDocument(data);
  },

  permanentlyDeleteDocument: async (documentId: string): Promise<void> => {
    await apiFetch<void>(`/documents/${documentId}/permanent`, {
      method: "DELETE",
    });
  },
};

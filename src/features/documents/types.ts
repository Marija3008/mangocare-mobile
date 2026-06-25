export type MedicalDocumentType =
  | "lab_report"
  | "clinical_note"
  | "prescription"
  | "imaging"
  | "insurance"
  | "discharge_summary"
  | "other";

export type MedicalDocumentStatus = "reviewed" | "pending_review" | "archived";

export interface MedicalDocument {
  id: string;
  title: string;
  fileName: string;
  type: MedicalDocumentType;
  status: MedicalDocumentStatus;
  uploadedAt: string;
  uploadedBy: string;
  sizeLabel: string;
  summary: string;
  tags: string[];
  linkedRecordLabel?: string;
  contentType: string;
  fileUrl: string;

  isDeleted?: boolean;
  deletedAt?: string | null;
}

export interface BackendMedicalDocument {
  id: number;
  title: string;
  originalFileName: string;
  storedFileName: string;
  contentType: string;
  sizeBytes: number;
  type: string;
  status: string;
  summary: string;
  uploadedAt: string;
  
  isDeleted: boolean;
  deletedAt: string | null;
}

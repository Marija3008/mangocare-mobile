export type QuestionnaireCategory =
  | "mental_health"
  | "sleep"
  | "lifestyle"
  | "general_health";

export type QuestionnaireSeverity = "low" | "mild" | "moderate" | "high";

export interface QuestionnaireOption {
  id: string;
  label: string;
  score: number;
}

export interface QuestionnaireQuestion {
  id: string;
  text: string;
  helperText?: string;
  options: QuestionnaireOption[];
}

export interface Questionnaire {
  id: string;
  title: string;
  description: string;
  category: QuestionnaireCategory;
  estimatedMinutes: number;
  isAssigned: boolean;
  lastCompletedAt?: string;
  questions: QuestionnaireQuestion[];
}

export interface SubmitQuestionnairePayload {
  questionnaireId: string;
  answers: Record<string, string>;
}

export interface QuestionnaireAnswerResult {
  questionId: string;
  questionText: string;
  selectedOptionLabel: string;
  score: number;
}

export interface QuestionnaireResult {
  id: string;
  questionnaireId: string;
  questionnaireTitle: string;
  totalScore: number;
  maxScore: number;
  severity: QuestionnaireSeverity;
  summary: string;
  recommendation: string;
  createdAt: string;
  answers: QuestionnaireAnswerResult[];
}
import {
  Questionnaire,
  QuestionnaireResult,
  QuestionnaireSeverity,
  SubmitQuestionnairePayload,
} from "@/features/questionnaires/types";
import { questionnairesMock } from "@/mocks/questionnaires.mock";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

let questionnairesStore: Questionnaire[] = [...questionnairesMock];
let questionnaireResultsStore: QuestionnaireResult[] = [];

const createId = () => `${Date.now()}-${Math.random().toString(36).slice(2)}`;

function getSeverity(totalScore: number): QuestionnaireSeverity {
  if (totalScore <= 4) return "low";
  if (totalScore <= 9) return "mild";
  if (totalScore <= 14) return "moderate";
  return "high";
}

function getResultText(severity: QuestionnaireSeverity) {
  if (severity === "low") {
    return {
      summary: "Your result suggests a low level of current concern.",
      recommendation:
        "Continue healthy routines and keep tracking changes over time.",
    };
  }

  if (severity === "mild") {
    return {
      summary: "Your result suggests mild symptoms or changes.",
      recommendation:
        "Monitor your symptoms, focus on sleep and daily habits, and consider discussing this with your healthcare provider if it continues.",
    };
  }

  if (severity === "moderate") {
    return {
      summary: "Your result suggests moderate symptoms that may need attention.",
      recommendation:
        "It may be helpful to discuss this result with a healthcare professional and track your symptoms more closely.",
    };
  }

  return {
    summary: "Your result suggests a higher level of concern.",
    recommendation:
      "Please consider contacting a healthcare professional. If you feel unsafe or have urgent symptoms, seek immediate help.",
  };
}

export const questionnairesService = {
  getQuestionnaires: async (): Promise<Questionnaire[]> => {
    await wait(400);

    return questionnairesStore;
  },

  getQuestionnaireById: async (
    questionnaireId: string
  ): Promise<Questionnaire | undefined> => {
    await wait(300);

    return questionnairesStore.find((item) => item.id === questionnaireId);
  },

  submitQuestionnaire: async (
    payload: SubmitQuestionnairePayload
  ): Promise<QuestionnaireResult> => {
    await wait(600);

    const questionnaire = questionnairesStore.find(
      (item) => item.id === payload.questionnaireId
    );

    if (!questionnaire) {
      throw new Error("Questionnaire not found");
    }

    const answerResults = questionnaire.questions.map((question) => {
      const selectedOptionId = payload.answers[question.id];

      const selectedOption = question.options.find(
        (option) => option.id === selectedOptionId
      );

      return {
        questionId: question.id,
        questionText: question.text,
        selectedOptionLabel: selectedOption?.label ?? "Not answered",
        score: selectedOption?.score ?? 0,
      };
    });

    const totalScore = answerResults.reduce(
      (sum, answer) => sum + answer.score,
      0
    );

    const maxScore = questionnaire.questions.reduce((sum, question) => {
      const highestScore = Math.max(
        ...question.options.map((option) => option.score)
      );

      return sum + highestScore;
    }, 0);

    const severity = getSeverity(totalScore);
    const resultText = getResultText(severity);
    const now = new Date().toISOString();

    const result: QuestionnaireResult = {
      id: createId(),
      questionnaireId: questionnaire.id,
      questionnaireTitle: questionnaire.title,
      totalScore,
      maxScore,
      severity,
      summary: resultText.summary,
      recommendation: resultText.recommendation,
      createdAt: now,
      answers: answerResults,
    };

    questionnaireResultsStore = [result, ...questionnaireResultsStore];

    questionnairesStore = questionnairesStore.map((item) =>
      item.id === questionnaire.id
        ? {
            ...item,
            lastCompletedAt: now,
          }
        : item
    );

    return result;
  },

  getQuestionnaireResultById: async (
    resultId: string
  ): Promise<QuestionnaireResult | undefined> => {
    await wait(300);

    return questionnaireResultsStore.find((result) => result.id === resultId);
  },
};
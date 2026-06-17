import { Questionnaire } from "@/features/questionnaires/types";

const frequencyOptions = [
  {
    id: "not_at_all",
    label: "Not at all",
    score: 0,
  },
  {
    id: "several_days",
    label: "Several days",
    score: 1,
  },
  {
    id: "more_than_half",
    label: "More than half the days",
    score: 2,
  },
  {
    id: "nearly_every_day",
    label: "Nearly every day",
    score: 3,
  },
];

export const questionnairesMock: Questionnaire[] = [
  {
    id: "phq-9",
    title: "Mood Screening",
    description:
      "A short mental wellness questionnaire to understand mood, interest, sleep, and energy patterns.",
    category: "mental_health",
    estimatedMinutes: 4,
    isAssigned: true,
    questions: [
      {
        id: "q1",
        text: "Little interest or pleasure in doing things",
        helperText: "Think about the last 2 weeks.",
        options: frequencyOptions,
      },
      {
        id: "q2",
        text: "Feeling down, depressed, or hopeless",
        helperText: "Think about the last 2 weeks.",
        options: frequencyOptions,
      },
      {
        id: "q3",
        text: "Trouble falling or staying asleep, or sleeping too much",
        helperText: "Think about your recent sleep pattern.",
        options: frequencyOptions,
      },
      {
        id: "q4",
        text: "Feeling tired or having little energy",
        helperText: "This may also relate to sleep, stress, or lab results.",
        options: frequencyOptions,
      },
      {
        id: "q5",
        text: "Poor appetite or overeating",
        helperText: "Think about changes in your usual eating pattern.",
        options: frequencyOptions,
      },
    ],
  },
  {
    id: "sleep-check",
    title: "Sleep Quality Check",
    description:
      "A quick check-in about sleep quality, restfulness, and tiredness during the day.",
    category: "sleep",
    estimatedMinutes: 3,
    isAssigned: false,
    lastCompletedAt: "2026-06-12T20:10:00.000Z",
    questions: [
      {
        id: "sleep-q1",
        text: "How often did you have trouble falling asleep?",
        options: frequencyOptions,
      },
      {
        id: "sleep-q2",
        text: "How often did you wake up during the night?",
        options: frequencyOptions,
      },
      {
        id: "sleep-q3",
        text: "How often did you feel tired during the day?",
        options: frequencyOptions,
      },
      {
        id: "sleep-q4",
        text: "How often did sleep affect your mood or focus?",
        options: frequencyOptions,
      },
    ],
  },
  {
    id: "lifestyle-check",
    title: "Lifestyle Check-in",
    description:
      "A simple questionnaire about hydration, movement, stress, and daily habits.",
    category: "lifestyle",
    estimatedMinutes: 3,
    isAssigned: false,
    questions: [
      {
        id: "life-q1",
        text: "How often did you drink enough water?",
        options: [
          { id: "often", label: "Often", score: 0 },
          { id: "sometimes", label: "Sometimes", score: 1 },
          { id: "rarely", label: "Rarely", score: 2 },
          { id: "almost_never", label: "Almost never", score: 3 },
        ],
      },
      {
        id: "life-q2",
        text: "How often did you move or exercise?",
        options: [
          { id: "often", label: "Often", score: 0 },
          { id: "sometimes", label: "Sometimes", score: 1 },
          { id: "rarely", label: "Rarely", score: 2 },
          { id: "almost_never", label: "Almost never", score: 3 },
        ],
      },
      {
        id: "life-q3",
        text: "How often did you feel stressed?",
        options: frequencyOptions,
      },
    ],
  },
];
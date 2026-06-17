import { LabReport } from "@/features/labs/types";

export const labReportsMock: LabReport[] = [
  {
    id: "lab-1",
    title: "Blood Analysis",
    labName: "MangoCare Diagnostics",
    collectedAt: "2026-06-14",
    reviewedBy: "Dr. Emma Wilson",
    wellnessScore: 82,
    summary:
      "Most blood markers are within a healthy range. Vitamin D is slightly low and iron needs attention.",
    markers: [
      {
        id: "marker-1",
        name: "Vitamin D",
        value: "22",
        unit: "ng/mL",
        referenceRange: "30 - 100",
        status: "low",
        trend: "down",
        description:
          "Vitamin D is below the recommended range. Low levels may contribute to tiredness or low energy.",
      },
      {
        id: "marker-2",
        name: "Iron",
        value: "48",
        unit: "µg/dL",
        referenceRange: "60 - 170",
        status: "attention",
        trend: "down",
        description:
          "Iron is slightly below the preferred range. This can sometimes be related to fatigue.",
      },
      {
        id: "marker-3",
        name: "Glucose",
        value: "91",
        unit: "mg/dL",
        referenceRange: "70 - 99",
        status: "optimal",
        trend: "stable",
        description:
          "Glucose level is within the normal fasting range.",
      },
      {
        id: "marker-4",
        name: "Hemoglobin",
        value: "13.8",
        unit: "g/dL",
        referenceRange: "12.0 - 16.0",
        status: "optimal",
        trend: "stable",
        description:
          "Hemoglobin is within the expected range.",
      },
    ],
  },
  {
    id: "lab-2",
    title: "General Health Panel",
    labName: "City Medical Lab",
    collectedAt: "2026-05-20",
    reviewedBy: "Dr. Michael Stone",
    wellnessScore: 88,
    summary:
      "Overall results look stable. Hydration and cholesterol balance should continue to be monitored.",
    markers: [
      {
        id: "marker-5",
        name: "Total Cholesterol",
        value: "185",
        unit: "mg/dL",
        referenceRange: "< 200",
        status: "optimal",
        trend: "stable",
        description:
          "Total cholesterol is within the recommended range.",
      },
      {
        id: "marker-6",
        name: "HDL",
        value: "54",
        unit: "mg/dL",
        referenceRange: "> 40",
        status: "optimal",
        trend: "up",
        description:
          "HDL is considered protective cholesterol and is in a healthy range.",
      },
      {
        id: "marker-7",
        name: "Sodium",
        value: "140",
        unit: "mmol/L",
        referenceRange: "135 - 145",
        status: "optimal",
        trend: "stable",
        description:
          "Sodium level is within the normal range.",
      },
    ],
  },
];
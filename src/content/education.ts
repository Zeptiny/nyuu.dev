import type { Dictionary } from "@/i18n/dictionaries";

export type EducationId = keyof Dictionary["education"]["items"];
export type EducationKind = "formal" | "course" | "certificate";
export type EducationCategory = Exclude<
  keyof Dictionary["education"]["categories"],
  "label" | "all"
>;

export type Education = {
  id: EducationId;
  kind: EducationKind;
  category: EducationCategory;
  /** The year it started. */
  year: number;
  status: "ongoing" | "completed";
  duration?: { value: number; unit: "hours" | "years" };
  /** A PDF under public/education/certificates, offered for download. Only certifications have one. */
  certificate?: string;
};

/** A degree, the courses, and the certifications. The titles and descriptions are in the locales. */
export const EDUCATION: readonly Education[] = [
  {
    id: "cs",
    kind: "formal",
    category: "university",
    year: 2024,
    status: "ongoing",
    duration: { value: 4, unit: "years" },
  },
  {
    id: "cka",
    kind: "course",
    category: "devops",
    year: 2025,
    status: "ongoing",
    duration: { value: 26.5, unit: "hours" },
  },
  {
    id: "ltc",
    kind: "course",
    category: "devops",
    year: 2025,
    status: "completed",
    duration: { value: 41.5, unit: "hours" },
  },
  {
    id: "msa",
    kind: "course",
    category: "architecture",
    year: 2025,
    status: "completed",
    duration: { value: 5.5, unit: "hours" },
  },
  {
    id: "zabbix",
    kind: "course",
    category: "monitoring",
    year: 2025,
    status: "completed",
    duration: { value: 7.5, unit: "hours" },
  },
  {
    id: "kubernetes",
    kind: "course",
    category: "devops",
    year: 2025,
    status: "completed",
    duration: { value: 6.5, unit: "hours" },
  },
  {
    id: "backend",
    kind: "course",
    category: "architecture",
    year: 2025,
    status: "completed",
    duration: { value: 19, unit: "hours" },
  },
  {
    id: "ansible",
    kind: "course",
    category: "automation",
    year: 2025,
    status: "completed",
    duration: { value: 4, unit: "hours" },
  },
  {
    id: "architecture",
    kind: "course",
    category: "architecture",
    year: 2025,
    status: "completed",
    duration: { value: 8, unit: "hours" },
  },
  {
    id: "cloud",
    kind: "course",
    category: "architecture",
    year: 2025,
    status: "completed",
    duration: { value: 5, unit: "hours" },
  },
  {
    id: "aws",
    kind: "certificate",
    category: "architecture",
    year: 2025,
    status: "completed",
    certificate: "/education/certificates/AWS_Cloud_Practitioner.pdf",
  },
];

export const EDUCATION_KINDS: readonly EducationKind[] = ["formal", "course", "certificate"];

/** Ongoing first, the oldest of those first; then completed, the newest first. */
export function byProgress(a: Education, b: Education): number {
  if (a.status !== b.status) return a.status === "ongoing" ? -1 : 1;
  return a.status === "ongoing" ? a.year - b.year : b.year - a.year;
}

/** The figures the page leads with, counted from the list so they never drift from it. */
export function educationSummary(entries: readonly Education[] = EDUCATION) {
  const courses = entries.filter((entry) => entry.kind === "course");
  const completed = courses.filter((entry) => entry.status === "completed");
  return {
    completedCourses: completed.length,
    ongoingCourses: courses.length - completed.length,
    completedHours: completed.reduce(
      (total, entry) => total + (entry.duration?.unit === "hours" ? entry.duration.value : 0),
      0,
    ),
    degree: entries.find((entry) => entry.kind === "formal" && entry.status === "ongoing"),
    learning: courses.find((entry) => entry.status === "ongoing"),
    certifications: entries.filter((entry) => entry.kind === "certificate"),
  };
}

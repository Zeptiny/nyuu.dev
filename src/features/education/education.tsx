import { byProgress, EDUCATION, type Education, educationSummary } from "@/content/education";
import { type Dictionary, fill, formatNumber, plural } from "@/i18n/dictionaries";
import type { Language } from "@/i18n/languages";
import { PageSection } from "@/shared/components/page";
import { StatStrip } from "@/shared/components/stat";
import { EducationExplorer, type EducationRow } from "@/features/education/education-explorer";

function duration(language: Language, t: Dictionary, entry: Education): string | null {
  if (!entry.duration) return null;
  const { value, unit } = entry.duration;
  const n = formatNumber(language, value);
  const template =
    unit === "hours"
      ? t.education.duration.hours
      : plural(language, value, t.education.duration.years);
  return fill(template, { n });
}

/** What was learned and where: the totals first, then every entry, by kind and category. */
export function EducationSection({ language, t }: { language: Language; t: Dictionary }) {
  const summary = educationSummary();
  const rows: EducationRow[] = EDUCATION.toSorted(byProgress).map((entry) => {
    const text = t.education.items[entry.id];
    return {
      id: entry.id,
      kind: entry.kind,
      category: entry.category,
      categoryLabel: t.education.categories[entry.category],
      title: text.title,
      description: text.description,
      duration: duration(language, t, entry),
      year: entry.year,
      // A certificate is its own proof; only degrees and courses say how far along they are.
      status: entry.kind === "certificate" ? null : entry.status,
      certificate: entry.certificate
        ? { href: entry.certificate, label: fill(t.education.downloadLabel, { title: text.title }) }
        : null,
    };
  });
  return (
    <PageSection id="education" title={t.education.title} note={t.education.note}>
      <StatStrip
        items={[
          {
            label: t.education.stats.completed,
            value: formatNumber(language, summary.completedCourses),
            sub:
              summary.ongoingCourses > 0
                ? fill(t.education.stats.ongoing, { n: summary.ongoingCourses })
                : undefined,
          },
          {
            label: t.education.stats.hours,
            value: fill(t.education.duration.hours, {
              n: formatNumber(language, summary.completedHours),
            }),
            sub: t.education.stats.hoursNote,
          },
          {
            label: t.education.stats.certifications,
            value: formatNumber(language, summary.certifications.length),
            sub: summary.certifications
              .map((entry) => t.education.items[entry.id].title)
              .join(", "),
          },
        ]}
      />
      <EducationExplorer
        rows={rows}
        labels={{
          kinds: t.education.kinds,
          categories: { label: t.education.categories.label, all: t.education.categories.all },
          columns: t.education.columns,
          status: t.education.status,
          download: t.education.download,
          empty: t.education.empty,
        }}
      />
    </PageSection>
  );
}

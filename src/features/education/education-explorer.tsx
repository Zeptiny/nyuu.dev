"use client";

import { Download } from "lucide-react";
import { useState } from "react";
import { EDUCATION_KINDS, type EducationCategory, type EducationKind } from "@/content/education";
import { Chip } from "@/shared/components/chip";
import { Segmented } from "@/shared/components/segmented";
import { Badge } from "@/shared/ui/badge";

export type EducationRow = {
  id: string;
  kind: EducationKind;
  category: EducationCategory;
  categoryLabel: string;
  title: string;
  description: string;
  duration: string | null;
  year: number;
  status: "ongoing" | "completed" | null;
  certificate: { href: string; label: string } | null;
};

type Labels = {
  kinds: Record<EducationKind | "label", string>;
  categories: { label: string; all: string };
  columns: Record<"title" | "category" | "duration" | "year" | "status" | "certificate", string>;
  status: Record<"ongoing" | "completed", string>;
  download: string;
  empty: string;
};

/** The table's columns from md up; below that each row folds into two lines. */
const COLUMNS = "md:grid-cols-[minmax(0,1fr)_170px_72px_44px_120px_96px]";

/** Every entry of one kind, narrowed to a category when the kind spans more than one. */
export function EducationExplorer({ rows, labels }: { rows: EducationRow[]; labels: Labels }) {
  const [kind, setKind] = useState<EducationKind>("course");
  const [category, setCategory] = useState<EducationCategory | null>(null);

  const ofKind = rows.filter((row) => row.kind === kind);
  const categories = [...new Set(ofKind.map((row) => row.category))];
  const shown = ofKind.filter((row) => category === null || row.category === category);
  const count = (of: EducationKind) => rows.filter((row) => row.kind === of).length;

  return (
    <div className="flex min-w-0 flex-col gap-4">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <Segmented
          label={labels.kinds.label}
          value={kind}
          onChange={(next) => {
            setKind(next);
            setCategory(null);
          }}
          options={EDUCATION_KINDS.map((value) => ({
            value,
            label: (
              <>
                {labels.kinds[value]}{" "}
                <span className="font-mono text-11 opacity-70">{count(value)}</span>
              </>
            ),
          }))}
        />
        {categories.length > 1 && (
          <div role="group" aria-label={labels.categories.label} className="flex flex-wrap gap-1.5">
            <Chip
              active={category === null}
              count={ofKind.length}
              onClick={() => setCategory(null)}
            >
              {labels.categories.all}
            </Chip>
            {categories.map((value) => (
              <Chip
                key={value}
                active={category === value}
                count={ofKind.filter((row) => row.category === value).length}
                onClick={() => setCategory(value)}
              >
                {ofKind.find((row) => row.category === value)?.categoryLabel}
              </Chip>
            ))}
          </div>
        )}
      </div>

      <div>
        <div
          aria-hidden
          className={`grid gap-x-4 border-b border-rule py-1.5 font-mono text-11 tracking-head text-faint uppercase max-md:hidden ${COLUMNS}`}
        >
          <span>{labels.columns.title}</span>
          <span>{labels.columns.category}</span>
          <span className="text-right">{labels.columns.duration}</span>
          <span>{labels.columns.year}</span>
          <span>{labels.columns.status}</span>
          <span className="text-right">{labels.columns.certificate}</span>
        </div>
        {shown.length === 0 ? (
          <p className="m-0 border-b border-rule py-7 text-13 text-muted">{labels.empty}</p>
        ) : (
          <ul className="m-0 list-none p-0">
            {shown.map((row) => (
              <li
                key={row.id}
                className={`grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-1.5 border-b border-rule py-3 md:items-baseline ${COLUMNS}`}
              >
                <div className="min-w-0">
                  <p className="m-0 text-14 text-pretty">{row.title}</p>
                  <p className="m-0 mt-0.5 text-12 leading-[1.45] text-pretty text-muted">
                    {row.description}
                  </p>
                </div>
                <span className="text-13 text-muted max-md:hidden">{row.categoryLabel}</span>
                <span className="text-right font-mono text-13 max-md:hidden">
                  {row.duration ?? <span className="text-faint">—</span>}
                </span>
                <span className="font-mono text-13 max-md:hidden">{row.year}</span>
                <span className="text-13 whitespace-nowrap">
                  {row.status && (
                    <Badge tone={row.status === "ongoing" ? "accent" : "success"}>
                      {labels.status[row.status]}
                    </Badge>
                  )}
                </span>
                <span className="text-right max-md:hidden">
                  {row.certificate && (
                    <CertificateLink {...row.certificate} text={labels.download} />
                  )}
                </span>
                {/* Below md: category, duration and year on one mono line, the download beside it. */}
                <div className="col-span-2 flex flex-wrap items-baseline justify-between gap-x-4 font-mono text-12 text-muted md:hidden">
                  <span>
                    {[row.categoryLabel, row.duration, row.year].filter(Boolean).join(" · ")}
                  </span>
                  {row.certificate && (
                    <CertificateLink {...row.certificate} text={labels.download} />
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function CertificateLink({ href, label, text }: { href: string; label: string; text: string }) {
  return (
    <a
      href={href}
      download
      aria-label={label}
      className="inline-flex items-center gap-1 font-mono text-12 text-acc-ink"
    >
      <Download aria-hidden className="size-3.5" />
      {text}
    </a>
  );
}

import { MARKS } from "@/content/marks";
import { STACK } from "@/content/stack";
import type { Dictionary } from "@/i18n/dictionaries";
import { PageSection, Tag } from "@/shared/components/page";
import { Logo } from "@/shared/ui/logo";

/** Each category on a hairline, its tools beside it; on a phone the tools go under the name. */
export function Stack({ t }: { t: Dictionary }) {
  return (
    <PageSection id="stack" title={t.stack.title} note={t.stack.note}>
      <dl className="m-0 grid grid-cols-1 md:grid-cols-[240px_minmax(0,1fr)]">
        {STACK.map(({ category, items }) => (
          <div key={category} className="contents">
            <dt className="flex items-baseline gap-2 border-t border-rule pt-3 text-13 md:pb-3">
              {t.stack.categories[category]}
              <span className="font-mono text-11 text-faint">{items.length}</span>
            </dt>
            <dd className="m-0 flex flex-wrap gap-1.5 pt-2.5 pb-3.5 md:border-t md:border-rule md:pt-3 md:pb-3">
              {items.map((item) => (
                <Tag key={item.name}>
                  {item.mark && <Logo paths={MARKS[item.mark]} className="size-3.5" />}
                  {item.name}
                </Tag>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </PageSection>
  );
}

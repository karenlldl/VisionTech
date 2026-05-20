import type { ElementType, ReactNode } from "react";

type AboutStorySectionProps = {
  number: string;
  icon: ElementType;
  title: string;
  paragraphs: ReactNode[];
};

const AboutStorySection = ({
  number,
  icon: Icon,
  title,
  paragraphs,
}: AboutStorySectionProps) => {
  return (
    <article className="grid gap-8 border-t border-border/70 py-14 md:grid-cols-[0.8fr_1.2fr] md:gap-14 lg:py-20">
      <div>
        <span className="font-mono text-xs text-brand-orange">{number}</span>

        <h3 className="mt-6 max-w-sm text-4xl font-semibold leading-[0.95] tracking-tight text-brand-dark sm:text-5xl">
          {title}
        </h3>
      </div>

      <div>
        <Icon className="mb-8 h-6 w-6 text-muted-foreground" />

        <div className="space-y-7 text-xl leading-relaxed text-muted-foreground sm:text-2xl lg:text-[1.7rem]">
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </article>
  );
};

export default AboutStorySection;
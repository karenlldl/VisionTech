import type { ElementType } from "react";

type AboutValueCardProps = {
  icon: ElementType;
  title: string;
  description: string;
};

const AboutValueCard = ({
  icon: Icon,
  title,
  description,
}: AboutValueCardProps) => {
  return (
    <article className="rounded-[28px] border border-border bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-float sm:rounded-[32px] sm:p-8">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-orange/10 text-brand-orange">
        <Icon className="h-5 w-5" />
      </div>

      <h3 className="mt-8 text-xl font-semibold tracking-tight text-brand-dark sm:text-2xl">
        {title}
      </h3>

      <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
        {description}
      </p>
    </article>
  );
};

export default AboutValueCard;
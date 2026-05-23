import type { ElementType } from "react";

type PlatformModuleCardProps = {
  number: string;
  icon: ElementType;
  title: string;
  description: string;
  bullets: string[];
  image: string;
  imageAlt: string;
  reverse?: boolean;
};

const PlatformModuleCard = ({
  number,
  icon: Icon,
  title,
  description,
  bullets,
  image,
  imageAlt,
  reverse = false,
}: PlatformModuleCardProps) => {
  return (
    <article className="overflow-hidden rounded-[32px] border border-border bg-white p-6 shadow-soft sm:rounded-[40px] sm:p-8 lg:p-12">
      <div
        className={`grid gap-10 lg:grid-cols-2 lg:items-center ${
          reverse ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div>
          <span className="font-mono text-xs font-medium text-brand-orange">
            {number}
          </span>

          <Icon className="mt-8 h-8 w-8 text-brand-graphite" />

          <h3 className="mt-8 max-w-xl text-4xl font-semibold leading-[0.95] tracking-tight text-brand-dark sm:text-5xl">
            {title}
          </h3>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {description}
          </p>

          <ul className="mt-8 space-y-3">
            {bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground sm:text-base"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange" />
                {bullet}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="absolute inset-0 rounded-[32px] bg-brand-orange/10 blur-3xl" />

          <div className="relative overflow-hidden rounded-[28px] border border-border bg-brand-mist shadow-float">
            <img
              src={image}
              alt={imageAlt}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </article>
  );
};

export default PlatformModuleCard;
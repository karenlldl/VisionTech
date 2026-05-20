import { ArrowRight } from "lucide-react";
import type { ElementType } from "react";
import { Link } from "react-router-dom";

type FeatureCardProps = {
  icon: ElementType;
  number: string;
  title: string;
  description: string;
};

const FeatureCard = ({
  icon: Icon,
  number,
  title,
  description,
}: FeatureCardProps) => {
  return (
    <article className="group relative h-full overflow-hidden rounded-3xl border border-border bg-card p-7 transition-all duration-500 hover:-translate-y-1 hover:bg-foreground/2 hover:shadow-soft">
      <div className="absolute right-5 top-5 font-mono text-[10px] text-muted-foreground/60">
        {number}
      </div>

      <Icon className="h-6 w-6 text-foreground/70" strokeWidth={1.5} />

      <h3 className="mt-10 text-xl font-medium tracking-tight">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>

      <Link to="/plataforma-site" className="mt-6 inline-flex items-center gap-1 text-xs text-foreground/60 transition group-hover:text-brand-orange">
        Saber mais
        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
      </Link>
    </article>
  );
};

export default FeatureCard;
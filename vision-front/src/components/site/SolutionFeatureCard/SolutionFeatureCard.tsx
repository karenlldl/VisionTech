type SolutionFeatureCardProps = {
  icon: any;
  number: string;
  title: string;
  description: string;
};

const SolutionFeatureCard = ({
  icon: Icon,
  number,
  title,
  description,
}: SolutionFeatureCardProps) => {
  return (
    <article className="rounded-[36px] border border-border bg-white p-8 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-float">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] text-muted-foreground">
          {number}
        </span>
      </div>

      <div className="mt-12">
        <Icon className="h-8 w-8 text-brand-dark" />

        <h3 className="mt-10 text-3xl font-semibold tracking-tight text-brand-dark">
          {title}
        </h3>

        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </article>
  );
};

export default SolutionFeatureCard;
import { workflowSteps } from "../../../data/site/solutionWorkflow";

const SolutionWorkflow = () => {
  return (
    <div className="relative mt-20">
      <div className="absolute left-[8%] right-[8%] top-14 hidden h-px bg-linear-to-r from-transparent via-brand-orange to-transparent lg:block" />

      <div className="relative z-10 grid gap-10 md:grid-cols-2 lg:grid-cols-5">
        {workflowSteps.map((item) => {
          const Icon = item.icon;

          return (
            <article key={item.step} className="relative text-center">
              <div className="relative mx-auto flex h-28 w-28 items-center justify-center rounded-[32px] border border-border bg-white shadow-soft transition-all duration-300 hover:scale-105 hover:shadow-float">
                <Icon className="h-8 w-8 text-brand-dark" />

                <div className="absolute -right-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full bg-brand-orange text-sm font-semibold text-white shadow-glow">
                  {item.step}
                </div>
              </div>

              <h3 className="mt-8 text-2xl font-semibold">
                {item.title}
              </h3>

              <p className="mx-auto mt-4 max-w-55 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default SolutionWorkflow;
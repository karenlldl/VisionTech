import PlatformModuleCard from "../PlatformModuleCard/PlatformModuleCard";
import { solutionModules } from "../../../data/site/solutionModules";
import { Reveal, Stagger, StaggerItem } from "../ui/motion";


const PlatformModulesSection = () => {
  return (
    <section className="bg-brand-mist px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="mb-6 inline-flex rounded-full bg-black/5 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground sm:text-xs">
            Plataforma
          </p>

          <h2 className="display max-w-6xl text-5xl leading-[0.9] sm:text-6xl md:text-7xl">
            Módulos pensados para cada{" "}
            <span className="font-display text-brand-orange">papel</span>.
          </h2>

          <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl">
            Uma experiência consistente para administradores, profissionais de
            saúde, equipe operacional e voluntários.
          </p>
        </Reveal>

        <Stagger className="mt-16 space-y-8" stagger={0.08}>
          {solutionModules.map((module, index) => (
            <StaggerItem key={module.title}>
              <PlatformModuleCard
                number={module.number}
                icon={module.icon}
                title={module.title}
                description={module.description}
                bullets={module.bullets}
                image={module.image}
                imageAlt={module.imageAlt}
                reverse={index % 2 !== 0}
              />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
};

export default PlatformModulesSection;
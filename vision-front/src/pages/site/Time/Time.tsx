
import PageBreadcrumb from "../../../components/site/PageBreadcrumb/PageBreadcrumb";
import TeamCard from "../../../components/site/TeamCard/TeamCard";
import { Reveal, Stagger, StaggerItem } from "../../../components/site/ui/motion";
import { teamMembers } from "../../../data/site/team";

const Time = () => {
  return (
    <section className="min-h-screen bg-brand-mist px-4 pb-24 pt-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <PageBreadcrumb currentPage="Time" />
        <Reveal className="mx-auto max-w-4xl text-center">
          
          <p className="mb-6 inline-flex rounded-full bg-black/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Time Vision
          </p>

          <h1 className="display text-5xl md:text-7xl">
            O time por trás da{" "}
            <span className="font-display text-brand-orange">
              Vision
            </span>
          </h1>

          <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
            Conheça as pessoas que constroem a plataforma com propósito,
            tecnologia e impacto social.
          </p>
        </Reveal>

        <Stagger
          className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3"
          stagger={0.08}
        >
          {teamMembers.map((member) => (
            <StaggerItem key={member.name}>
              <TeamCard {...member} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
};

export default Time;

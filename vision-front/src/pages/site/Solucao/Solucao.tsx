import { Reveal } from "../../../components/site/ui/motion";

import SolutionFeatureCard from "../../../components/site/SolutionFeatureCard/SolutionFeatureCard";
import SolutionWorkflow from "../../../components/site/SolutionWorkflow/SolutionWorkflow";
import SolutionDashboard from "../../../components/site/SolutionDashboard/SolutionDashboard";

import { solutionFeatures } from "../../../data/site/solutionFeatures";
import CtaSolution from "../../../components/site/CtaSolution/CtaSolution";
import PageBreadcrumb from "../../../components/site/PageBreadcrumb/PageBreadcrumb";

const Solucao = () => {
  return (
    <>
      <section className="px-4 pb-24 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <PageBreadcrumb currentPage="Solução" />
          <Reveal>
           <p className="mb-6 inline-flex rounded-full bg-black/5 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground sm:text-xs">
          Solução
          </p>

            <h1 className="display mt-8 max-w-5xl text-5xl leading-[0.9] sm:text-6xl md:text-7xl lg:text-[8rem]">
              Um sistema
              <br />
              operacional para o{" "}
              <span className="font-display text-brand-orange">
                cuidado
              </span>
              .
            </h1>

            <p className="mt-10 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Vision orquestra a jornada do paciente, a equipe e os
              dados em um único lugar.
            </p>
          </Reveal>

          <div className="mt-24 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {solutionFeatures.map((item) => (
              <SolutionFeatureCard
                key={item.title}
                icon={item.icon}
                number={item.number}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2">
            <Reveal>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Workflow
                </p>

                <h2 className="display mt-6 text-5xl leading-[0.95] md:text-7xl">
                  A jornada,
                  <br />
                  ponta a ponta.
                </h2>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
                Cinco etapas conectadas em um fluxo digital contínuo.
              </p>
            </Reveal>
          </div>

          <SolutionWorkflow />
        </div>
      </section>

      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Painel operacional
              </p>

              <h2 className="display mt-6 text-5xl leading-[0.95] md:text-7xl">
                Sua operação,
                <br />
                em{" "}
                <span className="font-display text-brand-orange">
                  uma tela
                </span>
                .
              </h2>

              <p className="mt-10 text-xl leading-relaxed text-muted-foreground">
                Métricas-chave, fluxo de atendimento, agenda e equipe —
                tudo no mesmo lugar.
              </p>

              <ul className="mt-10 space-y-5">
                {[
                  "Indicadores em tempo real",
                  "Fluxos personalizáveis por organização",
                  "Histórico completo do paciente",
                  "Relatórios exportáveis",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-4 text-lg"
                  >
                    <span className="h-2 w-2 rounded-full bg-brand-orange" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <SolutionDashboard />
          </Reveal>
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <CtaSolution />
        </div>
      </section>
    </>
  );
};

export default Solucao;

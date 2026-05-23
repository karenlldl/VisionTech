import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

import PageBreadcrumb from "../../../components/site/PageBreadcrumb/PageBreadcrumb";
import AboutValueCard from "../../../components/site/AboutValueCard/AboutValueCard";
import AboutStorySection from "../../../components/site/AboutStorySection/AboutStorySection";


import { aboutHighlights, aboutStorySections } from "../../../data/site/about";
import { Reveal, Stagger, StaggerItem } from "../../../components/site/ui/motion";

const Sobre = () => {
  return (
    <>
      <section className="bg-brand-mist px-4 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-32 lg:px-8 lg:pb-32">
        <div className="mx-auto max-w-7xl">
          <PageBreadcrumb currentPage="Sobre" />

          <Reveal>
            <p className="mb-6 inline-flex rounded-full bg-black/5 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground sm:text-xs">
              Sobre a Vision
            </p>

            <h1 className="display max-w-7xl text-5xl leading-[0.9] sm:text-6xl md:text-7xl lg:text-[8rem]">
              Tecnologia criada para transformar{" "}
              <span className="font-display text-brand-orange">cuidado</span>{" "}
              em organização.
            </h1>

            <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl">
              A Vision nasceu como uma resposta a um desafio real: como ajudar
              organizações sociais e de saúde a lidarem com grandes volumes de
              pessoas, informações e atendimentos sem perder clareza,
              prioridade e acompanhamento?
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-brand-mist px-4 pb-20 sm:px-6 sm:pb-24 lg:px-8 lg:pb-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="mb-6 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              O que a plataforma entrega
            </p>

            <h2 className="display max-w-5xl text-4xl leading-[0.95] sm:text-5xl md:text-6xl">
              Uma base sólida para quem{" "}
              <span className="font-display text-brand-orange">cuida</span>.
            </h2>
          </Reveal>

          <Stagger className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
            {aboutHighlights.map((item) => (
              <StaggerItem key={item.title}>
                <AboutValueCard
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                />
              </StaggerItem>
            ))}
          </Stagger>

          
        </div>
      </section>

      <section className="bg-brand-mist px-4 pb-24 sm:px-6 lg:px-8 lg:pb-32">
        <div className="mx-auto max-w-7xl">
          {aboutStorySections.map((section) => (
            <Reveal key={section.number}>
              <AboutStorySection
                number={section.number}
                icon={section.icon}
                title={section.title}
                paragraphs={section.paragraphs}
              />
            </Reveal>
          ))}

          <Reveal delay={0.1}>
            <div className="mt-10 rounded-[28px] border border-border bg-white p-6 shadow-soft sm:rounded-[36px] sm:p-8 md:flex md:items-center md:justify-between md:gap-10 lg:p-12">
              <div>
                <h3 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-brand-dark sm:text-4xl">
                  Quer ver a Vision aplicada a uma operação real?
                </h3>

                <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Conheça como a plataforma estrutura triagem, jornada e
                  decisões no caso da Turma do Bem.
                </p>
              </div>

              <Link
                to="/solucao"
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-brand-dark py-2 pl-6 pr-2 text-sm font-medium text-white transition hover:bg-brand-orange md:mt-0"
              >
                Ver a solução
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-orange text-white transition-transform group-hover:rotate-45 group-hover:bg-white/20">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </Reveal>
        </div>

      </section>
    </>
  );
};

export default Sobre;
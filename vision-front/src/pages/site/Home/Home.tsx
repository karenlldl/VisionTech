import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

import {
  Reveal,
  Stagger,
  StaggerItem,
  Parallax,
  ScaleOnScroll,
} from "../../../components/site/ui/motion";
import HeroLoader from "../../../components/site/HeroLoader/HeroLoader";
import OperationalPreview from "../../../components/site/OperationalPreview/OperationalPreview";
import { homeFeatures } from "../../../data/site/homeFeatures";
import FeatureCard from "../../../components/site/FeatureCard/FeatureCard";
import Cta from "../../../components/site/Cta/Cta";

const Home = () => {
  return (
    <>
      <section className="relative overflow-hidden pb-24 pt-28 lg:pt-36">
        <div className="gradient-mesh animate-gradient absolute inset-0 -z-10" />
        <div className="absolute inset-0 -z-10 [background:radial-gradient(ellipse_80%_60%_at_50%_0%,transparent_40%,rgba(250,250,247,1)_90%)]" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-5xl animate-fade-up flex-col items-center text-center">
            <HeroLoader />

            <h1 className="display mt-10 text-[14vw] leading-[0.88] sm:text-7xl lg:text-[8.5rem]">
              Tecnologia
              <br />
              que organiza
              <br />
              <span className="font-display text-brand-orange">cuidado</span>{" "}
              em escala.
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Vision é a plataforma escalável que ajuda organizações,
              institutos, ONGs e clínicas a operar fluxos de saúde com
              inteligência, transparência e impacto real.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link
                to="/solucao"
                className="group inline-flex items-center gap-2 rounded-full bg-brand-dark py-2 pl-6 pr-2 text-sm font-medium text-white transition-all hover:bg-brand-orange"
              >
                Conheça a solução
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 transition-transform group-hover:rotate-45">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </Link>

              <Link
                to="/plataforma-site"
                className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-background/60 px-5 py-3 text-sm font-medium backdrop-blur transition hover:border-foreground/40"
              >
                Detalhes da plataforma
              </Link>
            </div>
          </div>

          <ScaleOnScroll className="relative mt-20 lg:mt-24">
            <OperationalPreview />
          </ScaleOnScroll>

          <div className="mt-20 border-y border-border/60 py-8">
            <p className="mb-6 text-center text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              Pensada para organizações que cuidam de pessoas
            </p>

            <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-5">
              {[
                "ONGs",
                "Institutos",
                "Clínicas",
                "Hospitais sociais",
                "Projetos públicos",
              ].map((organization) => (
                <div
                  key={organization}
                  className="text-sm font-medium text-foreground/70"
                >
                  {organization}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-16 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                Inteligência operacional
              </p>
              <h2 className="display text-5xl md:text-6xl">
                Operação visível.
                <br />
                <span className="font-display text-brand-orange">
                  Decisões claras.
                </span>
              </h2>
            </div>

            <div className="flex items-end lg:col-span-6 lg:col-start-7">
              <p className="text-lg leading-relaxed text-muted-foreground">
                Vision conecta dados, pessoas e processos em uma única
                superfície. Da triagem ao acompanhamento, cada etapa é
                mensurável, rastreável e escalável.
              </p>
            </div>
          </Reveal>

          <Stagger
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
            stagger={0.08}
          >
            {homeFeatures.map((feature, index) => (
              <StaggerItem key={feature.title}>
                <FeatureCard
                  icon={feature.icon}
                  number={`/0${index + 1}`}
                  title={feature.title}
                  description={feature.description}
                />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="relative overflow-hidden bg-brand-dark py-24 text-white lg:py-40">
        <Parallax offset={120} className="absolute inset-0">
          <div className="gradient-mesh absolute inset-0 opacity-30" />
        </Parallax>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="mb-10 text-[11px] uppercase tracking-[0.25em] text-white/40">
              Manifesto
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="display text-5xl text-white md:text-8xl lg:text-[9rem]">
              Saúde é{" "}
              <span className="font-display text-brand-orange">
                organização
              </span>
              .
              <br />
              Impacto é{" "}
              <span className="font-display text-brand-orange">escala</span>.
            </h2>
          </Reveal>

          <Stagger
            className="mt-16 grid max-w-5xl gap-10 md:grid-cols-3"
            stagger={0.12}
          >
            {[
              {
                number: "01",
                title: "Humano no centro",
                description:
                  "Tecnologia desenhada a partir da realidade de quem cuida e de quem é cuidado.",
              },
              {
                number: "02",
                title: "Escala responsável",
                description:
                  "Pronta para crescer sem perder qualidade, contexto ou propósito.",
              },
              {
                number: "03",
                title: "Dados com propósito",
                description:
                  "Indicadores que guiam decisões, não apenas relatórios bonitos.",
              },
            ].map((manifesto) => (
              <StaggerItem key={manifesto.number}>
                <p className="font-mono text-xs text-brand-orange">
                  {manifesto.number}
                </p>
                <h3 className="mt-3 text-xl font-medium text-white">
                  {manifesto.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {manifesto.description}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <Cta />
    </>
  );
};

export default Home;

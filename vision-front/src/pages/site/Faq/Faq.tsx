import FaqAccordion from "../../../components/site/FaqAccordion/FaqAccordion";
import PageBreadcrumb from "../../../components/site/PageBreadcrumb/PageBreadcrumb";
import { Reveal } from "../../../components/site/ui/motion";
import { faqItems } from "../../../data/site/faq";

const FAQ = () => {
  return (
    <section className="min-h-screen bg-brand-mist px-4 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-32 lg:px-8 lg:pb-32">
      <div className="mx-auto max-w-7xl">
        <PageBreadcrumb currentPage="FAQ" />
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="mb-5 inline-flex rounded-full bg-black/5 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground sm:text-xs">
            Perguntas frequentes
          </p>

          <h1 className="display text-4xl leading-[0.95] sm:text-5xl md:text-6xl lg:text-7xl">
            Tudo o que você precisa saber
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            sobre a{" "}
            <span className="font-display text-brand-orange">Vision</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg md:max-w-2xl">
            Reunimos as principais dúvidas sobre a proposta, funcionamento e
            impacto da plataforma.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-10 w-full max-w-4xl sm:mt-12 lg:mt-14">
            <FaqAccordion items={faqItems} />
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default FAQ;
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const CtaSolution = () => {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[36px] bg-brand-dark px-8 py-16 text-white shadow-float sm:rounded-[44px] sm:px-14 sm:py-20 lg:px-20 lg:py-24">
          <div className="gradient-mesh pointer-events-none absolute inset-0 opacity-20" />

          <div className="relative z-10 max-w-4xl">
            <h2 className="display text-4xl leading-[0.95] text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Pronto para ver de perto?
            </h2>

            <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/55 sm:text-lg">
              Conheça a plataforma e descubra como o Vision pode se adaptar à
              sua organização.
            </p>

            <Link
  to="/plataforma"
  className="group mt-10 inline-flex items-center gap-3 rounded-full bg-white py-2 pl-6 pr-2 text-sm font-medium text-brand-dark transition-all duration-300 hover:gap-4"
>
  Explorar a plataforma

  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-dark text-white transition-all duration-300 group-hover:rotate-45">
    <ArrowUpRight className="h-4 w-4" />
  </span>
</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSolution;
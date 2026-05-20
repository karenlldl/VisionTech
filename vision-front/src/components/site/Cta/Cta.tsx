import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Parallax, ScaleOnScroll } from "../ui/motion";

const Cta = () => {
  return (
     <section className="bg-brand-dark px-4 py-24 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <ScaleOnScroll from={0.92}>
          <div className="relative overflow-hidden rounded-[40px] bg-linear-to-br from-brand-dark via-[#C10801] to-[#E85002] p-10 md:p-20">
            <div className="grain absolute inset-0" />

            <Parallax offset={30} className="pointer-events-none absolute inset-0">
              <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
            </Parallax>

            <p className="relative text-[11px] uppercase tracking-[0.25em] text-white/70">
              Comece agora
            </p>

            <h2 className="display relative mt-6 max-w-3xl text-5xl md:text-7xl">
              Sua operação merece uma{" "}
              <span className="font-display">infraestrutura</span> à altura.
            </h2>

            <p className="relative mt-6 max-w-xl text-lg text-white/90">
              Vamos desenhar juntos como Vision pode organizar e escalar o
              cuidado da sua organização.
            </p>

            <div className="relative mt-10 flex flex-wrap gap-3">
              <Link
                to="/contato"
                className="group inline-flex items-center gap-2 rounded-full bg-black py-2 pl-6 pr-2 text-sm font-medium text-white"
              >
                Falar com o time
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 transition-transform group-hover:rotate-45">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </Link>

              <Link
                to="/plataforma"
                className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-3 text-sm font-medium backdrop-blur transition hover:bg-white/25"
              >
                Explorar a plataforma
              </Link>
            </div>
          </div>
        </ScaleOnScroll>
      </div>
    </section>
  );
};

export default Cta;
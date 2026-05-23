import { Link } from "react-router-dom";
import { ArrowUpRight, Mail } from "lucide-react";

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.49v-1.73c-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.98c.85 0 1.71.12 2.51.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9v2.8c0 .27.18.59.69.49A10.05 10.05 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
    <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.11 1 2.5 1s2.48 1.12 2.48 2.5ZM.34 8h4.32v14H.34V8Zm7.1 0h4.14v1.91h.06c.58-1.1 1.99-2.26 4.1-2.26 4.39 0 5.2 2.89 5.2 6.65V22h-4.32v-6.82c0-1.63-.03-3.72-2.27-3.72-2.27 0-2.62 1.77-2.62 3.6V22H7.44V8Z" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="relative mt-0 overflow-hidden border-t border-white/10 bg-brand-dark text-white/80 shadow-[0_-1px_0_rgba(255,255,255,0.04)]">
      <div className="gradient-mesh pointer-events-none absolute inset-0 opacity-20" />

      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-24 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="text-xs uppercase tracking-[0.2em] text-white/40">
              Vision Technology
            </p>

            <h2 className="display mt-6 text-5xl text-white md:text-7xl">
              Cuidado em <span className="text-gradient-orange font-display">escala</span>.
            </h2>

            <p className="mt-6 max-w-md leading-relaxed text-white/60">
              Uma plataforma para organizações, institutos e clínicas que querem
              operar saúde e impacto social com inteligência.
            </p>

            <Link
              to="/contato"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-brand-dark transition-all hover:bg-brand-orange hover:text-white"
            >
              Conversar com o time
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </Link>
          </div>

          <div className="grid gap-8 text-sm sm:grid-cols-3 lg:col-span-6">
            <div>
              <h4 className="mb-4 text-xs uppercase tracking-widest text-white/40">
                Produto
              </h4>
              <ul className="space-y-3">
                <li><Link to="/solucao" className="transition hover:text-brand-orange">Solução</Link></li>
                <li><Link to="/plataforma" className="transition hover:text-brand-orange">Plataforma</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-xs uppercase tracking-widest text-white/40">
                Empresa
              </h4>
              <ul className="space-y-3">
                <li><Link to="/sobre" className="transition hover:text-brand-orange">Sobre</Link></li>
                <li><Link to="/time" className="transition hover:text-brand-orange">Time</Link></li>
                <li><Link to="/contato" className="transition hover:text-brand-orange">Contato</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-xs uppercase tracking-widest text-white/40">
                Recursos
              </h4>
              <ul className="space-y-3">
                <li><Link to="/faq" className="transition hover:text-brand-orange">FAQ</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row sm:items-center">
          <p>
            © 2026 Vision — Plataforma de inteligência operacional para saúde e impacto.
          </p>

          <div className="flex gap-2">
            <a
              aria-label="GitHub"
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 transition hover:bg-white/5"
            >
              <GithubIcon />
            </a>

            <a
              aria-label="LinkedIn"
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 transition hover:bg-white/5"
            >
              <LinkedinIcon />
            </a>

            <a
              aria-label="Email"
              href="mailto:contato@vision.app"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 transition hover:bg-white/5"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
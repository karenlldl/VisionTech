import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";

const navLinks = [
  { path: "/", label: "Início" },
  { path: "/sobre", label: "Sobre" },
  { path: "/solucao", label: "Solução" },
  { path: "/plataforma", label: "Plataforma" },
  { path: "/faq", label: "FAQ" },
  { path: "/contato", label: "Contato" },
  { path: "/time", label: "Time" },
];

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav
        className={`mx-auto flex h-16 max-w-7xl items-center justify-between px-4 transition-all duration-300 sm:px-6 ${
  hasScrolled
    ? "rounded-full glass shadow-soft"
    : "rounded-none border border-transparent bg-transparent shadow-none backdrop-blur-0"
}`}
      >
        <Link
          to="/"
          aria-label="Voltar para a página inicial"
          className="flex items-center"
        >
          <img
            src="/images/black-logo.png"
            alt="Vision"
            className="h-8 w-auto object-contain"
          />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                end={link.path === "/"}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? "bg-black/5 text-black"
                      : "text-brand-chrome hover:bg-black/5 hover:text-black"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <Link
          to="https://vision-tech-platform.vercel.app/"
          className="hidden items-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#E85002] lg:inline-flex"
        >
          Acessar plataforma
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/15">
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </Link>

        <button
          type="button"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          onClick={() => setIsMenuOpen((current) => !current)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-black/5 text-black transition hover:bg-black/10 lg:hidden"
        >
          {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {isMenuOpen && (
        <div className="mx-auto mt-3 max-w-7xl rounded-3xl border border-white/50 bg-white/80 p-3 shadow-soft backdrop-blur-xl lg:hidden">
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  end={link.path === "/"}
                  className={({ isActive }) =>
                    `block rounded-2xl px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-black text-white"
                        : "text-brand-chrome hover:bg-black/5 hover:text-black"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}

            <li className="pt-2">
              <Link
                to="/login"
                className="block rounded-full bg-black px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#E85002]"
              >
                Acessar plataforma
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Nav;
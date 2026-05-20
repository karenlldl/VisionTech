import { useState } from "react";
import { LogOut, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { adminLinks, dentistaLinks } from "../../../data/platform/navLinks";

type TipoUsuario = "admin" | "dentista";

type NavPlataformaInternaProps = {
  tipoUsuario: TipoUsuario;
  nomeUsuario?: string;
};

const NavPlataformaInterna = ({
  tipoUsuario,
  nomeUsuario,
}: NavPlataformaInternaProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();

  const isAdmin = tipoUsuario === "admin";
  const links = isAdmin ? adminLinks : dentistaLinks;

  const nomeExibido =
    nomeUsuario || (isAdmin ? "Administrador" : "Dentista Voluntário");

  const perfilUsuario = isAdmin
    ? "Perfil: Administrador"
    : "Perfil: Dentista voluntário";

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#e4ded9] bg-white">
      <div className="flex h-17 items-center justify-between px-4 sm:px-6">
        <Link
          to="/plataforma"
          className="flex items-center"
          aria-label="Voltar para a home da plataforma"
        >
          <img
            src="/img/logo-laranja.png"
            alt="Vision"
            className="h-7 w-auto object-contain sm:h-8"
          />
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {links.map((item) => {
            const Icon = item.icon;

            const isActive =
              location.pathname === item.path ||
              (item.path !== "/dentista" &&
                location.pathname.startsWith(item.path));

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "bg-[#f58200] text-white hover:bg-[#df7600]"
                    : "text-black hover:bg-[#f7f4f1]"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <div className="text-right">
            <p className="text-sm font-semibold text-black">{nomeExibido}</p>
            <p className="text-xs text-[#6f625d]">{perfilUsuario}</p>
          </div>

          <Link
            to="/login"
            className="flex items-center gap-2 text-sm font-semibold text-[#6f625d] transition hover:text-[#f58200]"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((current) => !current)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f7f4f1] text-black transition hover:bg-[#efe8e2] lg:hidden"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-[#e4ded9] bg-white px-4 pb-5 pt-4 shadow-soft lg:hidden">
          <div className="mb-4 rounded-2xl bg-[#f7f4f1] px-4 py-3">
            <p className="text-sm font-semibold text-black">{nomeExibido}</p>
            <p className="text-xs text-[#6f625d]">{perfilUsuario}</p>
          </div>

          <nav className="space-y-2">
            {links.map((item) => {
              const Icon = item.icon;

              const isActive =
                location.pathname === item.path ||
                (item.path !== "/dentista" &&
                  location.pathname.startsWith(item.path));

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMenu}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-[#f58200] text-white"
                      : "bg-white text-black hover:bg-[#f7f4f1]"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Link
            to="/login"
            onClick={closeMenu}
            className="mt-4 flex items-center justify-center gap-2 rounded-2xl border border-[#e4ded9] px-4 py-3 text-sm font-semibold text-[#6f625d] transition hover:border-[#f58200] hover:text-[#f58200]"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </Link>
        </div>
      )}
    </header>
  );
};

export default NavPlataformaInterna;
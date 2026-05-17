import {
  LayoutGrid,
  CalendarDays,
  BarChart3,
  UserPlus,
  ClipboardList,
  History,
  LogOut,
  UserRoundPlus,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

type TipoUsuario = "admin" | "dentista";

type NavPlataformaInternaProps = {
  tipoUsuario: TipoUsuario;
};

const adminLinks = [
  {
    label: "Painel",
    path: "/admin",
    icon: LayoutGrid,
  },
  {
    label: "Agenda",
    path: "/admin/agenda",
    icon: CalendarDays,
  },
  {
    label: "Dashboards",
    path: "/admin/dashboards",
    icon: BarChart3,
  },
  {
    label: "Novo paciente",
    path: "/admin/novo-paciente",
    icon: UserPlus,
  },
  {
    label: "Equipe",
    path: "/admin/equipe",
    icon: UserRoundPlus,
  },
];

const dentistaLinks = [
  {
    label: "Fila de atendimento",
    path: "/dentista",
    icon: CalendarDays,
  },

  {
    label: "Agenda",
    path: "/dentista/agenda",
    icon: CalendarDays,
  },

  {
    label: "Atendimentos",
    path: "/dentista/atendimentos",
    icon: ClipboardList,
  },
  {
    label: "Histórico",
    path: "/dentista/historico",
    icon: History,
  },
];

const NavPlataformaInterna = ({ tipoUsuario }: NavPlataformaInternaProps) => {
  const location = useLocation();

  const isAdmin = tipoUsuario === "admin";
  const links = isAdmin ? adminLinks : dentistaLinks;

  const nomeUsuario = isAdmin ? "Administrador" : "Dra. Camila Santos";
  const perfilUsuario = isAdmin
    ? "Perfil: Administrador"
    : "Perfil: Dentista voluntário";

  return (
    <header className="flex h-[68px] items-center justify-between border-b border-[#e4ded9] bg-white px-6">
      {/* Logo */}
      <Link
        to="/"
        className="flex items-center"
        aria-label="Voltar para a página inicial"
      >
        <img
          src="/img/logo-laranja.png"
          alt="Vision"
          className="h-8 w-auto object-contain"
        />
      </Link>

      {/* Links */}
      <nav className="hidden items-center gap-2 md:flex">
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

      {/* Perfil + sair */}
      <div className="flex items-center gap-5">
        <div className="hidden text-right md:block">
          <p className="text-sm font-semibold text-black">{nomeUsuario}</p>
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
    </header>
  );
};

export default NavPlataformaInterna;
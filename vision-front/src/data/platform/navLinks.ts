import {
  LayoutGrid,
  CalendarDays,
  BarChart3,
  UserPlus,
  ClipboardList,
  History,
  UserRoundPlus,
} from "lucide-react";

export const adminLinks = [
  {
    label: "Painel",
    path: "/admin",
    icon: LayoutGrid,
  },
  {
  label: "Fila externa",
  path: "/admin/fila-externa",
  icon: ClipboardList,
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

export const dentistaLinks = [
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
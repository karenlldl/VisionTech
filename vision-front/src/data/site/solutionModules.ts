import {
  LayoutGrid,
  UsersRound,
  CalendarClock,
  Stethoscope,
  ShieldCheck,
} from "lucide-react";

export const solutionModules = [
  {
    number: "/01",
    icon: LayoutGrid,
    title: "Dashboard administrativo",
    description:
      "Visão consolidada da operação, com indicadores, fluxos, alertas e prioridades em uma única superfície.",
    bullets: [
      "Indicadores da operação",
      "Visão de pacientes e atendimentos",
      "Acompanhamento em tempo real",
    ],
    image: "/images/prints/dashboard-admin.png",
    imageAlt: "Print do dashboard administrativo da plataforma Vision",
  },
  {
    number: "/02",
    icon: UsersRound,
    title: "Gestão de pacientes",
    description:
      "Cadastro, histórico, triagem e jornada completa de cada paciente em um perfil unificado.",
    bullets: [
      "Cadastro centralizado",
      "Histórico do paciente",
      "Triagem e acompanhamento",
    ],
    image: "/images/prints/gestao-pacientes.png",
    imageAlt: "Print da área de gestão de pacientes da plataforma Vision",
  },
  {
    number: "/03",
    icon: CalendarClock,
    title: "Agenda inteligente",
    description:
      "Organização de disponibilidade, consultas, retornos e conflitos de agenda para equipes e pacientes.",
    bullets: [
      "Organização de horários",
      "Acompanhamento de consultas",
      "Fluxo visual de disponibilidade",
    ],
    image: "/images/prints/agenda-inteligente.png",
    imageAlt: "Print da agenda inteligente da plataforma Vision",
  },
  {
    number: "/04",
    icon: Stethoscope,
    title: "Área do profissional",
    description:
      "Espaço para o profissional consultar encaminhamentos, registrar avaliações e atualizar a evolução do tratamento.",
    bullets: [
      "Encaminhamentos organizados",
      "Registro de avaliações",
      "Evolução do tratamento",
    ],
    image: "/images/prints/area-profissional.png",
    imageAlt: "Print da área do profissional da plataforma Vision",
  },
  {
    number: "/05",
    icon: ShieldCheck,
    title: "Gestão de acessos",
    description:
      "Permissões por perfil para administradores, profissionais e membros da equipe, mantendo a operação mais segura.",
    bullets: [
      "Perfis de acesso",
      "Permissões por função",
      "Controle da operação",
    ],
    image: "/images/prints/gestao-acessos.png",
    imageAlt: "Print da gestão de acessos da plataforma Vision",
  },
];
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
      "Visão consolidada da operação, com indicadores, filtros e gráficos para apoiar a coordenação na tomada de decisão.",
    bullets: [
      "Filtros por origem, prioridade, status, dentista e faixa etária",
      "Indicadores de pacientes filtrados, alta prioridade e conclusão",
      "Gráficos sobre origem, idade, prioridade, funil e carga por dentista",
    ],
    image: "/img/dashboard-admin.png",
    imageAlt: "Print do dashboard administrativo da plataforma Vision",
  },
  {
    number: "/02",
    icon: UsersRound,
    title: "Gestão de pacientes",
    description:
       "Módulo para cadastrar novos pacientes, acompanhar o status de cada caso e organizar a distribuição dos atendimentos entre administradores e dentistas.",
    bullets: [
      "Cadastro com programa, data de nascimento, contato, email e observações",
      "Painel com busca, filtros, status, prioridade e atribuição de dentista",
      "Área do dentista para visualizar atendimentos, procedimentos e histórico clínico",
    ],
    image: "/img/gestao-pacientes.png",
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
    image: "/img/agenda.jpeg",
    imageAlt: "Print da agenda inteligente da plataforma Vision",
  },
  {
    number: "/04",
    icon: Stethoscope,
    title: "Área do profissional",
    description:
      "Centraliza a rotina do dentista, permitindo acompanhar pacientes em atendimento, registrar evoluções e consultar históricos finalizados.",
    bullets: [
      "Fila com pacientes encaminhados para atendimento",
      "Modal para registrar procedimento e evolução do tratamento",
      "Histórico clínico com atendimentos concluídos",
    ],
    image: "/img/dentista.png",
    imageAlt: "Print da área do profissional da plataforma Vision",
  },
  {
    number: "/05",
    icon: ShieldCheck,
    title: "Gestão de acessos",
    description:
      "Centraliza o cadastro da equipe e separa os perfis da operação, garantindo que administradores, dentistas e funcionários tenham acessos adequados às suas funções.",
    bullets: [
      "Cadastro separado para dentistas voluntários e funcionários",
      "Controle de dados profissionais, cargo, especialidade e e-mail",
      "Convite por e-mail para criação segura da senha de acesso",
    ],
    image: "/img/cadastro-funcionarios.png",
    imageAlt: "Print da gestão de acessos da plataforma Vision",
  },
];
import {
  Database,
  Filter,
  GraduationCap,
  HeartHandshake,
  LayoutDashboard,
  Network,
  SlidersHorizontal,
  UsersRound,
} from "lucide-react";

export const aboutHighlights = [
  {
    icon: SlidersHorizontal,
    title: "Jornada do paciente centralizada",
    description:
      "Todas as etapas do atendimento em um único lugar, do primeiro contato ao acompanhamento.",
  },
  {
    icon: Filter,
    title: "Triagem e priorização",
    description:
      "Apoio para identificar urgências e organizar a fila com critérios claros.",
  },
  {
    icon: UsersRound,
    title: "Equipes e responsabilidades",
    description:
      "Organização de papéis, voluntários e profissionais com visibilidade compartilhada.",
  },
  {
    icon: LayoutDashboard,
    title: "Dashboards de decisão",
    description:
      "Indicadores que mostram o que importa, sem ruído, para gestores e coordenadores.",
  },
  {
    icon: Database,
    title: "Preparada para integrar",
    description:
      "Base pronta para conexão com backend, banco de dados e APIs externas.",
  },
  {
    icon: HeartHandshake,
    title: "Adaptável a outras organizações",
    description:
      "ONGs, institutos, clínicas e projetos públicos podem moldar a Vision à sua operação.",
  },
];

export const aboutStorySections = [
  {
    number: "01",
    icon: GraduationCap,
    title: "Onde tudo começou",
    paragraphs: [
      "O projeto foi desenvolvido no contexto acadêmico da FIAP, durante o Challenge proposto em parceria com a Turma do Bem, uma organização que atua para ampliar o acesso ao tratamento odontológico e transformar a vida de pessoas em situação de vulnerabilidade.",
      "A partir desse desafio, nossa equipe identificou uma dor importante: muitos processos de atendimento ainda dependem de informações espalhadas, controles manuais e fluxos difíceis de acompanhar.",
    ],
  },
  {
    number: "02",
    icon: Network,
    title: "Por que a Vision foi criada",
    paragraphs: [
      "A Vision foi criada para organizar a jornada do paciente — do primeiro contato até o acompanhamento final. A ideia é centralizar dados, facilitar a triagem, dar mais visibilidade para a equipe e apoiar decisões mais rápidas e responsáveis.",
      "Em vez de depender de várias ferramentas desconectadas, a plataforma propõe uma visão única da operação.",
    ],
  },
  {
    number: "03",
    icon: HeartHandshake,
    title: "Mais do que um projeto acadêmico",
    paragraphs: [
      "Embora tenha nascido dentro de um desafio da FIAP com foco na Turma do Bem, a Vision foi pensada como uma tecnologia escalável.",
      "A solução pode ser adaptada para ONGs, institutos, clínicas, projetos públicos e organizações que precisam gerenciar atendimento, equipe, prioridades, histórico e indicadores de impacto.",
    ],
  },
  {
    number: "04",
    icon: LayoutDashboard,
    title: "Nosso olhar para a solução",
    paragraphs: [
      "A proposta da Vision não é substituir o cuidado humano, mas fortalecer quem cuida. A plataforma organiza informações, reduz ruídos operacionais e ajuda profissionais e gestores a enxergarem melhor o que está acontecendo em cada etapa do processo.",
      "Quando a operação fica mais clara, o impacto pode chegar mais longe.",
    ],
  },
];
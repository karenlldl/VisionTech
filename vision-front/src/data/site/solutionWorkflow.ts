import {
  ClipboardCheck,
  HeartPulse,
  Send,
  UserPlus,
} from "lucide-react";

export const workflowSteps = [
  {
    step: "01",
    icon: UserPlus,
    title: "Cadastro",
    description:
      "Registro digital do paciente, documentos e contexto socioeconômico.",
  },
  {
    step: "02",
    icon: ClipboardCheck,
    title: "Triagem",
    description:
      "Classificação por urgência e necessidade, com critérios padronizados.",
  },
  {
    step: "03",
    icon: HeartPulse,
    title: "Avaliação",
    description:
      "Diagnóstico do profissional registrado e versionado na plataforma.",
  },
  {
    step: "04",
    icon: Send,
    title: "Encaminhamento",
    description:
      "Match automático com o profissional mais adequado e disponível.",
  },
  {
    step: "05",
    icon: HeartPulse,
    title: "Acompanhamento",
    description:
      "Histórico contínuo do tratamento, da primeira consulta à alta.",
  },
];
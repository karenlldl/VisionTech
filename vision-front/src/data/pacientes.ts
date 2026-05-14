export type Paciente = {
  id: number;
  nome: string;
  idade: number;
  origem: string;
  origemIcone: string;
  status: string;
  prioridade: string;
  data: string;
  dentista?: string;
};

export const pacientesMock: Paciente[] = [
  {
    id: 1,
    nome: "Maria Silva",
    idade: 9,
    origem: "E.M. Santos Dumont",
    origemIcone: "school",
    status: "Aguardando",
    prioridade: "Baixa",
    data: "2025-05-20 • 09:00",
    dentista: "Dra. Camila Santos",
  },

  {
    id: 2,
    nome: "Luana Lima",
    idade: 28,
    origem: "Externo",
    origemIcone: "globe",
    status: "Sem dentista",
    prioridade: "Alta",
    data: "Sem dentista",
  },

  {
    id: 3,
    nome: "Lucas Oliveira",
    idade: 10,
    origem: "E.M. Drummond",
    origemIcone: "school",
    status: "Concluído",
    prioridade: "Média",
    data: "2025-05-21 • 14:00",
    dentista: "Dr. Rafael Lima",
  },
];
import {
  CalendarDays,
  Search,
  Eye,
  Stethoscope,
  Globe,
  Building2,
  Circle,
  ChevronDown,
} from "lucide-react";
import NavPlataformaInterna from "../../components/NavPlataformaInterna/NavPlataformaInterna";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Paciente = {
  nome: string;
  idade: number;
  origem: string;
  origemIcone: string;
  status: string;
  prioridade: string;
  data: string;
};

type Andamento = "em-andamento" | "completo";

const pacientesAgendados: Paciente[] = [
  {
    nome: "Beatriz Lima",
    idade: 28,
    origem: "Externo",
    origemIcone: "globe",
    status: "Aprovado",
    prioridade: "Alta",
    data: "segunda-feira, 17 de março de 2025",
  },
  {
    nome: "Fábio Junior",
    idade: 14,
    origem: "ETEC",
    origemIcone: "school",
    status: "Em fila",
    prioridade: "Média",
    data: "domingo, 05 de abril de 2026",
  },
];

const pacientesPorData = pacientesAgendados.reduce((acc, paciente) => {
  if (!acc[paciente.data]) {
    acc[paciente.data] = [];
  }

  acc[paciente.data].push(paciente);
  return acc;
}, {} as Record<string, Paciente[]>);

const DentistaHome = () => {
  const navigate = useNavigate();

  const [modalAberto, setModalAberto] = useState(false);
  const [pacienteSelecionado, setPacienteSelecionado] =
    useState<Paciente | null>(null);

  const [descricaoAtendimento, setDescricaoAtendimento] = useState("");
  const [erroAtendimento, setErroAtendimento] = useState("");

  const [andamento, setAndamento] = useState<Andamento>("em-andamento");

  const abrirModalAtendimento = (paciente: Paciente) => {
    setPacienteSelecionado(paciente);
    setDescricaoAtendimento("");
    setErroAtendimento("");
    setAndamento("em-andamento");
    setModalAberto(true);
  };

  const fecharModalAtendimento = () => {
    setModalAberto(false);
    setPacienteSelecionado(null);
    setDescricaoAtendimento("");
    setErroAtendimento("");
    setAndamento("em-andamento");
  };

  const salvarAtendimento = () => {
    if (!pacienteSelecionado) {
      setErroAtendimento("Selecione um paciente antes de salvar.");
      return;
    }

    if (descricaoAtendimento.trim() === "") {
      setErroAtendimento("Descreva o que foi feito no atendimento.");
      return;
    }

    const novoRegistro = {
      id: crypto.randomUUID(),
      nome: pacienteSelecionado.nome,
      idade: pacienteSelecionado.idade,
      origem: pacienteSelecionado.origem,
      origemIcone: pacienteSelecionado.origemIcone,
      status: pacienteSelecionado.status,
      prioridade: pacienteSelecionado.prioridade,
      dataAgenda: pacienteSelecionado.data,
      descricaoAtendimento: descricaoAtendimento.trim(),
      andamento,
      dataRegistro: new Date().toLocaleDateString("pt-BR"),
    };

    if (andamento === "em-andamento") {
      const atendimentosSalvos = JSON.parse(
        localStorage.getItem("atendimentosEmAndamento") || "[]"
      );

      const novaLista = [...atendimentosSalvos, novoRegistro];

      localStorage.setItem(
        "atendimentosEmAndamento",
        JSON.stringify(novaLista)
      );

      setModalAberto(false);

      navigate("/dentista/atendimentos", {
        state: {
          atendimento: novoRegistro,
        },
      });

      return;
    }

    const historicoSalvo = JSON.parse(
      localStorage.getItem("historicoAtendimentos") || "[]"
    );

    const novoHistorico = [...historicoSalvo, novoRegistro];

    localStorage.setItem(
      "historicoAtendimentos",
      JSON.stringify(novoHistorico)
    );

    setModalAberto(false);

    navigate("/dentista/historico", {
      state: {
        atendimento: novoRegistro,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#fdfdfc] font-sans text-[#2f251f]">
      <NavPlataformaInterna tipoUsuario="dentista" />

      <main className="mx-auto w-full max-w-[1050px] px-6 py-8">
        {/* Header */}
        <section className="mb-7">
          <div className="flex items-start gap-3">
            <CalendarDays className="mt-1 h-6 w-6 text-[#f58200]" />

            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-[#2f251f]">
                Minha agenda
              </h1>

              <p className="mt-1 text-sm text-[#6f625d]">
                Pacientes agendados e em atendimento atribuídos a você.
              </p>
            </div>
          </div>
        </section>

        {/* Cards de resumo */}
        <section className="mb-6 grid gap-4 md:grid-cols-3">
          <article className="rounded-xl border border-[#ded7d1] bg-white px-6 py-5 text-center shadow-sm">
            <strong className="block text-2xl font-extrabold text-[#f58200]">
              2
            </strong>
            <span className="mt-1 block text-xs font-medium text-[#6f625d]">
              Agendados
            </span>
          </article>

          <article className="rounded-xl border border-[#ded7d1] bg-white px-6 py-5 text-center shadow-sm">
            <strong className="block text-2xl font-extrabold text-purple-500">
              0
            </strong>
            <span className="mt-1 block text-xs font-medium text-[#6f625d]">
              Em atendimento
            </span>
          </article>

          <article className="rounded-xl border border-[#ded7d1] bg-white px-6 py-5 text-center shadow-sm">
            <strong className="block text-2xl font-extrabold text-[#B5BB0F]">
              0
            </strong>
            <span className="mt-1 block text-xs font-medium text-[#6f625d]">
              Já atendidos
            </span>
          </article>
        </section>

        {/* Busca e filtro */}
        <section className="mb-7 grid gap-3 md:grid-cols-[1fr_180px]">
          <div className="flex h-10 items-center gap-2 rounded-lg border border-[#ded7d1] bg-white px-3">
            <Search className="h-4 w-4 text-[#6f625d]" />

            <input
              type="text"
              placeholder="Buscar paciente..."
              className="h-full w-full bg-transparent text-sm outline-none placeholder:text-[#6f625d]"
            />
          </div>

          <button className="flex h-10 items-center justify-between rounded-lg border border-[#ded7d1] bg-white px-4 text-sm font-medium text-[#2f251f] transition hover:bg-[#f7f4f1]">
            Ativos (não...
            <ChevronDown className="h-4 w-4 text-[#6f625d]" />
          </button>
        </section>

        {/* Lista agrupada por data */}
        <section className="space-y-6">
          {Object.entries(pacientesPorData).map(([data, pacientes]) => (
            <div key={data}>
              <div className="mb-3 flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-[#6f625d]" />

                <h2 className="text-sm font-bold text-[#6f625d]">
                  {data}
                </h2>

                <span className="rounded-full bg-[#f4f1ee] px-2 py-0.5 text-xs font-bold text-[#6f625d]">
                  {pacientes.length} paciente
                  {pacientes.length > 1 ? "s" : ""}
                </span>
              </div>

              <div className="space-y-3">
                {pacientes.map((paciente) => (
                  <article
                    key={`${paciente.nome}-${paciente.data}`}
                    className={`flex flex-col gap-4 rounded-xl border border-[#ded7d1] bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between ${
                      paciente.prioridade === "Alta"
                        ? "border-l-4 border-l-red-400"
                        : ""
                    }`}
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-extrabold text-[#2f251f]">
                          {paciente.nome}
                        </h3>

                        <span className="text-sm text-[#6f625d]">
                          ({paciente.idade} anos)
                        </span>

                        <span className="flex items-center gap-1 rounded-full bg-[#f4f1ee] px-2 py-1 text-xs font-medium text-[#2f251f]">
                          {paciente.origemIcone === "globe" ? (
                            <Globe className="h-3 w-3 text-sky-500" />
                          ) : (
                            <Building2 className="h-3 w-3 text-[#6f625d]" />
                          )}
                          {paciente.origem}
                        </span>
                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${
                            paciente.status === "Aprovado"
                              ? "bg-green-100 text-green-700"
                              : "bg-[#B5BB0F] text-white"
                          }`}
                        >
                          {paciente.status}
                        </span>

                        <span
                          className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${
                            paciente.prioridade === "Alta"
                              ? "bg-red-100 text-red-600"
                              : "bg-orange-100 text-orange-500"
                          }`}
                        >
                          <Circle className="h-2 w-2 fill-current" />
                          {paciente.prioridade}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2 self-end md:self-auto">
                      <button className="flex h-10 items-center gap-2 rounded-lg border border-[#ded7d1] bg-white px-4 text-sm font-semibold text-[#2f251f] transition hover:bg-[#f7f4f1]">
                        <Eye className="h-4 w-4" />
                        Ver
                      </button>

                      <button
                        type="button"
                        onClick={() => abrirModalAtendimento(paciente)}
                        className="flex h-10 items-center gap-2 rounded-lg bg-[#f58200] px-4 text-sm font-bold text-white transition hover:bg-[#df7600]"
                      >
                        <Stethoscope className="h-4 w-4" />
                        Atender
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* Modal */}
      {modalAberto && pacienteSelecionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-5">
          <section className="w-full max-w-[520px] rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Stethoscope className="h-5 w-5 text-[#f58200]" />
                  <h2 className="text-xl font-extrabold text-[#2f251f]">
                    Registrar atendimento
                  </h2>
                </div>

                <p className="mt-1 text-sm text-[#6f625d]">
                  Paciente: {pacienteSelecionado.nome} (
                  {pacienteSelecionado.idade} anos)
                </p>
              </div>

              <button
                type="button"
                onClick={fecharModalAtendimento}
                className="text-2xl leading-none text-[#6f625d] transition hover:text-[#2f251f]"
              >
                ×
              </button>
            </div>

            <div>
              <label
                htmlFor="descricaoAtendimento"
                className="mb-2 block text-sm font-bold text-[#2f251f]"
              >
                O que foi feito? *
              </label>

              <textarea
                id="descricaoAtendimento"
                value={descricaoAtendimento}
                onChange={(event) => {
                  setDescricaoAtendimento(event.target.value);
                  setErroAtendimento("");
                }}
                placeholder="Descreva o procedimento realizado, observações clínicas, próximos passos..."
                rows={5}
                className="w-full resize-none rounded-xl border border-[#f58200] bg-white px-3 py-3 text-sm outline-none transition placeholder:text-[#8f8580] focus:ring-2 focus:ring-[#f58200]/20"
              />

              {erroAtendimento && (
                <p className="mt-2 text-xs font-semibold text-red-500">
                  {erroAtendimento}
                </p>
              )}
            </div>

            <div className="mt-5">
              <p className="mb-3 text-sm font-bold text-[#2f251f]">
                Andamento
              </p>

              <div className="space-y-2">
                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#ded7d1] bg-white px-4 py-3 transition hover:border-[#f58200] hover:bg-[#fffaf5]">
                  <input
                    type="radio"
                    name="andamento"
                    value="em-andamento"
                    checked={andamento === "em-andamento"}
                    onChange={() => setAndamento("em-andamento")}
                    className="accent-[#f58200]"
                  />

                  <div>
                    <p className="text-sm font-bold text-[#2f251f]">
                      🟡 Ainda em andamento
                    </p>
                    <p className="text-xs text-[#6f625d]">
                      Tratamento iniciado, requer mais sessões
                    </p>
                  </div>
                </label>

                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#ded7d1] bg-white px-4 py-3 transition hover:border-[#f58200] hover:bg-[#fffaf5]">
                  <input
                    type="radio"
                    name="andamento"
                    value="completo"
                    checked={andamento === "completo"}
                    onChange={() => setAndamento("completo")}
                    className="accent-[#f58200]"
                  />

                  <div>
                    <p className="text-sm font-bold text-[#2f251f]">
                      ✅ Completo
                    </p>
                    <p className="text-xs text-[#6f625d]">
                      Tratamento integralmente finalizado
                    </p>
                  </div>
                </label>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={fecharModalAtendimento}
                className="rounded-lg px-4 py-2 text-sm font-semibold text-[#2f251f] transition hover:bg-[#f7f4f1]"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={salvarAtendimento}
                className="rounded-lg bg-[#f58200] px-5 py-2 text-sm font-bold text-white transition hover:bg-[#df7600]"
              >
                Salvar atendimento
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default DentistaHome;
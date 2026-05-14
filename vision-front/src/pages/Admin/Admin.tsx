import { useMemo, useState } from "react";
import {
  Search,
  MessageSquare,
  X,
} from "lucide-react";

import NavPlataformaInterna from "../../components/NavPlataformaInterna/NavPlataformaInterna";

const pacientesMock = [
  {
    id: 1,
    nome: "Maria Silva",
    idade: 9,
    origem: "E.M. Santos Dumont",
    projeto: "Dentistas do Bem",
    prioridade: "Baixa",
    status: "Aguardando",
    dentista: "Dra. Camila Santos",
    data: "2025-03-15",
    dataConsulta: "2025-05-20",
    horarioConsulta: "09:00",
    observacao: "Cárie no dente 36",
  },

  {
    id: 2,
    nome: "Luana Lima",
    idade: 28,
    origem: "Externo",
    projeto: "Apolônias do Bem",
    prioridade: "Alta",
    status: "Sem dentista",
    dentista: "",
    data: "2025-03-18",
    dataConsulta: "",
    horarioConsulta: "",
    observacao:
      "Paciente com dor intensa e necessidade urgente.",
  },

  {
    id: 3,
    nome: "Lucas Oliveira",
    idade: 10,
    origem: "E.M. Drummond",
    projeto: "Dentistas do Bem",
    prioridade: "Média",
    status: "Concluído",
    dentista: "Dr. Rafael Lima",
    data: "2025-03-10",
    dataConsulta: "2025-05-21",
    horarioConsulta: "14:00",
    observacao:
      "Tratamento ortodôntico concluído.",
  },
];

const Admin = () => {
  const [pacientes, setPacientes] =
    useState(pacientesMock);

  const [busca, setBusca] = useState("");
  const [filtroOrigem, setFiltroOrigem] =
    useState("Todas");

  const [filtroPrioridade, setFiltroPrioridade] =
    useState("Todas");

  const [filtroStatus, setFiltroStatus] =
    useState("Todos");

  const [filtroProjeto, setFiltroProjeto] =
    useState("Todos");

  const [pacienteSelecionado, setPacienteSelecionado] =
    useState<any>(null);

  // MODAL AGENDA
  const [modalAgenda, setModalAgenda] =
    useState<any>(null);

  const [dentistaSelecionado, setDentistaSelecionado] =
    useState("");

  const [dataSelecionada, setDataSelecionada] =
    useState("");

  const [horarioSelecionado, setHorarioSelecionado] =
    useState("");

  const pacientesFiltrados = useMemo(() => {
    return pacientes.filter((paciente) => {
      const matchBusca = paciente.nome
        .toLowerCase()
        .includes(busca.toLowerCase());

      const matchOrigem =
        filtroOrigem === "Todas" ||
        (filtroOrigem === "Escola" &&
          paciente.origem !== "Externo") ||
        (filtroOrigem === "Externo" &&
          paciente.origem === "Externo");

      const matchPrioridade =
        filtroPrioridade === "Todas" ||
        paciente.prioridade ===
          filtroPrioridade;

      const matchStatus =
        filtroStatus === "Todos" ||
        paciente.status === filtroStatus;

      const matchProjeto =
        filtroProjeto === "Todos" ||
        paciente.projeto === filtroProjeto;

      return (
        matchBusca &&
        matchOrigem &&
        matchPrioridade &&
        matchStatus &&
        matchProjeto
      );
    });
  }, [
    pacientes,
    busca,
    filtroOrigem,
    filtroPrioridade,
    filtroStatus,
    filtroProjeto,
  ]);

  const alterarPrioridade = (
    id: number,
    prioridade: string
  ) => {
    setPacientes((prev) =>
      prev.map((paciente) =>
        paciente.id === id
          ? { ...paciente, prioridade }
          : paciente
      )
    );
  };

  const confirmarAgendamento = () => {
    if (
      !modalAgenda ||
      !dentistaSelecionado ||
      !dataSelecionada ||
      !horarioSelecionado
    )
      return;

    setPacientes((prev) =>
      prev.map((paciente) =>
        paciente.id === modalAgenda.id
          ? {
              ...paciente,
              dentista:
                dentistaSelecionado,
              dataConsulta:
                dataSelecionada,
              horarioConsulta:
                horarioSelecionado,
              status: "Aguardando",
            }
          : paciente
      )
    );

    setModalAgenda(null);

    setDentistaSelecionado("");
    setDataSelecionada("");
    setHorarioSelecionado("");
  };

  const totalPacientes = pacientes.length;

  const semDentista = pacientes.filter(
    (p) => p.status === "Sem dentista"
  ).length;

  const aguardando = pacientes.filter(
    (p) => p.status === "Aguardando"
  ).length;

  const emAtendimento = pacientes.filter(
    (p) => p.status === "Em atendimento"
  ).length;

  const concluidos = pacientes.filter(
    (p) => p.status === "Concluído"
  ).length;

  const prioridadeStyle = {
    Baixa:
      "bg-green-100 text-green-700 border border-green-200",

    Média:
      "bg-yellow-100 text-yellow-700 border border-yellow-200",

    Alta:
      "bg-red-100 text-red-700 border border-red-200",
  };

  const statusStyle = {
    "Sem dentista":
      "bg-gray-100 text-gray-700",

    Aguardando:
      "bg-orange-100 text-orange-700",

    "Em atendimento":
      "bg-purple-100 text-purple-700",

    Concluído:
      "bg-green-100 text-green-700",
  };

  return (
    <div className="min-h-screen bg-[#fdfdfc]">
      <NavPlataformaInterna tipoUsuario="admin" />

      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* HEADER */}
        <div>
          <h1 className="text-4xl font-bold text-[#2f251f]">
            Painel de controle
          </h1>

          <p className="mt-1 text-[#7c6f67]">
            Gerencie pacientes e acompanhe o
            processo de atendimento.
          </p>
        </div>

        {/* CARDS */}
        <section className="mt-8 grid gap-4 md:grid-cols-5">
          <div className="rounded-2xl border border-[#e7dfd8] bg-white p-5 text-center shadow-sm">
            <h2 className="text-4xl font-bold text-[#2f251f]">
              {totalPacientes}
            </h2>

            <p className="mt-1 text-sm text-[#7c6f67]">
              Total
            </p>
          </div>

          <div className="rounded-2xl border border-[#e7dfd8] bg-white p-5 text-center shadow-sm">
            <h2 className="text-4xl font-bold text-gray-500">
              {semDentista}
            </h2>

            <p className="mt-1 text-sm text-[#7c6f67]">
              Sem dentista
            </p>
          </div>

          <div className="rounded-2xl border border-[#e7dfd8] bg-white p-5 text-center shadow-sm">
            <h2 className="text-4xl font-bold text-[#f58200]">
              {aguardando}
            </h2>

            <p className="mt-1 text-sm text-[#7c6f67]">
              Aguardando
            </p>
          </div>

          <div className="rounded-2xl border border-[#e7dfd8] bg-white p-5 text-center shadow-sm">
            <h2 className="text-4xl font-bold text-[#8b5cf6]">
              {emAtendimento}
            </h2>

            <p className="mt-1 text-sm text-[#7c6f67]">
              Em atendimento
            </p>
          </div>

          <div className="rounded-2xl border border-[#e7dfd8] bg-white p-5 text-center shadow-sm">
            <h2 className="text-4xl font-bold text-[#22c55e]">
              {concluidos}
            </h2>

            <p className="mt-1 text-sm text-[#7c6f67]">
              Concluídos
            </p>
          </div>
        </section>

        {/* FILTROS */}
        <section className="mt-8 flex flex-col gap-4 lg:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7c6f67]" />

            <input
              type="text"
              placeholder="Buscar por nome..."
              value={busca}
              onChange={(e) =>
                setBusca(e.target.value)
              }
              className="h-12 w-full rounded-xl border border-[#ddd3cb] bg-white pl-11 pr-4 outline-none transition focus:border-[#f58200]"
            />
          </div>

          <select
            value={filtroOrigem}
            onChange={(e) =>
              setFiltroOrigem(e.target.value)
            }
            className="h-12 rounded-xl border border-[#ddd3cb] bg-white px-4 outline-none"
          >
            <option>Todas</option>
            <option>Escola</option>
            <option>Externo</option>
          </select>

          <select
            value={filtroProjeto}
            onChange={(e) =>
              setFiltroProjeto(e.target.value)
            }
            className="h-12 rounded-xl border border-[#ddd3cb] bg-white px-4 outline-none"
          >
            <option>Todos</option>
            <option>Dentistas do Bem</option>
            <option>Apolônias do Bem</option>
          </select>

          <select
            value={filtroPrioridade}
            onChange={(e) =>
              setFiltroPrioridade(e.target.value)
            }
            className="h-12 rounded-xl border border-[#ddd3cb] bg-white px-4 outline-none"
          >
            <option>Todas</option>
            <option>Baixa</option>
            <option>Média</option>
            <option>Alta</option>
          </select>

          <select
            value={filtroStatus}
            onChange={(e) =>
              setFiltroStatus(e.target.value)
            }
            className="h-12 rounded-xl border border-[#ddd3cb] bg-white px-4 outline-none"
          >
            <option>Todos</option>
            <option>Sem dentista</option>
            <option>Aguardando</option>
            <option>Em atendimento</option>
            <option>Concluído</option>
          </select>
        </section>

        {/* LISTA */}
        <section className="mt-8 flex flex-col gap-4">
          {pacientesFiltrados.map((paciente) => (
            <div
              key={paciente.id}
              className="flex flex-col gap-6 rounded-2xl border border-[#e7dfd8] bg-white p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-2xl font-bold text-[#2f251f]">
                    {paciente.nome}
                  </h2>

                  <span className="text-[#7c6f67]">
                    ({paciente.idade} anos)
                  </span>

                  <span className="rounded-full bg-[#f6f1ec] px-3 py-1 text-sm text-[#7c6f67]">
                    {paciente.origem}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${
                      statusStyle[
                        paciente.status as keyof typeof statusStyle
                      ]
                    }`}
                  >
                    {paciente.status}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${
                      prioridadeStyle[
                        paciente.prioridade as keyof typeof prioridadeStyle
                      ]
                    }`}
                  >
                    {paciente.prioridade}
                  </span>

                  {paciente.dataConsulta && (
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                      {paciente.dataConsulta} •{" "}
                      {
                        paciente.horarioConsulta
                      }
                    </span>
                  )}

                  {paciente.dentista ? (
                    <span className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-700">
                      {paciente.dentista}
                    </span>
                  ) : (
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
                      Sem dentista
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* PRIORIDADE */}
                <select
                  value={paciente.prioridade}
                  onChange={(e) =>
                    alterarPrioridade(
                      paciente.id,
                      e.target.value
                    )
                  }
                  className="h-11 rounded-xl border border-[#ddd3cb] bg-white px-4 outline-none"
                >
                  <option>Baixa</option>
                  <option>Média</option>
                  <option>Alta</option>
                </select>

                {/* AGENDAR */}
                <button
                  onClick={() =>
                    setModalAgenda(paciente)
                  }
                  className="h-11 rounded-xl border border-[#ddd3cb] bg-white px-5 font-medium transition hover:bg-[#f6f1ec]"
                >
                  {paciente.dentista
                    ? "Reagendar"
                    : "Atribuir"}
                </button>

                {/* DETALHES */}
                <button
                  onClick={() =>
                    setPacienteSelecionado(
                      paciente
                    )
                  }
                  className="flex h-11 items-center gap-2 rounded-xl border border-[#ddd3cb] px-5 font-medium transition hover:bg-[#f6f1ec]"
                >
                  <MessageSquare className="h-4 w-4" />
                  Detalhes
                </button>
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* MODAL DETALHES */}
      {pacienteSelecionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-2xl rounded-3xl bg-white p-7 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-3xl font-bold text-[#2f251f]">
                    {pacienteSelecionado.nome}
                  </h2>

                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${
                      statusStyle[
                        pacienteSelecionado.status as keyof typeof statusStyle
                      ]
                    }`}
                  >
                    {pacienteSelecionado.status}
                  </span>
                </div>
              </div>

              <button
                onClick={() =>
                  setPacienteSelecionado(null)
                }
              >
                <X className="h-5 w-5 text-[#7c6f67]" />
              </button>
            </div>

            <div className="mt-6 grid gap-4 text-[#4d4039] md:grid-cols-2">
              <p>
                <strong>Idade:</strong>{" "}
                {pacienteSelecionado.idade}
              </p>

              <p>
                <strong>Origem:</strong>{" "}
                {pacienteSelecionado.origem}
              </p>

              <p>
                <strong>Dentista:</strong>{" "}
                {pacienteSelecionado.dentista ||
                  "Não atribuído"}
              </p>

              <p>
                <strong>Projeto:</strong>{" "}
                {pacienteSelecionado.projeto}
              </p>

              <p>
                <strong>Consulta:</strong>{" "}
                {pacienteSelecionado.dataConsulta ||
                  "Não agendada"}
              </p>

              <p>
                <strong>Horário:</strong>{" "}
                {pacienteSelecionado.horarioConsulta ||
                  "--"}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold text-[#2f251f]">
                Observações
              </h3>

              <div className="mt-2 rounded-2xl bg-[#f6f1ec] p-4 text-[#5f534c]">
                {pacienteSelecionado.observacao}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL AGENDA */}
      {modalAgenda && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-xl rounded-3xl bg-white p-7 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-[#2f251f]">
                  Agendar paciente
                </h2>

                <p className="mt-1 text-[#7c6f67]">
                  {modalAgenda.nome}
                </p>
              </div>

              <button
                onClick={() =>
                  setModalAgenda(null)
                }
              >
                <X className="h-5 w-5 text-[#7c6f67]" />
              </button>
            </div>

            {/* DENTISTA */}
            <div className="mt-6">
              <label className="text-sm font-semibold text-[#2f251f]">
                Dentista
              </label>

              <select
                value={dentistaSelecionado}
                onChange={(e) =>
                  setDentistaSelecionado(
                    e.target.value
                  )
                }
                className="mt-2 h-12 w-full rounded-xl border border-[#ddd3cb] px-4 outline-none"
              >
                <option value="">
                  Selecione
                </option>

                <option>
                  Dra. Camila Santos
                </option>

                <option>
                  Dr. Rafael Lima
                </option>
              </select>
            </div>

            {/* DATA */}
            <div className="mt-5">
              <label className="text-sm font-semibold text-[#2f251f]">
                Data
              </label>

              <input
                type="date"
                value={dataSelecionada}
                onChange={(e) =>
                  setDataSelecionada(
                    e.target.value
                  )
                }
                className="mt-2 h-12 w-full rounded-xl border border-[#ddd3cb] px-4 outline-none"
              />
            </div>

            {/* HORARIO */}
            <div className="mt-5">
              <label className="text-sm font-semibold text-[#2f251f]">
                Horário
              </label>

              <div className="mt-3 grid grid-cols-3 gap-3">
                {[
                  "08:00",
                  "09:00",
                  "10:00",
                  "11:00",
                  "14:00",
                  "15:00",
                ].map((hora) => (
                  <button
                    key={hora}
                    onClick={() =>
                      setHorarioSelecionado(
                        hora
                      )
                    }
                    className={`h-11 rounded-xl border text-sm font-medium transition ${
                      horarioSelecionado ===
                      hora
                        ? "border-[#f58200] bg-[#fff4e8] text-[#f58200]"
                        : "border-[#ddd3cb] hover:bg-[#f6f1ec]"
                    }`}
                  >
                    {hora}
                  </button>
                ))}
              </div>
            </div>

            {/* BOTÃO */}
            <button
              onClick={
                confirmarAgendamento
              }
              className="mt-8 h-12 w-full rounded-xl bg-[#f58200] font-bold text-white transition hover:bg-[#ff9d33]"
            >
              Confirmar agendamento
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
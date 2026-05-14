import { useState } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Filter, RotateCcw } from "lucide-react";
import NavPlataformaInterna from "../../components/NavPlataformaInterna/NavPlataformaInterna";

const orange = "#f58200";
const green = "#b5bb0f";
const red = "#ef4444";

const origemOptions = ["Todas", "Escola", "Externo"];
const prioridadeOptions = ["Todas", "Baixa", "Média", "Alta"];
const statusOptions = ["Todos", "Sem dentista", "Aguardando", "Em atendimento", "Concluído"];
const dentistaOptions = ["Todos", "Dra. Camila Santos", "Dr. Rafael Lima"];
const faixaEtariaOptions = ["Todas", "0-7 anos", "8-12 anos", "13-17 anos", "18+ anos"];

const origemData = [
  { name: "Escolas", value: 7 },
  { name: "Cadastro externo", value: 1 },
];

const faixaEtariaData = [
  { name: "0-7 anos", value: 1 },
  { name: "8-12 anos", value: 3 },
  { name: "13-17 anos", value: 1 },
  { name: "18+ anos", value: 3 },
];

const prioridadeData = [
  { name: "Alta", value: 3 },
  { name: "Média", value: 4 },
  { name: "Baixa", value: 1 },
];

const statusData = [
  { name: "Sem dentista", value: 1 },
  { name: "Aguardando", value: 3 },
  { name: "Em atendimento", value: 1 },
  { name: "Concluído", value: 3 },
];

const dentistaData = [
  { name: "Dra. Camila", value: 3 },
  { name: "Dr. Rafael", value: 1 },
];

const evolucaoData = [
  { name: "2025-03", value: 4 },
  { name: "2025-04", value: 1 },
  { name: "2026-04", value: 2 },
  { name: "2026-05", value: 1 },
];

const rendaData = [
  { name: "Até R$ 1.000", value: 4 },
  { name: "R$ 1.001 a 2.000", value: 4 },
  { name: "Acima de R$ 2.000", value: 0 },
];

const escolasData = [
  { name: "ETEC", value: 3 },
  { name: "E.M. Santos Dumont", value: 1 },
  { name: "E.M. Monteiro Lobato", value: 1 },
  { name: "E.M. Cecília Meireles", value: 1 },
  { name: "E.M. Drummond", value: 1 },
];

const DashboardCard = ({
  title,
  children,
  description,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) => {
  return (
    <section className="rounded-2xl border border-[#e7dfd8] bg-white p-5 shadow-sm">
      <h2 className="text-lg font-bold text-[#2f251f]">{title}</h2>

      {description && (
        <p className="mt-2 text-xs text-[#7c6f67]">{description}</p>
      )}

      <div className="mt-5 h-[260px]">{children}</div>
    </section>
  );
};

const AdminDashboards = () => {
  const [filtroOrigem, setFiltroOrigem] = useState("Todas");
  const [filtroPrioridade, setFiltroPrioridade] = useState("Todas");
  const [filtroStatus, setFiltroStatus] = useState("Todos");
  const [filtroDentista, setFiltroDentista] = useState("Todos");
  const [filtroFaixaEtaria, setFiltroFaixaEtaria] = useState("Todas");

  const limparFiltros = () => {
    setFiltroOrigem("Todas");
    setFiltroPrioridade("Todas");
    setFiltroStatus("Todos");
    setFiltroDentista("Todos");
    setFiltroFaixaEtaria("Todas");
  };

  return (
    <div className="min-h-screen bg-[#fdfdfc]">
      <NavPlataformaInterna tipoUsuario="admin" />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div>
          <h1 className="text-3xl font-extrabold text-[#2f251f]">
            Dashboards administrativos
          </h1>

          <p className="mt-1 text-sm text-[#7c6f67]">
            Indicadores e gráficos do programa para apoiar decisões da coordenação.
          </p>
        </div>

        <section className="mt-6 rounded-2xl border border-[#e7dfd8] bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-[#f58200]" />
              <h2 className="font-bold text-[#2f251f]">Filtros</h2>
            </div>

            <button
              type="button"
              onClick={limparFiltros}
              className="flex items-center gap-2 text-sm text-[#7c6f67] transition hover:text-[#f58200]"
            >
              <RotateCcw className="h-4 w-4" />
              Limpar
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <label className="text-sm font-medium text-[#2f251f]">
              Origem
              <select
                value={filtroOrigem}
                onChange={(e) => setFiltroOrigem(e.target.value)}
                className="mt-2 h-11 w-full rounded-xl border border-[#ddd3cb] bg-white px-3 outline-none"
              >
                {origemOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>

            <label className="text-sm font-medium text-[#2f251f]">
              Prioridade
              <select
                value={filtroPrioridade}
                onChange={(e) => setFiltroPrioridade(e.target.value)}
                className="mt-2 h-11 w-full rounded-xl border border-[#ddd3cb] bg-white px-3 outline-none"
              >
                {prioridadeOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>

            <label className="text-sm font-medium text-[#2f251f]">
              Status
              <select
                value={filtroStatus}
                onChange={(e) => setFiltroStatus(e.target.value)}
                className="mt-2 h-11 w-full rounded-xl border border-[#ddd3cb] bg-white px-3 outline-none"
              >
                {statusOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>

            <label className="text-sm font-medium text-[#2f251f]">
              Dentista
              <select
                value={filtroDentista}
                onChange={(e) => setFiltroDentista(e.target.value)}
                className="mt-2 h-11 w-full rounded-xl border border-[#ddd3cb] bg-white px-3 outline-none"
              >
                {dentistaOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>

            <label className="text-sm font-medium text-[#2f251f]">
              Faixa etária
              <select
                value={filtroFaixaEtaria}
                onChange={(e) => setFiltroFaixaEtaria(e.target.value)}
                className="mt-2 h-11 w-full rounded-xl border border-[#ddd3cb] bg-white px-3 outline-none"
              >
                {faixaEtariaOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>

            <label className="text-sm font-medium text-[#2f251f]">
              Cadastro a partir de
              <input
                type="date"
                className="mt-2 h-11 w-full rounded-xl border border-[#ddd3cb] bg-white px-3 outline-none"
              />
            </label>

            <label className="text-sm font-medium text-[#2f251f]">
              Cadastro até
              <input
                type="date"
                className="mt-2 h-11 w-full rounded-xl border border-[#ddd3cb] bg-white px-3 outline-none"
              />
            </label>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-4">
          <article className="rounded-2xl border border-[#e7dfd8] bg-white p-5 shadow-sm">
            <p className="text-sm text-[#7c6f67]">Total de pacientes</p>
            <strong className="mt-2 block text-3xl font-extrabold text-[#f58200]">
              8
            </strong>
          </article>

          <article className="rounded-2xl border border-[#e7dfd8] bg-white p-5 shadow-sm">
            <p className="text-sm text-[#7c6f67]">Alta prioridade</p>
            <strong className="mt-2 block text-3xl font-extrabold text-red-500">
              3
            </strong>
          </article>

          <article className="rounded-2xl border border-[#e7dfd8] bg-white p-5 shadow-sm">
            <p className="text-sm text-[#7c6f67]">Concluídos</p>
            <strong className="mt-2 block text-3xl font-extrabold text-[#b5bb0f]">
              3
            </strong>
          </article>

          <article className="rounded-2xl border border-[#e7dfd8] bg-white p-5 shadow-sm">
            <p className="text-sm text-[#7c6f67]">Taxa de conclusão</p>
            <strong className="mt-2 block text-3xl font-extrabold text-[#2f251f]">
              37.5%
            </strong>
          </article>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-2">
          <DashboardCard
            title="Origem dos pacientes"
            description="Quem mais procura: triagem nas escolas vs. cadastro externo."
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={origemData} dataKey="value" nameKey="name" label>
                  <Cell fill={orange} />
                  <Cell fill={green} />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </DashboardCard>

          <DashboardCard title="Distribuição por faixa etária">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={faixaEtariaData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={11} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill={orange} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </DashboardCard>

          <DashboardCard title="Pacientes por prioridade">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={prioridadeData} dataKey="value" nameKey="name" label>
                  <Cell fill={red} />
                  <Cell fill={orange} />
                  <Cell fill={green} />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </DashboardCard>

          <DashboardCard title="Pacientes por status no funil">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" fontSize={11} width={110} />
                <Tooltip />
                <Bar dataKey="value" fill={green} radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </DashboardCard>

          <DashboardCard title="Carga de pacientes por dentista voluntário">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dentistaData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={11} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill={orange} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </DashboardCard>

          <DashboardCard title="Evolução de cadastros por mês">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={evolucaoData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={11} />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={orange}
                  strokeWidth={3}
                  dot
                />
              </LineChart>
            </ResponsiveContainer>
          </DashboardCard>

          <DashboardCard title="Perfil socioeconômico (renda familiar)">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rendaData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={11} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill={green} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </DashboardCard>

          <DashboardCard title="Escolas com mais encaminhamentos">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={escolasData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" fontSize={11} width={120} />
                <Tooltip />
                <Bar dataKey="value" fill={orange} radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </DashboardCard>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboards;
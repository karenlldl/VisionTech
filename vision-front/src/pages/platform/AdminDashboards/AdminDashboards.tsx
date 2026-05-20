import { useState, useEffect, useMemo } from "react";
import {
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
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

const evolucaoData = [{ name: "2025-03", value: 4 }, { name: "2025-04", value: 1 }, { name: "2026-04", value: 2 }, { name: "2026-05", value: 1 }];
const rendaData = [{ name: "Até R$ 1.000", value: 4 }, { name: "R$ 1.001 a 2.000", value: 4 }, { name: "Acima de R$ 2.000", value: 0 }];
const escolasData = [{ name: "ETEC", value: 3 }, { name: "E.M. Santos Dumont", value: 1 }, { name: "E.M. Monteiro Lobato", value: 1 }, { name: "E.M. Cecília Meireles", value: 1 }, { name: "E.M. Drummond", value: 1 }];
const faixaEtariaData = [{ name: "0-7 anos", value: 1 }, { name: "8-12 anos", value: 3 }, { name: "13-17 anos", value: 1 }, { name: "18+ anos", value: 3 }];
const origemData = [{ name: "Escolas", value: 7 }, { name: "Cadastro externo", value: 1 }];

const DashboardCard = ({ title, children, description }: { title: string; description?: string; children: React.ReactNode }) => (
  <section className="rounded-2xl border border-[#e7dfd8] bg-white p-5 shadow-sm">
    <h2 className="text-lg font-bold text-[#2f251f]">{title}</h2>
    {description && <p className="mt-2 text-xs text-[#7c6f67]">{description}</p>}
    <div className="mt-5 h-[260px]">{children}</div>
  </section>
);

const AdminDashboards = () => {
  const [pacientes, setPacientes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [nomeAdminLogado, setNomeAdminLogado] = useState("Carregando...");

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

  const traduzirPrioridade = (gravidade: number): string => {
    if (gravidade >= 4) return "Alta";
    if (gravidade === 3) return "Média";
    return "Baixa";
  };

  const traduzirStatus = (status: string | null, dentista: string | null): string => {
    if (!dentista || String(dentista).trim() === "") return "Sem dentista";
    if (!status) return "Aguardando";
    const s = String(status).toUpperCase().trim();
    if (s.includes("AGENDAD") || s.includes("AGUARD")) return "Aguardando";
    if (s.includes("ANDAMENTO") || s.includes("ATENDIMENTO")) return "Em atendimento";
    if (s.includes("FINALIZAD") || s.includes("CONCLUID") || s.includes("COMPLETO")) return "Concluído";
    return "Aguardando";
  };

  useEffect(() => {
    const buscarDados = async () => {
      try {
        const idLogado = localStorage.getItem("idUsuarioLogado") || "11";
        try {
          const resAdmin = await fetch(`http://localhost:8081/funcionarios/${idLogado}`);
          if (resAdmin.ok) {
            const adminData = await resAdmin.json();
            setNomeAdminLogado(adminData.nome || "Administrador");
          } else {
            setNomeAdminLogado("Administrador");
          }
        } catch {
          setNomeAdminLogado("Administrador");
        }

        const res = await fetch("http://localhost:8081/pacientes/painel-admin");
        if (res.ok) {
          const json = await res.json();
          const formatados = json.map((item: any) => {
            const dentista = item.dentista || item.nmDentista || null;
            const statusRaw = item.status || item.stStatusAtendimento || null;
            return {
              id: item.id || item.idPaciente,
              dentista: dentista,
              status: traduzirStatus(statusRaw, dentista),
              prioridade: traduzirPrioridade(item.gravidade),
              origem: "Escola" 
            };
          });
          setPacientes(formatados);
        }
      } catch (error) {
        console.error("Erro ao buscar dados para dashboards:", error);
      } finally {
        setLoading(false);
      }
    };
    buscarDados();
  }, []);

  const pacientesFiltrados = useMemo(() => {
    return pacientes.filter(p => {
      const matchPrioridade = filtroPrioridade === "Todas" || p.prioridade === filtroPrioridade;
      const matchStatus = filtroStatus === "Todos" || p.status === filtroStatus;
      const matchOrigem = filtroOrigem === "Todas" || p.origem === filtroOrigem;
      return matchPrioridade && matchStatus && matchOrigem;
    });
  }, [pacientes, filtroPrioridade, filtroStatus, filtroOrigem]);

  const estatisticas = useMemo(() => {
    const counts = {
      prioridade: { Alta: 0, Média: 0, Baixa: 0 },
      status: { "Sem dentista": 0, Aguardando: 0, "Em atendimento": 0, Concluído: 0 },
      dentista: {} as Record<string, number>
    };

    pacientesFiltrados.forEach(p => {
      if (counts.prioridade[p.prioridade as keyof typeof counts.prioridade] !== undefined) {
        counts.prioridade[p.prioridade as keyof typeof counts.prioridade]++;
      }
      if (counts.status[p.status as keyof typeof counts.status] !== undefined) {
        counts.status[p.status as keyof typeof counts.status]++;
      }
      if (p.dentista) {
        counts.dentista[p.dentista] = (counts.dentista[p.dentista] || 0) + 1;
      }
    });

    return {
      prioridadeData: Object.keys(counts.prioridade).map(key => ({ name: key, value: counts.prioridade[key as keyof typeof counts.prioridade] })),
      statusData: Object.keys(counts.status).map(key => ({ name: key, value: counts.status[key as keyof typeof counts.status] })),
      dentistaData: Object.keys(counts.dentista).map(key => ({ name: key, value: counts.dentista[key] })),
      total: pacientesFiltrados.length,
      altaPrioridade: counts.prioridade.Alta,
      concluidos: counts.status.Concluído,
      taxaConclusao: pacientesFiltrados.length > 0 ? ((counts.status.Concluído / pacientesFiltrados.length) * 100).toFixed(1) : "0.0"
    };
  }, [pacientesFiltrados]);

  return (
    <div className="min-h-screen bg-[#fdfdfc]">
      <NavPlataformaInterna tipoUsuario="admin" nomeUsuario={nomeAdminLogado} />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div>
          <h1 className="text-3xl font-extrabold text-[#2f251f]">Dashboards administrativos</h1>
          <p className="mt-1 text-sm text-[#7c6f67]">Indicadores e gráficos reais conectados ao Oracle.</p>
        </div>

        <section className="mt-6 rounded-2xl border border-[#e7dfd8] bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-[#f58200]" />
              <h2 className="font-bold text-[#2f251f]">Filtros</h2>
            </div>
            <button type="button" onClick={limparFiltros} className="flex items-center gap-2 text-sm text-[#7c6f67] transition hover:text-[#f58200]">
              <RotateCcw className="h-4 w-4" /> Limpar
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <label className="text-sm font-medium text-[#2f251f]">Origem<select value={filtroOrigem} onChange={(e) => setFiltroOrigem(e.target.value)} className="mt-2 h-11 w-full rounded-xl border border-[#ddd3cb] bg-white px-3 outline-none">{origemOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
            <label className="text-sm font-medium text-[#2f251f]">Prioridade<select value={filtroPrioridade} onChange={(e) => setFiltroPrioridade(e.target.value)} className="mt-2 h-11 w-full rounded-xl border border-[#ddd3cb] bg-white px-3 outline-none">{prioridadeOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
            <label className="text-sm font-medium text-[#2f251f]">Status<select value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)} className="mt-2 h-11 w-full rounded-xl border border-[#ddd3cb] bg-white px-3 outline-none">{statusOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
            <label className="text-sm font-medium text-[#2f251f]">Dentista (MOCK)<select value={filtroDentista} onChange={(e) => setFiltroDentista(e.target.value)} className="mt-2 h-11 w-full rounded-xl border border-[#ddd3cb] bg-white px-3 outline-none">{dentistaOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
            <label className="text-sm font-medium text-[#2f251f]">Faixa etária (MOCK)<select value={filtroFaixaEtaria} onChange={(e) => setFiltroFaixaEtaria(e.target.value)} className="mt-2 h-11 w-full rounded-xl border border-[#ddd3cb] bg-white px-3 outline-none">{faixaEtariaOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
          </div>
        </section>

        {loading && <p className="mt-4 text-sm text-[#f58200]">Processando métricas...</p>}

        {!loading && (
          <>
            <section className="mt-6 grid gap-4 md:grid-cols-4">
              <article className="rounded-2xl border border-[#e7dfd8] bg-white p-5 shadow-sm"><p className="text-sm text-[#7c6f67]">Total de pacientes filtrados</p><strong className="mt-2 block text-3xl font-extrabold text-[#f58200]">{estatisticas.total}</strong></article>
              <article className="rounded-2xl border border-[#e7dfd8] bg-white p-5 shadow-sm"><p className="text-sm text-[#7c6f67]">Alta prioridade</p><strong className="mt-2 block text-3xl font-extrabold text-red-500">{estatisticas.altaPrioridade}</strong></article>
              <article className="rounded-2xl border border-[#e7dfd8] bg-white p-5 shadow-sm"><p className="text-sm text-[#7c6f67]">Concluídos</p><strong className="mt-2 block text-3xl font-extrabold text-[#b5bb0f]">{estatisticas.concluidos}</strong></article>
              <article className="rounded-2xl border border-[#e7dfd8] bg-white p-5 shadow-sm"><p className="text-sm text-[#7c6f67]">Taxa de conclusão real</p><strong className="mt-2 block text-3xl font-extrabold text-[#2f251f]">{estatisticas.taxaConclusao}%</strong></article>
            </section>

            <section className="mt-6 grid gap-6 lg:grid-cols-2">
              <DashboardCard title="Origem dos pacientes" description="MOCK: Requer query no backend."><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={origemData} dataKey="value" nameKey="name" label><Cell fill={orange} /><Cell fill={green} /></Pie><Tooltip /></PieChart></ResponsiveContainer></DashboardCard>
              <DashboardCard title="Distribuição por faixa etária" description="MOCK: Requer data de nascimento no backend."><ResponsiveContainer width="100%" height="100%"><BarChart data={faixaEtariaData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" fontSize={11} /><YAxis /><Tooltip /><Bar dataKey="value" fill={orange} radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer></DashboardCard>
              <DashboardCard title="Pacientes por prioridade"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={estatisticas.prioridadeData} dataKey="value" nameKey="name" label><Cell fill={red} /><Cell fill={orange} /><Cell fill={green} /></Pie><Tooltip /></PieChart></ResponsiveContainer></DashboardCard>
              <DashboardCard title="Pacientes por status no funil"><ResponsiveContainer width="100%" height="100%"><BarChart data={estatisticas.statusData} layout="vertical"><CartesianGrid strokeDasharray="3 3" /><XAxis type="number" /><YAxis dataKey="name" type="category" fontSize={11} width={110} /><Tooltip /><Bar dataKey="value" fill={green} radius={[0, 6, 6, 0]} /></BarChart></ResponsiveContainer></DashboardCard>
              <DashboardCard title="Carga de pacientes por dentista voluntário"><ResponsiveContainer width="100%" height="100%"><BarChart data={estatisticas.dentistaData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" fontSize={11} /><YAxis /><Tooltip /><Bar dataKey="value" fill={orange} radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer></DashboardCard>
              <DashboardCard title="Evolução de cadastros por mês" description="MOCK: Requer data de cadastro no backend."><ResponsiveContainer width="100%" height="100%"><LineChart data={evolucaoData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" fontSize={11} /><YAxis /><Tooltip /><Line type="monotone" dataKey="value" stroke={orange} strokeWidth={3} dot /></LineChart></ResponsiveContainer></DashboardCard>
              <DashboardCard title="Perfil socioeconômico (renda familiar)" description="MOCK: Requer coleta de renda no backend."><ResponsiveContainer width="100%" height="100%"><BarChart data={rendaData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" fontSize={11} /><YAxis /><Tooltip /><Bar dataKey="value" fill={green} radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer></DashboardCard>
              <DashboardCard title="Escolas com mais encaminhamentos" description="MOCK: Requer coleta da escola no backend."><ResponsiveContainer width="100%" height="100%"><BarChart data={escolasData} layout="vertical"><CartesianGrid strokeDasharray="3 3" /><XAxis type="number" /><YAxis dataKey="name" type="category" fontSize={11} width={120} /><Tooltip /><Bar dataKey="value" fill={orange} radius={[0, 6, 6, 0]} /></BarChart></ResponsiveContainer></DashboardCard>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default AdminDashboards;
import { useState, useEffect, useMemo } from "react";
import {
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import { Filter, RotateCcw } from "lucide-react";
import NavPlataformaInterna from "../../../components/platform/NavPlataformaInterna/NavPlataformaInterna";

const orange = "#f58200";
const green = "#b5bb0f";
const red = "#ef4444";

const origemOptions = ["Todas", "Escola", "Externo"];
const prioridadeOptions = ["Todas", "Baixa", "Média", "Alta"];
const statusOptions = ["Todos", "Sem dentista", "Aguardando", "Em atendimento", "Concluído"];
const faixaEtariaOptions = ["Todas", "0-7 anos", "8-12 anos", "13-17 anos", "18+ anos"];

const evolucaoDataMock = [{ name: "2025-03", value: 4 }, { name: "2025-04", value: 1 }, { name: "2026-04", value: 2 }, { name: "2026-05", value: 1 }];

const DashboardCard = ({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) => (
  <section className="rounded-2xl border border-[#e7dfd8] bg-white p-5 shadow-sm">
    <h2 className="text-lg font-bold text-[#2f251f]">{title}</h2>
    {description && <p className="mt-2 text-xs text-[#7c6f67]">{description}</p>}
    <div className="mt-5 h-[260px]">{children}</div>
  </section>
);

const AdminDashboards = () => {
  const [pacientes, setPacientes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [nomeAdminLogado, setNomeAdminLogado] = useState("Administrador");

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
        const API_URL = import.meta.env.VITE_API_URL || "https://vision-xs85.onrender.com";
        const idLogado = localStorage.getItem("idUsuarioLogado") || "11";
        
        const resAdmin = await fetch(`${API_URL}/funcionarios/${idLogado}`).catch(() => null);
        if (resAdmin && resAdmin.ok) {
            const adminData = await resAdmin.json();
            setNomeAdminLogado(adminData?.nome || "Administrador");
        }

        const [resPainel, resGeral] = await Promise.all([
          fetch(`${API_URL}/pacientes/painel-admin`).catch(() => null),
          fetch(`${API_URL}/pacientes`).catch(() => null)
        ]);

        if (resPainel && resPainel.ok && resGeral && resGeral.ok) {
          const painelJson = await resPainel.json();
          const geralJson = await resGeral.json();

          const mapRenda = new Map();
          if (Array.isArray(geralJson)) {
            geralJson.forEach((p: any) => mapRenda.set(p.id, p.rendaMedia || 0));
          }

          if (Array.isArray(painelJson)) {
            const formatados = painelJson.map((item: any) => {
              const dentista = item.dentista || item.nmDentista || null;
              const statusRaw = item.status || item.stStatusAtendimento || null;
              const escola = item.escola || "Cadastro Externo";
              const isExterno = escola.toLowerCase().includes("externo");
              
              return {
                id: item.id || item.idPaciente,
                dentista: dentista,
                idade: item.idade || 0,
                escola: escola,
                rendaMedia: mapRenda.get(item.id || item.idPaciente) || 0,
                status: traduzirStatus(statusRaw, dentista),
                prioridade: traduzirPrioridade(item.gravidade),
                origem: isExterno ? "Externo" : "Escola"
              };
            });
            setPacientes(formatados);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar dados reais para dashboards:", error);
      } finally {
        setLoading(false);
      }
    };
    buscarDados();
  }, []);

  const dentistasDisponiveis = useMemo(() => {
    const setDentistas = new Set(pacientes.map(p => p.dentista).filter(Boolean));
    return ["Todos", "Sem dentista", ...Array.from(setDentistas)];
  }, [pacientes]);

  const pacientesFiltrados = useMemo(() => {
    return pacientes.filter(p => {
      const matchOrigem = filtroOrigem === "Todas" || p.origem === filtroOrigem;
      const matchPrioridade = filtroPrioridade === "Todas" || p.prioridade === filtroPrioridade;
      const matchStatus = filtroStatus === "Todos" || p.status === filtroStatus;
      const matchDentista = filtroDentista === "Todos" || p.dentista === filtroDentista || (filtroDentista === "Sem dentista" && !p.dentista);

      let matchFaixa = true;
      if (filtroFaixaEtaria === "0-7 anos") matchFaixa = p.idade >= 0 && p.idade <= 7;
      if (filtroFaixaEtaria === "8-12 anos") matchFaixa = p.idade >= 8 && p.idade <= 12;
      if (filtroFaixaEtaria === "13-17 anos") matchFaixa = p.idade >= 13 && p.idade <= 17;
      if (filtroFaixaEtaria === "18+ anos") matchFaixa = p.idade >= 18;

      return matchOrigem && matchPrioridade && matchStatus && matchDentista && matchFaixa;
    });
  }, [pacientes, filtroOrigem, filtroPrioridade, filtroStatus, filtroDentista, filtroFaixaEtaria]);

  const charts = useMemo(() => {
    const counts = {
      prioridade: { Alta: 0, Média: 0, Baixa: 0 },
      status: { "Sem dentista": 0, Aguardando: 0, "Em atendimento": 0, Concluído: 0 },
      dentista: {} as Record<string, number>,
      origem: { "Escolas": 0, "Cadastro externo": 0 },
      escolas: {} as Record<string, number>,
      renda: { "Até R$ 1.000": 0, "R$ 1.001 a 2.000": 0, "Acima de R$ 2.000": 0 },
      faixa: { "0-7 anos": 0, "8-12 anos": 0, "13-17 anos": 0, "18+ anos": 0 }
    };

    pacientesFiltrados.forEach(p => {
      if (counts.prioridade[p.prioridade as keyof typeof counts.prioridade] !== undefined) counts.prioridade[p.prioridade as keyof typeof counts.prioridade]++;
      if (counts.status[p.status as keyof typeof counts.status] !== undefined) counts.status[p.status as keyof typeof counts.status]++;
      
      if (p.dentista) counts.dentista[p.dentista] = (counts.dentista[p.dentista] || 0) + 1;

      if (p.origem === "Externo") counts.origem["Cadastro externo"]++;
      else {
        counts.origem["Escolas"]++;
        counts.escolas[p.escola] = (counts.escolas[p.escola] || 0) + 1;
      }

      if (p.rendaMedia <= 1000) counts.renda["Até R$ 1.000"]++;
      else if (p.rendaMedia <= 2000) counts.renda["R$ 1.001 a 2.000"]++;
      else counts.renda["Acima de R$ 2.000"]++;

      if (p.idade <= 7) counts.faixa["0-7 anos"]++;
      else if (p.idade <= 12) counts.faixa["8-12 anos"]++;
      else if (p.idade <= 17) counts.faixa["13-17 anos"]++;
      else counts.faixa["18+ anos"]++;
    });

    const topEscolas = Object.keys(counts.escolas)
      .map(k => ({ name: k, value: counts.escolas[k] }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);

    return {
      prioridade: Object.keys(counts.prioridade).map(k => ({ name: k, value: counts.prioridade[k as keyof typeof counts.prioridade] })),
      status: Object.keys(counts.status).map(k => ({ name: k, value: counts.status[k as keyof typeof counts.status] })),
      dentista: Object.keys(counts.dentista).map(k => ({ name: k, value: counts.dentista[k] })),
      origem: Object.keys(counts.origem).map(k => ({ name: k, value: counts.origem[k as keyof typeof counts.origem] })),
      renda: Object.keys(counts.renda).map(k => ({ name: k, value: counts.renda[k as keyof typeof counts.renda] })),
      faixa: Object.keys(counts.faixa).map(k => ({ name: k, value: counts.faixa[k as keyof typeof counts.faixa] })),
      escolas: topEscolas,
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

          <div className="grid gap-4 md:grid-cols-5">
            <label className="text-sm font-medium text-[#2f251f]">Origem
              <select value={filtroOrigem} onChange={(e) => setFiltroOrigem(e.target.value)} className="mt-2 h-11 w-full rounded-xl border border-[#ddd3cb] bg-white px-3 outline-none">{origemOptions.map(o => <option key={o}>{o}</option>)}</select>
            </label>
            <label className="text-sm font-medium text-[#2f251f]">Prioridade
              <select value={filtroPrioridade} onChange={(e) => setFiltroPrioridade(e.target.value)} className="mt-2 h-11 w-full rounded-xl border border-[#ddd3cb] bg-white px-3 outline-none">{prioridadeOptions.map(o => <option key={o}>{o}</option>)}</select>
            </label>
            <label className="text-sm font-medium text-[#2f251f]">Status
              <select value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)} className="mt-2 h-11 w-full rounded-xl border border-[#ddd3cb] bg-white px-3 outline-none">{statusOptions.map(o => <option key={o}>{o}</option>)}</select>
            </label>
            <label className="text-sm font-medium text-[#2f251f]">Dentista
              <select value={filtroDentista} onChange={(e) => setFiltroDentista(e.target.value)} className="mt-2 h-11 w-full rounded-xl border border-[#ddd3cb] bg-white px-3 outline-none">{dentistasDisponiveis.map(o => <option key={o as string}>{o as string}</option>)}</select>
            </label>
            <label className="text-sm font-medium text-[#2f251f]">Faixa etária
              <select value={filtroFaixaEtaria} onChange={(e) => setFiltroFaixaEtaria(e.target.value)} className="mt-2 h-11 w-full rounded-xl border border-[#ddd3cb] bg-white px-3 outline-none">{faixaEtariaOptions.map(o => <option key={o}>{o}</option>)}</select>
            </label>
          </div>
        </section>

        {loading ? (
          <p className="mt-6 text-center text-sm font-semibold text-[#f58200]">Processando cruzamento de dados do Oracle...</p>
        ) : (
          <>
            <section className="mt-6 grid gap-4 md:grid-cols-4">
              <article className="rounded-2xl border border-[#e7dfd8] bg-white p-5 shadow-sm"><p className="text-sm text-[#7c6f67]">Total de pacientes filtrados</p><strong className="mt-2 block text-3xl font-extrabold text-[#f58200]">{charts.total}</strong></article>
              <article className="rounded-2xl border border-[#e7dfd8] bg-white p-5 shadow-sm"><p className="text-sm text-[#7c6f67]">Alta prioridade</p><strong className="mt-2 block text-3xl font-extrabold text-red-500">{charts.altaPrioridade}</strong></article>
              <article className="rounded-2xl border border-[#e7dfd8] bg-white p-5 shadow-sm"><p className="text-sm text-[#7c6f67]">Concluídos</p><strong className="mt-2 block text-3xl font-extrabold text-[#b5bb0f]">{charts.concluidos}</strong></article>
              <article className="rounded-2xl border border-[#e7dfd8] bg-white p-5 shadow-sm"><p className="text-sm text-[#7c6f67]">Taxa de conclusão real</p><strong className="mt-2 block text-3xl font-extrabold text-[#2f251f]">{charts.taxaConclusao}%</strong></article>
            </section>

            <section className="mt-6 grid gap-6 lg:grid-cols-2">
              <DashboardCard title="Origem dos pacientes">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart><Pie data={charts.origem} dataKey="value" nameKey="name" label><Cell fill={orange} /><Cell fill={green} /></Pie><Tooltip /></PieChart>
                </ResponsiveContainer>
              </DashboardCard>

              <DashboardCard title="Distribuição por faixa etária">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={charts.faixa}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" fontSize={11} /><YAxis /><Tooltip /><Bar dataKey="value" fill={orange} radius={[6, 6, 0, 0]} /></BarChart>
                </ResponsiveContainer>
              </DashboardCard>

              <DashboardCard title="Pacientes por prioridade">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart><Pie data={charts.prioridade} dataKey="value" nameKey="name" label><Cell fill={red} /><Cell fill={orange} /><Cell fill={green} /></Pie><Tooltip /></PieChart>
                </ResponsiveContainer>
              </DashboardCard>

              <DashboardCard title="Pacientes por status no funil">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={charts.status} layout="vertical"><CartesianGrid strokeDasharray="3 3" /><XAxis type="number" /><YAxis dataKey="name" type="category" fontSize={11} width={110} /><Tooltip /><Bar dataKey="value" fill={green} radius={[0, 6, 6, 0]} /></BarChart>
                </ResponsiveContainer>
              </DashboardCard>

              <DashboardCard title="Carga de pacientes por dentista voluntário">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={charts.dentista}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" fontSize={11} /><YAxis /><Tooltip /><Bar dataKey="value" fill={orange} radius={[6, 6, 0, 0]} /></BarChart>
                </ResponsiveContainer>
              </DashboardCard>

              <DashboardCard title="Perfil socioeconômico (Renda Familiar Per Capita)">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={charts.renda}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" fontSize={11} /><YAxis /><Tooltip /><Bar dataKey="value" fill={green} radius={[6, 6, 0, 0]} /></BarChart>
                </ResponsiveContainer>
              </DashboardCard>

              <DashboardCard title="Top 5 Escolas com mais encaminhamentos">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={charts.escolas} layout="vertical"><CartesianGrid strokeDasharray="3 3" /><XAxis type="number" /><YAxis dataKey="name" type="category" fontSize={11} width={150} /><Tooltip /><Bar dataKey="value" fill={orange} radius={[0, 6, 6, 0]} /></BarChart>
                </ResponsiveContainer>
              </DashboardCard>

              <DashboardCard title="Evolução de cadastros por mês" description="MOCK: O banco de dados atual não possui uma coluna de 'Data de Cadastro' para traçar essa linha do tempo de forma real.">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={evolucaoDataMock}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" fontSize={11} /><YAxis /><Tooltip /><Line type="monotone" dataKey="value" stroke={orange} strokeWidth={3} dot /></LineChart>
                </ResponsiveContainer>
              </DashboardCard>

            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default AdminDashboards;
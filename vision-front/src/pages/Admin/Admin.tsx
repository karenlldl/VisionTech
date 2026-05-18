import { useMemo, useState, useEffect, useCallback } from "react";
import { Search, MessageSquare, X } from "lucide-react";
import NavPlataformaInterna from "../../components/NavPlataformaInterna/NavPlataformaInterna";

const Admin = () => {
  const [pacientes, setPacientes] = useState<any[]>([]);
  const [listaDentistas, setListaDentistas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [nomeAdminLogado, setNomeAdminLogado] = useState("Carregando...");

  const [busca, setBusca] = useState("");
  const [filtroOrigem, setFiltroOrigem] = useState("Todas");
  const [filtroPrioridade, setFiltroPrioridade] = useState("Todas");
  const [filtroStatus, setFiltroStatus] = useState("Todos");
  const [filtroProjeto, setFiltroProjeto] = useState("Todos");
  const [pacienteSelecionado, setPacienteSelecionado] = useState<any>(null);

  const [modalAgenda, setModalAgenda] = useState<any>(null);
  const [dentistaSelecionado, setDentistaSelecionado] = useState("");

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

  const buscarDados = useCallback(async () => {
    try {
      setLoading(true);

      // EXTRACT DINÂMICO DO LOGIN
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

      const resPacientes = await fetch("http://localhost:8081/pacientes/painel-admin");
      let dadosPacientes: any[] = []; 
      
      if (resPacientes.ok) {
        const json = await resPacientes.json();
        dadosPacientes = json.map((item: any) => {
          const nomeDentistaStr = item.dentista || item.nmDentista || null;
          const statusStr = item.status || item.stStatusAtendimento || null;

          return {
            id: item.id || item.idPaciente,
            idAtendimento: item.idAtendimento,
            nome: item.nome || item.nmPaciente || "Paciente Sem Nome",
            idade: 14, 
            origem: "Triagem Escola",
            projeto: "Dentistas do Bem",
            prioridade: traduzirPrioridade(item.gravidade),
            status: traduzirStatus(statusStr, nomeDentistaStr),
            dentista: nomeDentistaStr,
            observacao: item.observacao || item.dsDescricaoProcedimento || "Nenhuma observation registrada.",
            dataConsulta: "22/05/2026",
            horarioConsulta: "11:00"
          };
        });
      }

      const resDentistas = await fetch("http://localhost:8081/dentistas");
      let dadosDentistas: any[] = []; 
      if (resDentistas.ok) {
        const jsonDentistas = await resDentistas.json();
        dadosDentistas = jsonDentistas.map((d: any) => ({
          id: d.id || d.idMedico || 24,
          nome: d.nome || d.nmDentista || "Dentista Acadêmico"
        }));
      }

      setPacientes(dadosPacientes);
      setListaDentistas(dadosDentistas);
    } catch (error) {
      console.error("Erro na integração com o Quarkus:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    buscarDados();
  }, [buscarDados]);

  const pacientesFiltrados = useMemo(() => {
    return pacientes.filter((paciente) => {
      const matchBusca = (paciente.nome || "").toLowerCase().includes(busca.toLowerCase());
      const matchOrigem = filtroOrigem === "Todas" || (filtroOrigem === "Escola" && paciente.origem !== "Externo") || (filtroOrigem === "Externo" && paciente.origem === "Externo");
      const matchPrioridade = filtroPrioridade === "Todas" || paciente.prioridade === filtroPrioridade;
      const matchStatus = filtroStatus === "Todos" || paciente.status === filtroStatus;
      const matchProjeto = filtroProjeto === "Todos" || paciente.projeto === filtroProjeto;
      return matchBusca && matchOrigem && matchPrioridade && matchStatus && matchProjeto;
    });
  }, [pacientes, busca, filtroOrigem, filtroPrioridade, filtroStatus, filtroProjeto]);

  const alterarPrioridade = (id: number, prioridade: string) => {
    setPacientes((prev) => prev.map((paciente) => (paciente.id === id ? { ...paciente, prioridade } : paciente)));
  };

  const confirmarAgendamento = async () => {
    if (!modalAgenda || !dentistaSelecionado) {
      alert("Por favor, selecione um dentista voluntário.");
      return;
    }
    try {
      const response = await fetch(`http://localhost:8081/pacientes/${modalAgenda.idAtendimento}/atribuir-medico/${dentistaSelecionado}`, { method: "PUT" });
      if (!response.ok) throw new Error("Erro ao atualizar o vínculo no banco.");
      alert("Dentista atribuído com sucesso!");
      setModalAgenda(null);
      setDentistaSelecionado("");
      buscarDados(); 
    } catch (err: any) {
      alert("Erro ao salvar atribuição: " + err.message);
    }
  };

  const totalPacientes = pacientes.length;
  const semDentista = pacientes.filter((p) => p.status === "Sem dentista").length;
  const aguardando = pacientes.filter((p) => p.status === "Aguardando").length;
  const emAtendimento = pacientes.filter((p) => p.status === "Em atendimento").length;
  const concluidos = pacientes.filter((p) => p.status === "Concluído").length;

  const statusStyle = { "Sem dentista": "bg-gray-100 text-gray-700", Aguardando: "bg-orange-100 text-orange-700", "Em atendimento": "bg-purple-100 text-purple-700", Concluído: "bg-green-100 text-green-700" };
  const prioridadeStyle = { Baixa: "bg-green-100 text-green-700 border border-green-200", Média: "bg-yellow-100 text-yellow-700 border border-yellow-200", Alta: "bg-red-100 text-red-700 border border-red-200" };
  const getStatusStyle = (status: string) => statusStyle[status as keyof typeof statusStyle] || statusStyle["Sem dentista"];
  const getPrioridadeStyle = (prioridade: string) => prioridadeStyle[prioridade as keyof typeof prioridadeStyle] || prioridadeStyle["Média"];

  return (
    <div className="min-h-screen bg-[#fdfdfc]">
      <NavPlataformaInterna tipoUsuario="admin" nomeUsuario={nomeAdminLogado} />
      <main className="mx-auto max-w-7xl px-6 py-8">
        <div>
          <h1 className="text-4xl font-bold text-[#2f251f]">Painel de controle</h1>
          <p className="mt-1 text-[#7c6f67]">Gerencie pacientes e acompanhe o processo de atendimento real do Oracle.</p>
        </div>

        <section className="mt-8 grid gap-4 md:grid-cols-5">
          <div className="rounded-2xl border border-[#e7dfd8] bg-white p-5 text-center shadow-sm"><h2 className="text-4xl font-bold text-[#2f251f]">{totalPacientes}</h2><p className="mt-1 text-sm text-[#7c6f67]">Total</p></div>
          <div className="rounded-2xl border border-[#e7dfd8] bg-white p-5 text-center shadow-sm"><h2 className="text-4xl font-bold text-gray-500">{semDentista}</h2><p className="mt-1 text-sm text-[#7c6f67]">Sem dentista</p></div>
          <div className="rounded-2xl border border-[#e7dfd8] bg-white p-5 text-center shadow-sm"><h2 className="text-4xl font-bold text-[#f58200]">{aguardando}</h2><p className="mt-1 text-sm text-[#7c6f67]">Aguardando</p></div>
          <div className="rounded-2xl border border-[#e7dfd8] bg-white p-5 text-center shadow-sm"><h2 className="text-4xl font-bold text-[#8b5cf6]">{emAtendimento}</h2><p className="mt-1 text-sm text-[#7c6f67]">Em atendimento</p></div>
          <div className="rounded-2xl border border-[#e7dfd8] bg-white p-5 text-center shadow-sm"><h2 className="text-4xl font-bold text-[#22c55e]">{concluidos}</h2><p className="mt-1 text-sm text-[#7c6f67]">Concluídos</p></div>
        </section>

        <section className="mt-8 flex flex-col gap-4 lg:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7c6f67]" />
            <input type="text" placeholder="Buscar por nome..." value={busca} onChange={(e) => setBusca(e.target.value)} className="h-12 w-full rounded-xl border border-[#ddd3cb] bg-white pl-11 pr-4 outline-none transition focus:border-[#f58200]" />
          </div>
          <select value={filtroOrigem} onChange={(e) => setFiltroOrigem(e.target.value)} className="h-12 rounded-xl border border-[#ddd3cb] bg-white px-4 outline-none"><option>Todas</option><option>Escola</option><option>Externo</option></select>
          <select value={filtroProjeto} onChange={(e) => setFiltroProjeto(e.target.value)} className="h-12 rounded-xl border border-[#ddd3cb] bg-white px-4 outline-none"><option>Todos</option><option>Dentistas do Bem</option><option>Apolônias do Bem</option></select>
          <select value={filtroPrioridade} onChange={(e) => setFiltroPrioridade(e.target.value)} className="h-12 rounded-xl border border-[#ddd3cb] bg-white px-4 outline-none"><option>Todas</option><option>Baixa</option><option>Média</option><option>Alta</option></select>
          <select value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)} className="h-12 rounded-xl border border-[#ddd3cb] bg-white px-4 outline-none"><option>Todos</option><option>Sem dentista</option><option>Aguardando</option><option>Em atendimento</option><option>Concluído</option></select>
        </section>

        <section className="mt-8 flex flex-col gap-4">
          {loading && <p className="text-sm text-[#7c6f67]">Sincronizando dados...</p>}
          {!loading && pacientesFiltrados.map((paciente) => (
            <div key={paciente.id} className="flex flex-col gap-6 rounded-2xl border border-[#e7dfd8] bg-white p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-2xl font-bold text-[#2f251f]">{paciente.nome}</h2>
                  <span className="text-[#7c6f67]">({paciente.idade} anos)</span>
                  <span className="rounded-full bg-[#f6f1ec] px-3 py-1 text-sm text-[#7c6f67]">{paciente.origem}</span>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className={`rounded-full px-3 py-1 text-sm font-semibold ${getStatusStyle(paciente.status)}`}>{paciente.status}</span>
                  <span className={`rounded-full px-3 py-1 text-sm font-semibold ${getPrioridadeStyle(paciente.prioridade)}`}>{paciente.prioridade}</span>
                  {paciente.dentista && <span className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-700">Dentista: {paciente.dentista}</span>}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <select value={paciente.prioridade} onChange={(e) => alterarPrioridade(paciente.id, e.target.value)} className="h-11 rounded-xl border border-[#ddd3cb] bg-white px-4 outline-none"><option>Baixa</option><option>Média</option><option>Alta</option></select>
                <button onClick={() => setModalAgenda(paciente)} className="h-11 rounded-xl border border-[#ddd3cb] bg-white px-5 font-medium transition hover:bg-[#f6f1ec]">{paciente.dentista ? "Mudar Vínculo" : "Atribuir Dentista"}</button>
                <button onClick={() => setPacienteSelecionado(paciente)} className="flex h-11 items-center gap-2 rounded-xl border border-[#ddd3cb] px-5 font-medium transition hover:bg-[#f6f1ec]"><MessageSquare className="h-4 w-4" /> Detalhes</button>
              </div>
            </div>
          ))}
        </section>
      </main>

      {pacienteSelecionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-2xl rounded-3xl bg-white p-7 shadow-2xl">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3"><h2 className="text-3xl font-bold text-[#2f251f]">{pacienteSelecionado.nome}</h2><span className={`rounded-full px-3 py-1 text-sm font-semibold ${getStatusStyle(pacienteSelecionado.status)}`}>{pacienteSelecionado.status}</span></div>
              <button onClick={() => setPacienteSelecionado(null)}><X className="h-5 w-5 text-[#7c6f67]" /></button>
            </div>
            <div className="mt-6 grid gap-4 text-[#4d4039] md:grid-cols-2"><p><strong>Idade:</strong> {pacienteSelecionado.idade} anos</p><p><strong>Origem:</strong> {pacienteSelecionado.origem}</p><p><strong>Dentista Responsável:</strong> {pacienteSelecionado.dentista || "Não atribuído"}</p><p><strong>Projeto amarrado:</strong> {pacienteSelecionado.projeto}</p></div>
            <div className="mt-6"><h3 className="font-semibold text-[#2f251f]">Histórico de Observações Médicas</h3><div className="mt-2 rounded-2xl bg-[#f6f1ec] p-4 text-[#5f534c] font-mono text-sm">{pacienteSelecionado.observacao}</div></div>
          </div>
        </div>
      )}

      {modalAgenda && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-xl rounded-3xl bg-white p-7 shadow-2xl">
            <div className="flex items-center justify-between"><div><h2 className="text-3xl font-bold text-[#2f251f]">Atribuir Profissional</h2><p className="mt-1 text-[#7c6f67]">Paciente: {modalAgenda.nome}</p></div><button onClick={() => setModalAgenda(null)}><X className="h-5 w-5 text-[#7c6f67]" /></button></div>
            <div className="mt-6"><label className="text-sm font-semibold text-[#2f251f]">Selecione um Dentista Voluntário</label><select value={dentistaSelecionado} onChange={(e) => setDentistaSelecionado(e.target.value)} className="mt-2 h-12 w-full rounded-xl border border-[#ddd3cb] px-4 outline-none"><option value="">Selecione o profissional...</option>{listaDentistas.map((d) => <option key={d.id} value={d.id}>{d.nome}</option>)}</select></div>
            <button onClick={confirmarAgendamento} className="mt-8 h-12 w-full rounded-xl bg-[#f58200] font-bold text-white transition hover:bg-[#ff9d33]">Salvar Vínculo no Oracle</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
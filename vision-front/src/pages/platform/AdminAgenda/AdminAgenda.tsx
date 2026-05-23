import { useEffect, useState, useCallback } from "react";
import { Plus, X, CalendarDays, Clock } from "lucide-react";
import NavPlataformaInterna from "../../../components/platform/NavPlataformaInterna/NavPlataformaInterna";
import AgendaSemanal from "../../../components/platform/Agenda/AgendaSemanal";

interface EventoFront {
  id: number;
  paciente: string;
  dentista: string;
  dia: string;
  horario: string;
  status: string;
  prioridade: string;
}

const AdminAgenda = () => {
  const [eventos, setEventos] = useState<EventoFront[]>([]);
  const [loading, setLoading] = useState(true);
  const [nomeAdminLogado, setNomeAdminLogado] = useState("Carregando...");

  const [modalAberto, setModalAberto] = useState(false);
  const [listaPacientes, setListaPacientes] = useState<any[]>([]);
  const [listaDentistas, setListaDentistas] = useState<any[]>([]);
  const [pacienteSelecionado, setPacienteSelecionado] = useState("");
  const [dentistaSelecionado, setDentistaSelecionado] = useState("");
  const [dataSelecionada, setDataSelecionada] = useState("");
  const [horarioSelecionado, setHorarioSelecionado] = useState("");
  const [procedimento, setProcedimento] = useState("Consulta de Retorno");
  const [processando, setProcessando] = useState(false);

  const horariosDisponiveis = ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];

  const traduzirPrioridade = (gravidade: number): string => {
    if (gravidade >= 4) return "Alta";
    if (gravidade === 3) return "Média";
    return "Baixa";
  };

  const traduzirStatus = (status: string | null): string => {
    if (!status) return "Aguardando";
    const s = status.toUpperCase();
    if (s === "AGENDADO") return "Aguardando";
    if (s === "EM_ATENDIMENTO") return "Em atendimento";
    if (s === "FINALIZADO" || s === "CONCLUIDO") return "Concluído";
    return "Aguardando";
  };

  const carregarAgendaGeral = useCallback(async () => {
    setLoading(true);
    try {
      const idLogado = localStorage.getItem("idUsuarioLogado") || "11";
      try {
        const resAdmin = await fetch(`http://localhost:8081/funcionarios/${idLogado}`);
        if (resAdmin.ok) {
          const adminData = await resAdmin.json();
          setNomeAdminLogado(adminData.nome || "Administrador");
        }
      } catch {
        setNomeAdminLogado("Administrador");
      }

      const response = await fetch("http://localhost:8081/pacientes/agenda-geral");
      if (!response.ok) throw new Error("Erro ao sincronizar a agenda geral.");
      
      const dadosJava = await response.json();

      const formatados: EventoFront[] = dadosJava
        .filter((item: any) => item.nomeDentista !== null)
        .map((item: any) => {
          let diaDefinido = "Indefinido";
          let horaDefinida = "00:00";

          if (item.dataHora) {
            const partes = item.dataHora.split(" ");
            if (partes.length === 2) {
              const [dia, mes, ano] = partes[0].split("/");
              const dataObj = new Date(`${ano}-${mes}-${dia}T12:00:00`); 
              const diasDaSemana = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];
              diaDefinido = diasDaSemana[dataObj.getDay()];
              horaDefinida = partes[1];
            }
          }

          return {
            id: item.idAtendimento,
            paciente: item.nomePaciente,
            dentista: item.nomeDentista,
            dia: diaDefinido,
            horario: horaDefinida,
            status: traduzirStatus(item.status),
            prioridade: traduzirPrioridade(item.gravidade),
          };
        });

      setEventos(formatados);
    } catch (err) {
      console.error("Falha ao sincronizar agenda global:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregarAgendaGeral();
  }, [carregarAgendaGeral]);

  const abrirModalNovoAgendamento = async () => {
    setModalAberto(true);
    try {
      const [resPac, resDent] = await Promise.all([
        fetch("http://localhost:8081/pacientes/painel-admin"),
        fetch("http://localhost:8081/dentistas")
      ]);
      if (resPac.ok) setListaPacientes(await resPac.json());
      if (resDent.ok) setListaDentistas(await resDent.json());
    } catch(e) {
      console.error("Erro ao carregar listas de apoio.", e);
    }
  };

  const fecharModal = () => {
    setModalAberto(false);
    setPacienteSelecionado("");
    setDentistaSelecionado("");
    setDataSelecionada("");
    setHorarioSelecionado("");
  };

  const confirmarNovoAgendamento = async () => {
    if (!pacienteSelecionado || !dentistaSelecionado || !dataSelecionada || !horarioSelecionado) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    setProcessando(true);
    try {
      const payload = {
        idMedico: parseInt(dentistaSelecionado),
        dataHora: `${dataSelecionada} ${horarioSelecionado}`,
        procedimento: procedimento
      };

      const res = await fetch(`http://localhost:8081/pacientes/${pacienteSelecionado}/novo-agendamento`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Erro ao salvar o agendamento no histórico.");

      alert("Agendamento de retorno cadastrado no histórico com sucesso!");
      fecharModal();
      carregarAgendaGeral(); 
    } catch (err: any) {
      alert(err.message);
    } finally {
      setProcessando(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfdfc]">
      <NavPlataformaInterna tipoUsuario="admin" nomeUsuario={nomeAdminLogado} />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#2f251f]">Agenda geral</h1>
            <p className="mt-1 text-[#7c6f67]">Gerencie os horários e consultas da banca da Turma do Bem.</p>
          </div>
          <button 
            onClick={abrirModalNovoAgendamento}
            className="flex h-12 items-center gap-2 rounded-xl bg-[#f58200] px-6 font-bold text-white transition hover:bg-[#ff9d33]"
          >
            <Plus className="h-5 w-5" /> Novo Agendamento
          </button>
        </div>

        {loading ? (
          <p className="text-center text-sm font-semibold text-[#6f625d] py-12">Sincronizando dados...</p>
        ) : (
          <AgendaSemanal titulo="" modo="admin" eventos={eventos as any} />
        )}
      </main>

      {modalAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-xl rounded-3xl bg-white p-7 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#2f251f]">Novo Agendamento (Retorno)</h2>
                <p className="mt-1 text-sm text-[#7c6f67]">Insere uma nova consulta na linha do tempo do paciente.</p>
              </div>
              <button onClick={fecharModal}><X className="h-5 w-5 text-[#7c6f67]" /></button>
            </div>
            
            <div className="mt-6 grid gap-4">
              <div>
                <label className="text-sm font-semibold text-[#2f251f]">Selecione o Paciente</label>
                <select value={pacienteSelecionado} onChange={(e) => setPacienteSelecionado(e.target.value)} className="mt-2 h-12 w-full rounded-xl border border-[#ddd3cb] px-4 outline-none bg-white focus:border-[#f58200]">
                  <option value="">Buscar no banco...</option>
                  {listaPacientes.map((p) => <option key={p.id} value={p.id}>{p.nome}</option>)}
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold text-[#2f251f]">Selecione o Dentista</label>
                <select value={dentistaSelecionado} onChange={(e) => setDentistaSelecionado(e.target.value)} className="mt-2 h-12 w-full rounded-xl border border-[#ddd3cb] px-4 outline-none bg-white focus:border-[#f58200]">
                  <option value="">Buscar profissional...</option>
                  {listaDentistas.map((d) => <option key={d.id} value={d.id}>{d.nome}</option>)}
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold text-[#2f251f]">Procedimento</label>
                <input type="text" value={procedimento} onChange={(e) => setProcedimento(e.target.value)} className="mt-2 h-12 w-full rounded-xl border border-[#ddd3cb] px-4 outline-none bg-white focus:border-[#f58200]" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-[#2f251f]"><CalendarDays className="h-4 w-4 text-[#f58200]" /> Data</label>
                  <input type="date" value={dataSelecionada} onChange={(e) => setDataSelecionada(e.target.value)} className="mt-2 h-12 w-full rounded-xl border border-[#ddd3cb] px-4 outline-none bg-white focus:border-[#f58200]" />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-[#2f251f]"><Clock className="h-4 w-4 text-[#f58200]" /> Horário</label>
                  <select value={horarioSelecionado} onChange={(e) => setHorarioSelecionado(e.target.value)} className="mt-2 h-12 w-full rounded-xl border border-[#ddd3cb] px-4 outline-none bg-white focus:border-[#f58200]">
                    <option value="">Selecione...</option>
                    {horariosDisponiveis.map(h => <option key={h} value={h}>{h}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <button 
              onClick={confirmarNovoAgendamento} 
              disabled={processando}
              className="mt-8 h-12 w-full rounded-xl bg-[#f58200] font-bold text-white transition hover:bg-[#ff9d33] disabled:opacity-70"
            >
              {processando ? "Salvando no histórico..." : "Confirmar Agendamento"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAgenda;
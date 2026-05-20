import { useEffect, useState } from "react";
import AgendaSemanal from "../../components/Agenda/AgendaSemanal";
import NavPlataformaInterna from "../../components/NavPlataformaInterna/NavPlataformaInterna";

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

  useEffect(() => {
    const carregarAgendaGeral = async () => {
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

        const response = await fetch("http://localhost:8081/pacientes/painel-admin");
        if (!response.ok) throw new Error("Erro ao sincronizar a agenda geral.");
        
        const dadosJava = await response.json();

        const formatados: EventoFront[] = dadosJava
          .filter((item: any) => item.dentista !== null)
          .map((item: any, index: number) => {
            const diasFalsos = ["SEG", "TER", "QUA", "QUI", "SEX"];
            const diaDefinido = diasFalsos[index % diasFalsos.length];
            const horasFalsas = ["09:00", "10:00", "11:00", "14:00", "15:00"];
            const horaDefinida = horasFalsas[index % horasFalsas.length];

            return {
              id: item.idAtendimento || item.id,
              paciente: item.nome || item.nmPaciente,
              dentista: item.dentista || item.nmDentista,
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
    };

    carregarAgendaGeral();
  }, []);

  return (
    <div className="min-h-screen bg-[#fdfdfc]">
      <NavPlataformaInterna tipoUsuario="admin" nomeUsuario={nomeAdminLogado} />

      <main className="mx-auto max-w-7xl px-6 py-8">
        {loading && (
          <p className="text-center text-sm font-semibold text-[#6f625d] py-12">
            Varrendo os agendamentos no Oracle...
          </p>
        )}

        {!loading && (
          <AgendaSemanal
            titulo="Agenda geral"
            modo="admin"
            eventos={eventos as any}
          />
        )}
      </main>
    </div>
  );
};

export default AdminAgenda;
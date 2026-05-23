import { useEffect, useState } from "react";
import NavPlataformaInterna from "../../../components/platform/NavPlataformaInterna/NavPlataformaInterna";
import AgendaSemanal from "../../../components/platform/Agenda/AgendaSemanal";


interface EventoJava {
  idAtendimento: number;
  dataHora: string;     
  procedimento: string;
  status: string;
  nomePaciente: string;
  gravidade: number;
  nomeDentista: string;
}

interface EventoFront {
  id: number;
  paciente: string;
  dentista: string;
  dia: string;
  horario: string;
  status: string;
  prioridade: string;
}

const DentistaAgenda = () => {
  const [eventos, setEventos] = useState<EventoFront[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [nomeLogado, setNomeLogado] = useState("");

const idMedicoLogado = localStorage.getItem("idUsuarioLogado") || "1";
  
  const extrairDiaSemana = (dataStr: string): string => {
    try {
      const [dataParte] = dataStr.split(" ");
      const [dia, mes, ano] = dataParte.split("/").map(Number);
      const dataObjeto = new Date(ano, mes - 1, dia);
      
      const dias = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];
      return dias[dataObjeto.getDay()];
    } catch {
      return "SEG"; 
    }
  };

  const traduzirPrioridade = (gravidade: number): string => {
    if (gravidade >= 4) return "Alta";
    if (gravidade === 3) return "Média";
    return "Baixa";
  };

  const traduzirStatus = (status: string): string => {
    const s = status.toUpperCase();
    if (s === "AGENDADO") return "Aguardando";
    if (s === "EM_ATENDIMENTO") return "Em atendimento";
    if (s === "FINALIZADO") return "Concluído";
    return "Aguardando";
  };

  useEffect(() => {
    const carregarAgendaBanco = async () => {
      try {
        const response = await fetch(`https://vision-xs85.onrender.com/dentistas/${idMedicoLogado}/agenda`);
        
        if (!response.ok) {
          throw new Error("Não foi possível sincronizar com o banco de dados.");
        }

        const dadosJava: EventoJava[] = await response.json();

        if (dadosJava.length > 0 && dadosJava[0].nomeDentista) {
          setNomeLogado(dadosJava[0].nomeDentista);
        }

        const dadosFormatados: EventoFront[] = dadosJava.map((item) => {
          const [_, horario] = item.dataHora.split(" "); 

          return {
            id: item.idAtendimento,
            paciente: item.nomePaciente,
            dentista: item.nomeDentista || "Você", 
            dia: extrairDiaSemana(item.dataHora),
            horario: horario,
            status: traduzirStatus(item.status),
            prioridade: traduzirPrioridade(item.gravidade),
          };
        });

        setEventos(dadosFormatados);
      } catch (err: any) {
        setErro(err.message);
      } finally {
        setLoading(false);
      }
    };

    carregarAgendaBanco();
  }, []);

  return (
    <div className="min-h-screen bg-[#fdfdfc]">
      <NavPlataformaInterna tipoUsuario="dentista" nomeUsuario={nomeLogado} />

      <main className="mx-auto max-w-7xl px-6 py-8">
        {loading && (
          <p className="text-center text-sm font-semibold text-[#6f625d] py-12">
            Buscando dados no Oracle...
          </p>
        )}
        
        {erro && (
          <p className="text-center text-sm font-semibold text-red-500 rounded-xl border border-red-200 bg-red-50 p-4">
            {erro}
          </p>
        )}

        {!loading && !erro && (
          <AgendaSemanal
            titulo="Minha agenda"
            modo="dentista"
            eventos={eventos as any} 
          />
        )}
      </main>
    </div>
  );
};

export default DentistaAgenda;
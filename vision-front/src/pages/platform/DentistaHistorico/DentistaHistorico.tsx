import { useEffect, useState } from "react";
import { History, CalendarDays, Building2 } from "lucide-react";
import NavPlataformaInterna from "../../../components/platform/NavPlataformaInterna/NavPlataformaInterna";


type AtendimentoHistorico = {
  id: string;
  nome: string;
  idade: number;
  origem: string;
  origemIcone: string;
  status: string;
  prioridade: string;
  dataAgenda: string;
  descricaoAtendimento: string;
  andamento: string;
  dataRegistro: string;
};

const DentistaHistorico = () => {
  const [historico, setHistorico] = useState<AtendimentoHistorico[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [nomeLogado, setNomeLogado] = useState(""); 

const idMedicoLogado = localStorage.getItem("idUsuarioLogado") || "1";

  const traduzirPrioridade = (gravidade: number): string => {
    if (gravidade >= 4) return "Alta";
    if (gravidade === 3) return "Média";
    return "Baixa";
  };

  useEffect(() => {
    const buscarHistoricoReal = async () => {
      try {
        const response = await fetch(`https://vision-xs85.onrender.com/dentistas/${idMedicoLogado}/agenda`);
        if (!response.ok) throw new Error("Não foi possível carregar o histórico.");
        
        const dadosJava = await response.json();

        if (dadosJava.length > 0 && dadosJava[0].nomeDentista) {
          setNomeLogado(dadosJava[0].nomeDentista);
        }

        const concluidos: AtendimentoHistorico[] = dadosJava
          .filter((item: any) => item.status === "FINALIZADO")
          .map((item: any) => ({
            id: String(item.idAtendimento),
            nome: item.nomePaciente,
            idade: 14,
            origem: "Triagem Escola",
            origemIcone: "building",
            status: "Concluído",
            prioridade: traduzirPrioridade(item.gravidade),
            dataAgenda: item.dataHora,
            descricaoAtendimento: item.procedimento,
            andamento: "Completo",
            dataRegistro: item.dataHora.split(" ")[0]
          }));

        setHistorico(concluidos);
      } catch (err: any) {
        setErro(err.message);
      } finally {
        setLoading(false);
      }
    };

    buscarHistoricoReal();
  }, []);

  return (
    <div className="min-h-screen bg-[#fdfdfc] text-[#2f251f]">
      <NavPlataformaInterna tipoUsuario="dentista" nomeUsuario={nomeLogado} />

      <main className="mx-auto w-full max-w-[1050px] px-6 py-8">
        <div className="mb-7 flex items-center gap-3">
          <History className="h-6 w-6 text-[#f58200]" />
          <div>
            <h1 className="text-3xl font-extrabold">Histórico</h1>
            <p className="text-sm text-[#6f625d]">Atendimentos concluídos pelo dentista reais do Oracle.</p>
          </div>
        </div>

        {loading && <p className="text-sm text-[#6f625d]">Buscando dados no banco...</p>}
        {erro && <p className="text-sm text-red-500">Erro: {erro}</p>}

        {!loading && !erro && historico.length === 0 ? (
          <p className="rounded-xl border border-[#ded7d1] bg-white p-5 text-sm text-[#6f625d]">
            Nenhum atendimento concluído ainda.
          </p>
        ) : (
          <section className="space-y-3">
            {!loading && historico.map((item) => (
              <article key={item.id} className="rounded-xl border border-[#ded7d1] bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-lg font-extrabold">{item.nome}</h2>
                      <span className="text-sm text-[#6f625d]">({item.idade} anos)</span>
                      <span className="flex items-center gap-1 rounded-full bg-[#f4f1ee] px-2 py-1 text-xs font-medium text-[#2f251f]">
                        <Building2 className="h-3 w-3 text-[#6f625d]" />
                        {item.origem}
                      </span>
                    </div>
                    <p className="mt-2 flex items-center gap-2 text-sm text-[#6f625d]">
                      <CalendarDays className="h-4 w-4" /> Agenda: {item.dataAgenda}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">Completo</span>
                    <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-500">{item.prioridade}</span>
                  </div>
                </div>
                <div className="mt-4 rounded-lg bg-[#f7f4f1] p-4">
                  <p className="text-sm font-bold text-[#2f251f]">Procedimento Solicitado</p>
                  <p className="mt-2 text-sm leading-relaxed text-[#6f625d]">{item.descricaoAtendimento}</p>
                </div>
              </article>
            ))}
          </section>
        )}
      </main>
    </div>
  );
};

export default DentistaHistorico;
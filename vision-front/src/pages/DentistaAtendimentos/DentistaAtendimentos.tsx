import { useEffect, useState } from "react";
import { Stethoscope, CalendarDays, Globe, Building2 } from "lucide-react";
import NavPlataformaInterna from "../../components/NavPlataformaInterna/NavPlataformaInterna";

type Atendimento = {
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

const DentistaAtendimentos = () => {
  const [atendimentos, setAtendimentos] = useState<Atendimento[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [nomeLogado, setNomeLogado] = useState(""); // <--- Estado para o cabeçalho

  const idMedicoLogado = 24; 

  const traduzirPrioridade = (gravidade: number): string => {
    if (gravidade >= 4) return "Alta";
    if (gravidade === 3) return "Média";
    return "Baixa";
  };

  useEffect(() => {
    const buscarFilaReal = async () => {
      try {
        const response = await fetch(`http://localhost:8081/dentistas/${idMedicoLogado}/agenda`);
        if (!response.ok) throw new Error("Não foi possível carregar os atendimentos ativos.");
        
        const dadosJava = await response.json();

        // Pega o nome do médico para o topo direito
        if (dadosJava.length > 0 && dadosJava[0].nomeDentista) {
          setNomeLogado(dadosJava[0].nomeDentista);
        }

        const formatados: Atendimento[] = dadosJava
          .filter((item: any) => item.status === "EM_ATENDIMENTO")
          .map((item: any) => ({
            id: String(item.idAtendimento),
            nome: item.nomePaciente,
            idade: 12,
            origem: "Triagem Escola",
            origemIcone: "building",
            status: "Em atendimento",
            prioridade: traduzirPrioridade(item.gravidade),
            dataAgenda: item.dataHora,
            descricaoAtendimento: item.procedimento,
            andamento: "Em andamento",
            dataRegistro: item.dataHora.split(" ")[0]
          }));

        setAtendimentos(formatados);
      } catch (err: any) {
        setErro(err.message);
      } finally {
        setLoading(false);
      }
    };

    buscarFilaReal();
  }, []);

  return (
    <div className="min-h-screen bg-[#fdfdfc] text-[#2f251f]">
      <NavPlataformaInterna tipoUsuario="dentista" nomeUsuario={nomeLogado} />

      <main className="mx-auto w-full max-w-262.5 px-6 py-8">
        <div className="mb-7 flex items-center gap-3">
          <Stethoscope className="h-6 w-6 text-[#f58200]" />

          <div>
            <h1 className="text-3xl font-extrabold">
              Atendimentos
            </h1>

            <p className="text-sm text-[#6f625d]">
              Pacientes com treatmento em andamento.
            </p>
          </div>
        </div>

        {loading && (
          <p className="text-sm text-[#6f625d] py-4">Buscando fila ativa no Oracle...</p>
        )}

        {erro && (
          <p className="text-sm text-red-500 py-4">Erro: {erro}</p>
        )}

        {!loading && !erro && atendimentos.length === 0 ? (
          <p className="rounded-xl border border-[#ded7d1] bg-white p-5 text-sm text-[#6f625d]">
            Nenhum atendimento em andamento.
          </p>
        ) : (
          <section className="space-y-3">
            {atendimentos.map((item) => (
              <article
                key={item.id}
                className="rounded-xl border border-[#ded7d1] bg-white p-5 shadow-sm"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-lg font-extrabold">
                        {item.nome}
                      </h2>

                      <span className="text-sm text-[#6f625d]">
                        ({item.idade} anos)
                      </span>

                      <span className="flex items-center gap-1 rounded-full bg-[#f4f1ee] px-2 py-1 text-xs font-medium text-[#2f251f]">
                        {item.origemIcone === "globe" ? (
                          <Globe className="h-3 w-3 text-sky-500" />
                        ) : (
                          <Building2 className="h-3 w-3 text-[#6f625d]" />
                        )}
                        {item.origem}
                      </span>
                    </div>

                    <p className="mt-2 flex items-center gap-2 text-sm text-[#6f625d]">
                      <CalendarDays className="h-4 w-4" />
                      Agenda: {item.dataAgenda}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-700">
                      Em andamento
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        item.prioridade === "Alta"
                          ? "bg-red-100 text-red-600"
                          : "bg-orange-100 text-orange-500"
                      }`}
                    >
                      {item.prioridade}
                    </span>
                  </div>
                </div>

                <div className="mt-4 rounded-lg bg-[#f7f4f1] p-4">
                  <p className="text-sm font-bold text-[#2f251f]">
                    Procedimento Solicitado
                  </p>

                  <p className="mt-2 text-sm leading-relaxed text-[#6f625d]">
                    {item.descricaoAtendimento}
                  </p>
                </div>

                <p className="mt-3 text-xs text-[#6f625d]">
                  Registrado em: {item.dataRegistro}
                </p>
              </article>
            ))}
          </section>
        )}
      </main>
    </div>
  );
};

export default DentistaAtendimentos;
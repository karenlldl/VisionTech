import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { History, CalendarDays, Globe, Building2 } from "lucide-react";
import NavPlataformaInterna from "../../components/NavPlataformaInterna/NavPlataformaInterna";

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
  const location = useLocation();

  const atendimentoRecebido = location.state?.atendimento as
    | AtendimentoHistorico
    | undefined;

  const [historico, setHistorico] = useState<AtendimentoHistorico[]>([]);

  useEffect(() => {
    const dados = JSON.parse(
      localStorage.getItem("historicoAtendimentos") || "[]"
    );

    setHistorico(dados);
  }, [atendimentoRecebido]);

  return (
    <div className="min-h-screen bg-[#fdfdfc] text-[#2f251f]">
      <NavPlataformaInterna tipoUsuario="dentista" />

      <main className="mx-auto w-full max-w-[1050px] px-6 py-8">
        <div className="mb-7 flex items-center gap-3">
          <History className="h-6 w-6 text-[#f58200]" />

          <div>
            <h1 className="text-3xl font-extrabold">
              Histórico
            </h1>

            <p className="text-sm text-[#6f625d]">
              Atendimentos concluídos pelo dentista.
            </p>
          </div>
        </div>

        {historico.length === 0 ? (
          <p className="rounded-xl border border-[#ded7d1] bg-white p-5 text-sm text-[#6f625d]">
            Nenhum atendimento concluído ainda.
          </p>
        ) : (
          <section className="space-y-3">
            {historico.map((item) => (
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
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                      Completo
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
                    Registro do atendimento
                  </p>

                  <p className="mt-2 text-sm leading-relaxed text-[#6f625d]">
                    {item.descricaoAtendimento}
                  </p>
                </div>

                <p className="mt-3 text-xs text-[#6f625d]">
                  Finalizado em: {item.dataRegistro}
                </p>
              </article>
            ))}
          </section>
        )}
      </main>
    </div>
  );
};

export default DentistaHistorico;
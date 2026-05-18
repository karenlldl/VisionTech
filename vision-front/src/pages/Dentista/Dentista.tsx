import { useEffect, useState } from "react";
import NavPlataformaInterna from "../../components/NavPlataformaInterna/NavPlataformaInterna";
import PacienteCard from "../../components/Agenda/PacienteCard";

interface EventoJava {
  idAtendimento: number;
  dataHora: string;
  procedimento: string;
  status: string;
  nomePaciente: string;
  gravidade: number;
  nomeDentista: string; 
}

const Dentista = () => {
  const [pacientes, setPacientes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [pacienteSelecionado, setPacienteSelecionado] = useState<any | null>(null);
  const [descricaoAtendimento, setDescricaoAtendimento] = useState("");
  const [andamento, setAndamento] = useState("EM_ATENDIMENTO"); 
  
  // NOVO ESTADO: Armazena o nome real do médico logado retornado pelo DTO
  const [nomeLogado, setNomeLogado] = useState(""); 

  const idMedicoLogado = 24; 

  const traduzirPrioridade = (gravidade: number) => {
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

  const carregarFila = async () => {
    try {
      const response = await fetch(`http://localhost:8081/dentistas/${idMedicoLogado}/agenda`);
      if (!response.ok) throw new Error("Erro ao carregar a fila do banco.");
      const dados: EventoJava[] = await response.json();
      
      // CAPTURA DINÂMICA: Seta o nome do médico baseado no primeiro registro retornado
      if (dados.length > 0 && dados[0].nomeDentista) {
        setNomeLogado(dados[0].nomeDentista);
      }
      
      const mapeados = dados
        .filter((item) => item.status !== "FINALIZADO") 
        .map((item) => ({
          id: item.idAtendimento,
          nome: item.nomePaciente,
          idade: 14, 
          origem: "Triagem Escola",
          status: traduzirStatus(item.status),
          prioridade: traduzirPrioridade(item.gravidade),
          dentista: item.nomeDentista || "Médico Desconhecido", 
          data: item.dataHora
        }));

      setPacientes(mapeados);
    } catch (err: any) {
      setErro(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarFila();
  }, []);

  const abrirModalAtendimento = (paciente: any) => {
    setPacienteSelecionado(paciente);
    setModalAberto(true);
  };

  const fecharModalAtendimento = () => {
    setModalAberto(false);
    setPacienteSelecionado(null);
    setDescricaoAtendimento("");
  };

  const handleSalvarAtendimento = async () => {
    if (!pacienteSelecionado) return;

    if (!descricaoAtendimento.trim()) {
      alert("Por favor, descreva o procedimento realizado.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8081/dentistas/atendimento/${pacienteSelecionado.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: andamento,
          descricao: descricaoAtendimento
        })
      });

      if (!response.ok) throw new Error("Falha ao salvar no banco.");

      alert("Atendimento registrado com sucesso!");
      fecharModalAtendimento();
      carregarFila();
    } catch (err: any) {
      alert("Erro ao salvar: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfdfc]">
      {/* VINCO DINÂMICO: Repassando o estado com o nome do Oracle para a Navbar */}
      <NavPlataformaInterna tipoUsuario="dentista" nomeUsuario={nomeLogado} />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div>
          <h1 className="text-4xl font-bold text-[#2f251f]">
            Fila de atendimento
          </h1>
        </div>

        {loading && <p className="text-sm text-[#6f625d] mt-4">Carregando dados do Oracle...</p>}
        {erro && <p className="text-sm text-red-500 mt-4">{erro}</p>}

        <section className="mt-8 flex flex-col gap-4">
          {!loading && pacientes.map((paciente) => (
            <PacienteCard
              key={paciente.id}
              paciente={paciente as any}
              mostrarBotaoAtender
              onVerDetalhes={() => abrirModalAtendimento(paciente)}
              onAtender={() => abrirModalAtendimento(paciente)}
            />
          ))}
        </section>
      </main>

      {/* MODAL */}
      {modalAberto && pacienteSelecionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-5">
          <section className="w-full max-w-130 rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-extrabold text-[#2f251f]">
                  Registrar atendimento
                </h2>
                <p className="mt-1 text-sm text-[#6f625d]">
                  Paciente: {pacienteSelecionado.nome} ({pacienteSelecionado.idade} anos)
                </p>
              </div>
              <button
                type="button"
                onClick={fecharModalAtendimento}
                className="text-2xl leading-none text-[#6f625d] transition hover:text-[#2f251f]"
              >
                ×
              </button>
            </div>

            {/* DESCRIÇÃO */}
            <div>
              <label htmlFor="descricaoAtendimento" className="mb-2 block text-sm font-bold text-[#2f251f]">
                O que foi feito? *
              </label>
              <textarea
                id="descricaoAtendimento"
                value={descricaoAtendimento}
                onChange={(event) => setDescricaoAtendimento(event.target.value)}
                placeholder="Descreva o procedimento realizado, observações clínicas, próximos passos..."
                rows={5}
                className="w-full resize-none rounded-xl border border-[#f58200] bg-white px-4 py-3 text-sm outline-none"
              />
            </div>

            {/* ANDAMENTO */}
            <div className="mt-6">
              <p className="mb-3 text-sm font-bold text-[#2f251f]">Andamento</p>
              <div className="space-y-3">
                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-[#ded7d1] px-4 py-4 transition hover:bg-[#fffaf5]">
                  <input
                    type="radio"
                    name="andamento"
                    value="EM_ATENDIMENTO"
                    checked={andamento === "EM_ATENDIMENTO"}
                    onChange={() => setAndamento("EM_ATENDIMENTO")}
                    className="mt-1 accent-[#f58200]"
                  />
                  <div>
                    <p className="text-sm font-bold text-[#2f251f]">🟡 Ainda em andamento</p>
                    <p className="text-xs text-[#6f625d]">Tratamento iniciado, requer mais sessões</p>
                  </div>
                </label>

                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-[#ded7d1] px-4 py-4 transition hover:bg-[#fffaf5]">
                  <input
                    type="radio"
                    name="andamento"
                    value="FINALIZADO"
                    checked={andamento === "FINALIZADO"}
                    onChange={() => setAndamento("FINALIZADO")}
                    className="mt-1 accent-[#f58200]"
                  />
                  <div>
                    <p className="text-sm font-bold text-[#2f251f]">✅ Finalizado / Completo</p>
                    <p className="text-xs text-[#6f625d]">Tratamento integralmente concluído</p>
                  </div>
                </label>
              </div>
            </div>

            {/* BOTÕES */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={fecharModalAtendimento}
                className="rounded-lg px-4 py-2 text-sm font-semibold text-[#2f251f] hover:bg-[#f7f4f1]"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSalvarAtendimento}
                className="rounded-lg bg-[#f58200] px-5 py-2 text-sm font-bold text-white hover:bg-[#df7600]"
              >
                Salvar atendimento
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default Dentista;
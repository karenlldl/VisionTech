import { useState, useEffect } from "react";
import { CheckCircle, XCircle, Eye, ImageIcon, User, Phone, Mail } from "lucide-react";
import NavPlataformaInterna from "../../../components/platform/NavPlataformaInterna/NavPlataformaInterna";

type PacienteExterno = {
  id: number;
  nome: string;
  idade: number;
  telefone: string;
  email: string;
  escola: string;
  programa: string;
  status: string;
  cidade?: string;
  responsavel?: string;
};

const FilaExterna = () => {
  const [pacientes, setPacientes] = useState<PacienteExterno[]>([]);
  const [loading, setLoading] = useState(true);
  const [detalhesAbertos, setDetalhesAbertos] = useState<Record<number, boolean>>({});
  
  const [modalRecusaAberto, setModalRecusaAberto] = useState(false);
  const [pacienteParaRecusar, setPacienteParaRecusar] = useState<number | null>(null);

  const carregarFila = async () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const response = await fetch(`${API_URL}/pacientes`);
    setLoading(true);
    try {
      if (!response.ok) throw new Error("Erro ao buscar pacientes.");
      
      const todosPacientes = await response.json();
      
      const fila = todosPacientes.filter((p: any) => p.status === "Aguardando análise");
      setPacientes(fila);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarFila();
  }, []);

  const toggleDetalhes = (id: number) => {
    setDetalhesAbertos((prev) => ({ ...prev, [id]: !prev[id] }));
  };

const aprovarPaciente = async (id: number) => {
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const res = await fetch(`${API_URL}/pacientes/${id}/aprovar`, {
        method: "PUT"
      });

      if (!res.ok) throw new Error("O banco rejeitou a aprovação.");

      alert("Paciente aprovado! Ele foi transferido para o Painel Principal.");
      carregarFila();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const abrirModalRecusa = (id: number) => {
    setPacienteParaRecusar(id);
    setModalRecusaAberto(true);
  };

const confirmarRecusa = async () => {
    if (!pacienteParaRecusar) return;
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const res = await fetch(`${API_URL}/pacientes/${pacienteParaRecusar}`, {
        method: "DELETE"
      });

      if (!res.ok) throw new Error("Erro ao deletar as chaves estrangeiras do Oracle.");

      setModalRecusaAberto(false);
      carregarFila();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f5f2] font-platform">
      <NavPlataformaInterna tipoUsuario="admin" />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-medium text-[#f58200]">Cadastros externos</p>
          <h1 className="mt-2 text-3xl font-bold text-black md:text-4xl">Fila de pacientes externos</h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#6f625d] md:text-base">
            Aqui ficam os pacientes cadastrados pelo formulário externo aguardando aprovação para o fluxo principal.
          </p>
        </div>

        <section className="rounded-3xl border border-[#e4ded9] bg-white p-5 shadow-sm">
          <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-bold text-black">Pacientes aguardando avaliação</h2>
              <p className="mt-1 text-sm text-[#6f625d]">
                {loading ? "Sincronizando..." : `${pacientes.length} paciente(s) encontrado(s) na fila externa.`}
              </p>
            </div>
          </div>

          {!loading && pacientes.length === 0 && (
            <p className="text-center text-sm font-semibold text-[#6f625d] py-12">Nenhum paciente na fila de aprovação.</p>
          )}

          <div className="space-y-4">
            {pacientes.map((paciente) => (
              <article key={paciente.id} className="rounded-2xl border border-[#e4ded9] bg-[#fffaf6] p-5">
                <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                  <div>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-2xl font-bold text-black">{paciente.nome}</h3>
                        <p className="mt-1 text-sm text-[#6f625d]">Cadastro externo • {paciente.programa}</p>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      <div className="flex items-center gap-3 text-sm text-[#6f625d]">
                        <User className="h-4 w-4 text-[#f58200]" /> {paciente.idade} anos
                      </div>
                      <div className="flex items-center gap-3 text-sm text-[#6f625d]">
                        <Phone className="h-4 w-4 text-[#f58200]" /> {paciente.telefone}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-[#6f625d]">
                        <Mail className="h-4 w-4 text-[#f58200]" /> {paciente.email}
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <button
                        onClick={() => toggleDetalhes(paciente.id)}
                        className="inline-flex items-center gap-2 rounded-full border border-[#e4ded9] bg-white px-5 py-3 text-sm font-semibold text-black transition hover:border-[#f58200] hover:text-[#f58200]"
                      >
                        <Eye className="h-4 w-4" />
                        {detalhesAbertos[paciente.id] ? "Ocultar detalhes" : "Ver detalhes"}
                      </button>

                      <button
                        onClick={() => aprovarPaciente(paciente.id)}
                        className="inline-flex items-center gap-2 rounded-full bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4" /> Aprovar
                      </button>

                      <button
                        onClick={() => abrirModalRecusa(paciente.id)}
                        className="inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
                      >
                        <XCircle className="h-4 w-4" /> Recusar
                      </button>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-[#e4ded9] bg-white p-4">
                    <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-black">
                      <ImageIcon className="h-4 w-4 text-[#f58200]" /> Foto anexada
                    </div>
                    <div className="flex aspect-video items-center justify-center overflow-hidden rounded-2xl bg-[#f8f5f2]">
                      <p className="text-xs text-[#6f625d] p-4 text-center">
                        MOCK: Arquivos de imagem estáticos não trafegam pelo banco Oracle neste MVP.
                      </p>
                    </div>
                  </div>
                </div>

                {detalhesAbertos[paciente.id] && (
                  <div className="mt-6 rounded-2xl border border-[#e4ded9] bg-white p-5">
                    <h4 className="text-lg font-bold text-black">Detalhes do cadastro</h4>
                    <div className="mt-5">
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#6f625d]">Observações/Situação (Triagem pendente)</p>
                      <p className="mt-2 text-sm leading-relaxed text-[#6f625d]">
                         Visualização de dados pendente de triagem interna. Aguardando aprovação para liberação médica.
                      </p>
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>
      </main>

      {modalRecusaAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-black">Recusar cadastro</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#6f625d]">
                Tem certeza que deseja recusar este cadastro? O registro será deletado permanentemente do banco de dados.
              </p>
            </div>
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                onClick={() => setModalRecusaAberto(false)}
                className="rounded-full border border-[#ded7d1] px-5 py-3 text-sm font-semibold text-[#6f625d] transition hover:border-[#f58200] hover:text-[#f58200]"
              >
                Cancelar
              </button>
              <button
                onClick={confirmarRecusa}
                className="rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Recusar e Deletar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilaExterna;
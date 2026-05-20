import { useState, useEffect } from "react";
import { HeartHandshake, GraduationCap, Send } from "lucide-react";
import NavPlataformaInterna from "../../components/NavPlataformaInterna/NavPlataformaInterna";

const NovoPaciente = () => {
  const [nomeAdminLogado, setNomeAdminLogado] = useState("Carregando...");

  // Estados para controlar o formulário
  const [programa, setPrograma] = useState("apolonias");
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [cidade, setCidade] = useState("");
  const [contato, setContato] = useState("");
  const [escola, setEscola] = useState("");
  const [observacao, setObservacao] = useState("");

  // Estados de feedback visual
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const buscarAdmin = async () => {
      try {
        const idLogado = localStorage.getItem("idUsuarioLogado") || "11";
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
    };
    buscarAdmin();
  }, []);

  const handleCadastrar = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Impede a página de recarregar
    setErro("");
    setSucesso("");

    // Validação cética básica
    if (!nome.trim() || !idade.trim() || !cidade.trim() || !contato.trim()) {
      setErro("Preencha todos os campos obrigatórios com asterisco (*).");
      return;
    }

    if (programa === "dentistas" && !escola.trim()) {
      setErro("A origem/escola é obrigatória para o programa Dentistas do Bem.");
      return;
    }

    setLoading(true);

 
const payload = {
      nome: nome.trim(),
      idade: parseInt(idade),
      cidade: cidade.trim(),
      telefone: contato.trim(),
      escola: programa === "dentistas" ? escola.trim() : "Programa Apolônias",
      programa: programa === "dentistas" ? "Dentistas do Bem" : "Apolônias do Bem",
      observacao: observacao.trim(),
      gravidadeDentaria: 3, 
      status: "Aguardando" 
    };

    try {
      // Ajuste a rota '/pacientes' se o seu backend estiver usando outro caminho para o POST
      const response = await fetch("http://localhost:8081/pacientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const msgErro = await response.text();
        throw new Error(msgErro || "Erro ao inserir o paciente no banco de dados.");
      }

      setSucesso("Paciente cadastrado com sucesso no Oracle!");
      
      // Limpa os campos para o próximo cadastro
      setNome("");
      setIdade("");
      setCidade("");
      setContato("");
      setEscola("");
      setObservacao("");

    } catch (error: any) {
      setErro(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfdfc]">
      <NavPlataformaInterna tipoUsuario="admin" nomeUsuario={nomeAdminLogado} />

      <main className="mx-auto max-w-3xl px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#2f251f]">Novo paciente</h1>
          <p className="mt-2 text-[#7b6f69]">Cadastre um novo paciente para triagem e acompanhamento odontológico</p>
        </div>

        <div className="rounded-2xl border border-[#e9e2dc] bg-white p-6 shadow-sm">
          {/* Adicionamos o onSubmit na tag form */}
          <form onSubmit={handleCadastrar} className="space-y-6">
            <div>
              <label className="mb-3 block text-sm font-semibold text-[#2f251f]">Programa desejado *</label>
              <div className="grid gap-4 md:grid-cols-2">
                <button type="button" onClick={() => setPrograma("apolonias")} className={`rounded-2xl border p-5 text-left transition ${programa === "apolonias" ? "border-[#f58200] bg-[#fff7f0]" : "border-[#e5ddd7] hover:border-[#f5b066]"}`}>
                  <HeartHandshake className={`mb-3 h-6 w-6 ${programa === "apolonias" ? "text-[#f58200]" : "text-[#9b8d86]"}`} />
                  <h3 className="font-semibold text-[#2f251f]">Apolónias do Bem</h3>
                  <p className="mt-1 text-sm text-[#7b6f69]">Mulheres vítimas de violência com a dentição afetada</p>
                </button>
                <button type="button" onClick={() => setPrograma("dentistas")} className={`rounded-2xl border p-5 text-left transition ${programa === "dentistas" ? "border-[#f58200] bg-[#fff7f0]" : "border-[#e5ddd7] hover:border-[#f5b066]"}`}>
                  <GraduationCap className={`mb-3 h-6 w-6 ${programa === "dentistas" ? "text-[#f58200]" : "text-[#9b8d86]"}`} />
                  <h3 className="font-semibold text-[#2f251f]">Dentistas do Bem</h3>
                  <p className="mt-1 text-sm text-[#7b6f69]">Crianças e jovens de 11 a 17 anos em vulnerabilidade social.</p>
                </button>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#2f251f]">Nome completo *</label>
              <input 
                type="text" 
                placeholder="Nome do paciente" 
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full rounded-xl border border-[#ddd4ce] bg-white px-4 py-3 outline-none transition focus:border-[#f58200]" 
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#2f251f]">Idade *</label>
                <input 
                  type="number" 
                  placeholder="Ex: 15" 
                  value={idade}
                  onChange={(e) => setIdade(e.target.value)}
                  className="w-full rounded-xl border border-[#ddd4ce] bg-white px-4 py-3 outline-none transition focus:border-[#f58200]" 
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#2f251f]">Cidade *</label>
                <input 
                  type="text" 
                  placeholder="Cidade" 
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                  className="w-full rounded-xl border border-[#ddd4ce] bg-white px-4 py-3 outline-none transition focus:border-[#f58200]" 
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#2f251f]">Contato *</label>
                <input 
                  type="text" 
                  placeholder="(00) 00000-0000" 
                  value={contato}
                  onChange={(e) => setContato(e.target.value)}
                  className="w-full rounded-xl border border-[#ddd4ce] bg-white px-4 py-3 outline-none transition focus:border-[#f58200]" 
                />
              </div>
              {programa === "dentistas" && (
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#2f251f]">Escola / origem *</label>
                  <input 
                    type="text" 
                    placeholder="Ex: ETEC, ONG..." 
                    value={escola}
                    onChange={(e) => setEscola(e.target.value)}
                    className="w-full rounded-xl border border-[#ddd4ce] bg-white px-4 py-3 outline-none transition focus:border-[#f58200]" 
                  />
                </div>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#2f251f]">Observações</label>
              <textarea 
                rows={4} 
                placeholder="Descreva a situação do paciente..." 
                value={observacao}
                onChange={(e) => setObservacao(e.target.value)}
                className="w-full resize-none rounded-xl border border-[#ddd4ce] bg-white px-4 py-3 outline-none transition focus:border-[#f58200]" 
              />
            </div>

            {/* MENSAGENS DE FEEDBACK */}
            {erro && (
              <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                {erro}
              </p>
            )}
            {sucesso && (
              <p className="rounded-lg bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
                {sucesso}
              </p>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#f58200] px-6 py-4 font-semibold text-white transition hover:bg-[#e27100] disabled:opacity-70"
            >
              <Send className="h-4 w-4" /> 
              {loading ? "Cadastrando..." : "Cadastrar paciente"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default NovoPaciente;
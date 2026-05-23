import { useState, useEffect } from "react";
import { HeartHandshake, GraduationCap, Send } from "lucide-react";

import NavPlataformaInterna from "../../../components/platform/NavPlataformaInterna/NavPlataformaInterna";

const calcularIdade = (dataNascimento: string) => {
  if (!dataNascimento) return 0;

  const hoje = new Date();
  const nascimento = new Date(dataNascimento);

  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const mes = hoje.getMonth() - nascimento.getMonth();

  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }

  return idade;
};

const NovoPaciente = () => {
  const [nomeAdminLogado, setNomeAdminLogado] = useState("Carregando...");

  const [programa, setPrograma] = useState("apolonias");
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [cidade, setCidade] = useState("");
  const [contato, setContato] = useState("");
  const [email, setEmail] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [escola, setEscola] = useState("");
  const [observacao, setObservacao] = useState("");

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [loading, setLoading] = useState(false);

  const isDentistas = programa === "dentistas";

  useEffect(() => {
    const buscarAdmin = async () => {
      try {
        const idLogado = localStorage.getItem("idUsuarioLogado") || "11";
        const resAdmin = await fetch(
          `https://vision-xs85.onrender.com/funcionarios/${idLogado}`
        );

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
    event.preventDefault();

    setErro("");
    setSucesso("");

    const idade = calcularIdade(dataNascimento);

    if (
      !nome.trim() ||
      !dataNascimento.trim() ||
      !cidade.trim() ||
      !contato.trim() ||
      !email.trim()
    ) {
      setErro("Preencha todos os campos obrigatórios com asterisco (*).");
      return;
    }

    if (isDentistas && !responsavel.trim()) {
      setErro("O nome do responsável é obrigatório para o Dentistas do Bem.");
      return;
    }

    if (isDentistas && !escola.trim()) {
      setErro("A origem/escola é obrigatória para o programa Dentistas do Bem.");
      return;
    }

    if (isDentistas && (idade < 11 || idade > 17)) {
      setErro("O programa Dentistas do Bem aceita pacientes de 11 a 17 anos.");
      return;
    }

    setLoading(true);

    const payload = {
      nome: nome.trim(),
      dataNascimento,
      idade,
      cidade: cidade.trim(),
      telefone: contato.trim(),
      email: email.trim(),
      nomeResponsavel: isDentistas ? responsavel.trim() : "",
      escola: isDentistas ? escola.trim() : "Programa Apolônias",
      programa: isDentistas ? "Dentistas do Bem" : "Apolônias do Bem",
      observacao: observacao.trim(),
      gravidadeDentaria: 3,
      status: "Aguardando",
    };

    try {
      const response = await fetch("https://vision-xs85.onrender.com/pacientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const msgErro = await response.text();
        throw new Error(
          msgErro || "Erro ao inserir o paciente no banco de dados."
        );
      }

      setSucesso("Paciente cadastrado com sucesso.");

      setNome("");
      setDataNascimento("");
      setCidade("");
      setContato("");
      setEmail("");
      setResponsavel("");
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
          <p className="mt-2 text-[#7b6f69]">
            Cadastre um novo paciente para triagem e acompanhamento odontológico.
          </p>
        </div>

        <div className="rounded-2xl border border-[#e9e2dc] bg-white p-6 shadow-sm">
          <form onSubmit={handleCadastrar} className="space-y-6">
            <div>
              <label className="mb-3 block text-sm font-semibold text-[#2f251f]">
                Programa desejado *
              </label>

              <div className="grid gap-4 md:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setPrograma("apolonias")}
                  className={`rounded-2xl border p-5 text-left transition ${
                    programa === "apolonias"
                      ? "border-[#f58200] bg-[#fff7f0]"
                      : "border-[#e5ddd7] hover:border-[#f5b066]"
                  }`}
                >
                  <HeartHandshake
                    className={`mb-3 h-6 w-6 ${
                      programa === "apolonias"
                        ? "text-[#f58200]"
                        : "text-[#9b8d86]"
                    }`}
                  />
                  <h3 className="font-semibold text-[#2f251f]">
                    Apolônias do Bem
                  </h3>
                  <p className="mt-1 text-sm text-[#7b6f69]">
                    Mulheres vítimas de violência com a dentição afetada
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setPrograma("dentistas")}
                  className={`rounded-2xl border p-5 text-left transition ${
                    programa === "dentistas"
                      ? "border-[#f58200] bg-[#fff7f0]"
                      : "border-[#e5ddd7] hover:border-[#f5b066]"
                  }`}
                >
                  <GraduationCap
                    className={`mb-3 h-6 w-6 ${
                      programa === "dentistas"
                        ? "text-[#f58200]"
                        : "text-[#9b8d86]"
                    }`}
                  />
                  <h3 className="font-semibold text-[#2f251f]">
                    Dentistas do Bem
                  </h3>
                  <p className="mt-1 text-sm text-[#7b6f69]">
                    Crianças e jovens de 11 a 17 anos em vulnerabilidade social.
                  </p>
                </button>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#2f251f]">
                Nome completo *
              </label>
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
                <label className="mb-2 block text-sm font-semibold text-[#2f251f]">
                  Data de nascimento *
                </label>
                <input
                  type="date"
                  value={dataNascimento}
                  onChange={(e) => setDataNascimento(e.target.value)}
                  className="w-full rounded-xl border border-[#ddd4ce] bg-white px-4 py-3 outline-none transition focus:border-[#f58200]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#2f251f]">
                  Cidade *
                </label>
                <input
                  type="text"
                  placeholder="Cidade"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                  className="w-full rounded-xl border border-[#ddd4ce] bg-white px-4 py-3 outline-none transition focus:border-[#f58200]"
                />
              </div>
            </div>

            {isDentistas && (
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#2f251f]">
                  Nome do responsável *
                </label>
                <input
                  type="text"
                  placeholder="Nome completo do responsável"
                  value={responsavel}
                  onChange={(e) => setResponsavel(e.target.value)}
                  className="w-full rounded-xl border border-[#ddd4ce] bg-white px-4 py-3 outline-none transition focus:border-[#f58200]"
                />
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#2f251f]">
                  Contato *
                </label>
                <input
                  type="text"
                  placeholder="(00) 00000-0000"
                  value={contato}
                  onChange={(e) => setContato(e.target.value)}
                  className="w-full rounded-xl border border-[#ddd4ce] bg-white px-4 py-3 outline-none transition focus:border-[#f58200]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#2f251f]">
                  Email *
                </label>
                <input
                  type="email"
                  placeholder="voce@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-[#ddd4ce] bg-white px-4 py-3 outline-none transition focus:border-[#f58200]"
                />
              </div>
            </div>

            {isDentistas && (
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#2f251f]">
                  Escola / origem *
                </label>
                <input
                  type="text"
                  placeholder="Ex: ETEC, ONG..."
                  value={escola}
                  onChange={(e) => setEscola(e.target.value)}
                  className="w-full rounded-xl border border-[#ddd4ce] bg-white px-4 py-3 outline-none transition focus:border-[#f58200]"
                />
              </div>
            )}

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#2f251f]">
                Observações
              </label>
              <textarea
                rows={4}
                placeholder="Descreva a situação do paciente..."
                value={observacao}
                onChange={(e) => setObservacao(e.target.value)}
                className="w-full resize-none rounded-xl border border-[#ddd4ce] bg-white px-4 py-3 outline-none transition focus:border-[#f58200]"
              />
            </div>

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
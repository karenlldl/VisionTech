import { useState } from "react";
import { ArrowLeft, Send, Stethoscope } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import NavPlataformaInterna from "../../../components/platform/NavPlataformaInterna/NavPlataformaInterna";

const CadastrarDentista = () => {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [cro, setCro] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const dadosDentista = {
      nome: nome,
      sobrenome: sobrenome,
      cro: cro,
      especialidade: especialidade,
      email: email,
    };

    try {
      const response = await fetch("https://vision-xs85.onrender.com/dentistas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosDentista),
      });

      if (!response.ok) {
        const txtErro = await response.text();
        throw new Error(txtErro || "Falha ao salvar no banco de dados.");
      }

      navigate("/admin/equipe/convite-enviado");
    } catch (error: any) {
      console.error(error);
      alert("Erro na integração com o servidor: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfdfc]">
      <NavPlataformaInterna tipoUsuario="admin" />

      <main className="mx-auto max-w-3xl px-6 py-8">
        <Link
          to="/admin/equipe"
          className="mb-6 flex w-fit items-center gap-2 text-sm font-semibold text-[#7c6f67] hover:text-[#f58200]"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para equipe
        </Link>

        <section className="rounded-2xl border border-[#e7dfd8] bg-white p-6 shadow-sm">
          <div className="mb-7 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff4e8] text-[#f58200]">
              <Stethoscope className="h-5 w-5" />
            </div>

            <div>
              <h1 className="text-2xl font-extrabold text-[#2f251f]">
                Cadastrar dentista
              </h1>
              <p className="text-sm text-[#7c6f67]">
                O acesso será enviado por convite para o e-mail cadastrado.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#2f251f]">
                  Nome *
                </label>
                <input
                  required
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="h-11 w-full rounded-xl border border-[#ddd3cb] px-4 outline-none focus:border-[#f58200]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#2f251f]">
                  Sobrenome *
                </label>
                <input
                  required
                  value={sobrenome}
                  onChange={(e) => setSobrenome(e.target.value)}
                  className="h-11 w-full rounded-xl border border-[#ddd3cb] px-4 outline-none focus:border-[#f58200]"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#2f251f]">
                  CRO *
                </label>
                <input
                  required
                  placeholder="Ex: CRO-SP 123456"
                  value={cro}
                  onChange={(e) => setCro(e.target.value)}
                  className="h-11 w-full rounded-xl border border-[#ddd3cb] px-4 outline-none focus:border-[#f58200]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#2f251f]">
                  Especialidade *
                </label>
                <input
                  required
                  placeholder="Ex: Odontopediatria"
                  value={especialidade}
                  onChange={(e) => setEspecialidade(e.target.value)}
                  className="h-11 w-full rounded-xl border border-[#ddd3cb] px-4 outline-none focus:border-[#f58200]"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#2f251f]">
                E-mail *
              </label>
              <input
                required
                type="email"
                placeholder="dentista@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 w-full rounded-xl border border-[#ddd3cb] px-4 outline-none focus:border-[#f58200]"
              />
            </div>

            <div className="rounded-xl bg-[#fff4e8] p-4 text-sm text-[#7c6f67]">
              A senha não será criada pelo administrador. O sistema enviará um
              convite para que o dentista crie a própria senha com segurança.
            </div>

            <button
              type="submit"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#f58200] font-bold text-white transition hover:bg-[#df7600]"
            >
              <Send className="h-4 w-4" />
              Cadastrar e enviar convite
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default CadastrarDentista;
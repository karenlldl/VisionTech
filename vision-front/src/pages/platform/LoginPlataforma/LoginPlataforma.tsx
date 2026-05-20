import { useState } from "react";
import { LogIn, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const LoginPlataforma = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErro("");

    const emailNormalizado = email.trim().toLowerCase();

    if (!emailNormalizado || !senha) {
      setErro("Preencha e-mail e senha para continuar.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8081/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailNormalizado,
          senha: senha
        }),
      });

      if (!response.ok) {
        const msgErro = await response.text();
        throw new Error(msgErro || "Falha no login");
      }

      const data = await response.json();
      
      localStorage.setItem("tipoAcesso", data.tipoAcesso);
      localStorage.setItem("idUsuarioLogado", String(data.id || data.idFuncionario || "11"));

      if (data.tipoAcesso === "ADMIN") {
        navigate("/admin");
      } else if (data.tipoAcesso === "DENTISTA") {
        navigate("/dentista"); 
      } else {
        throw new Error("Tipo de acesso desconhecido pelo sistema.");
      }

    } catch (error: any) {
      setErro(error.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fdfdfc] px-5 font-sans text-[#2f251f]">
      <main className="w-full max-w-97.5">
        <Link to="/" className="mb-8 flex items-center justify-center gap-2" aria-label="Voltar para a página inicial">
          <img src="/img/logo-laranja.png" alt="Vision Technology" className="h-12 w-auto object-contain" />
        </Link>

        <section className="rounded-xl border border-[#ded7d1] bg-white px-6 py-7 shadow-sm">
          <div className="mb-7 text-center">
            <h1 className="text-2xl font-extrabold text-[#2f251f]">Área interna</h1>
            <p className="mt-2 text-sm text-[#6f625d]">Acesso para equipe e dentistas voluntários</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold text-[#2f251f]">E-mail</label>
              <input
                id="email"
                type="email"
                placeholder="seu@email.com"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="h-11 w-full rounded-lg border border-[#ded7d1] bg-white px-3 text-sm outline-none transition placeholder:text-[#8f8580] focus:border-[#f58200] focus:ring-2 focus:ring-[#f58200]/20"
              />
            </div>

            <div>
              <label htmlFor="senha" className="mb-2 block text-sm font-semibold text-[#2f251f]">Senha</label>
              <input
                id="senha"
                type="password"
                placeholder="••••••••"
                required
                value={senha}
                onChange={(event) => setSenha(event.target.value)}
                className="h-11 w-full rounded-lg border border-[#ded7d1] bg-white px-3 text-sm outline-none transition placeholder:text-[#8f8580] focus:border-[#f58200] focus:ring-2 focus:ring-[#f58200]/20"
              />
            </div>

            {erro && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-500">{erro}</p>}

            <button type="submit" className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#f58200] text-sm font-extrabold text-white transition hover:bg-[#df7600]">
              <LogIn className="h-4 w-4" /> Entrar
            </button>
          </form>
        </section>

        <Link to="/plataforma" className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-[#ded7d1] bg-white px-4 py-3 text-sm font-semibold text-[#2f251f] transition hover:bg-[#f7f4f1]">
          <ArrowLeft className="h-4 w-4" /> Voltar para o início
        </Link>
      </main>
    </div>
  );
};

export default LoginPlataforma;
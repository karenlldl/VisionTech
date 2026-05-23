import { useEffect, useState } from "react";
import { Eye, EyeOff, Lock, CheckCircle, AlertCircle } from "lucide-react";

export default function DefinirSenha() {
  const [token, setToken] = useState<string | null>(null);
  const [tokenValido, setTokenValido] = useState<boolean | null>(null);

  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenUrl = params.get("token");

    if (!tokenUrl) {
      setTokenValido(false);
      return;
    }

    setToken(tokenUrl);
    setTokenValido(true);
  }, []);

async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setMensagem("");

    if (!senha || !confirmarSenha) {
      setMensagem("Preencha todos os campos.");
      return;
    }

    if (senha.length < 6) {
      setMensagem("A senha precisa ter pelo menos 6 caracteres.");
      return;
    }

    if (senha !== confirmarSenha) {
      setMensagem("As senhas não coincidem.");
      return;
    }

    setCarregando(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await fetch(`${API_URL}/auth/create-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          password: senha,
        }),
      });

      if (!response.ok) {
        const erro = await response.text();
        throw new Error(erro || "Erro ao definir senha");
      }

      setMensagem("Senha definida com sucesso!");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);

    } catch (error: any) {
      setMensagem(error.message);
    } finally {
      setCarregando(false);
    }
  }

  if (tokenValido === null) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fdfdfc] px-6 font-sans">
        <p className="text-[#6f625d]">Validando link...</p>
      </main>
    );
  }

  if (tokenValido === false) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fdfdfc] px-6 font-sans">
        <div className="w-full max-w-md rounded-2xl border border-[#e4ded9] bg-white p-8 text-center shadow-sm">
          <AlertCircle className="mx-auto mb-4 h-12 w-12 text-[#f58200]" />

          <h1 className="text-2xl font-extrabold text-[#2f251f]">
            Link inválido ou expirado
          </h1>

          <p className="mt-4 text-sm leading-relaxed text-[#6f625d]">
            O link usado para definir a senha não é válido ou já expirou.
            Solicite um novo link para continuar.
          </p>

          <button
            onClick={() => (window.location.href = "/")}
            className="mt-6 rounded-lg bg-[#f58200] px-6 py-3 font-bold text-white transition hover:bg-[#df7600]"
          >
            Voltar para o início
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fdfdfc] px-6 font-sans text-[#2f251f]">
      <section className="w-full max-w-md rounded-2xl border border-[#e4ded9] bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <img
            src="img/logo-laranja.png"
            alt="Vision Technology"
            className="mx-auto mb-6 h-12 w-auto object-contain"
          />

          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#fff4e8]">
            <Lock className="h-6 w-6 text-[#f58200]" />
          </div>

          <h1 className="text-3xl font-extrabold">
            Defina sua senha
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-[#6f625d]">
            Crie uma senha para acessar sua conta na plataforma Vision.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-bold">
              Nova senha
            </label>

            <div className="relative">
              <input
                type={mostrarSenha ? "text" : "password"}
                value={senha}
                onChange={(event) => setSenha(event.target.value)}
                placeholder="Digite sua senha"
                className="w-full rounded-lg border border-[#ded7d1] px-4 py-3 pr-11 text-sm outline-none transition focus:border-[#f58200] focus:ring-2 focus:ring-[#f58200]/20"
              />

              <button
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6f625d]"
              >
                {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold">
              Confirmar senha
            </label>

            <input
              type={mostrarSenha ? "text" : "password"}
              value={confirmarSenha}
              onChange={(event) => setConfirmarSenha(event.target.value)}
              placeholder="Confirme sua senha"
              className="w-full rounded-lg border border-[#ded7d1] px-4 py-3 text-sm outline-none transition focus:border-[#f58200] focus:ring-2 focus:ring-[#f58200]/20"
            />
          </div>

          {mensagem && (
            <div className="flex items-center gap-2 rounded-lg bg-[#fff4e8] px-4 py-3 text-sm font-medium text-[#7a4a00]">
              {mensagem.includes("sucesso") ? (
                <CheckCircle size={18} />
              ) : (
                <AlertCircle size={18} />
              )}
              <span>{mensagem}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={carregando}
            className="w-full rounded-lg bg-[#f58200] px-6 py-3 font-bold text-white transition hover:bg-[#df7600] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {carregando ? "Definindo senha..." : "Definir senha"}
          </button>
        </form>
      </section>
    </main>
  );
}
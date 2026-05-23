import { Link } from "react-router-dom";
import { Home, AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fdfdfc] px-6 font-sans text-[#2f251f]">
      <section className="w-full max-w-lg rounded-2xl border border-[#e4ded9] bg-white p-8 text-center shadow-sm">

        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#fff4e8]">
          <AlertTriangle className="h-7 w-7 text-[#f58200]" />
        </div>

        <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-[#b5bb0f]">
          Erro 404
        </p>

        <h1 className="text-3xl font-extrabold">
          Página não encontrada
        </h1>

        <p className="mt-4 text-sm leading-relaxed text-[#6f625d]">
          O endereço que você tentou acessar não existe ou pode ter sido
          removido. Volte para a página inicial da plataforma Vision.
        </p>

        <Link
          to="/plataforma"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-[#f58200] px-6 py-3 font-bold text-white transition hover:bg-[#df7600]"
        >
          <Home size={18} />
          Voltar para o início
        </Link>
      </section>
    </main>
  );
}
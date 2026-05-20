import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import NavPlataformaHome from "../../../components/platform/NavPlataformaHome/NavPlataformaHome";


const CadastroEnviado = () => {
  return (
    <div className="min-h-screen bg-[#fdfdfc] font-sans text-[#2f251f]">
      <NavPlataformaHome />

      <main className="flex min-h-[calc(100vh-68px)] items-center justify-center px-5 py-10">
        <section className="flex w-full max-w-[460px] flex-col items-center rounded-xl border border-[#ded7d1] bg-white px-8 py-10 text-center shadow-sm">
          <CheckCircle className="mb-6 h-16 w-16 text-[#B5BB0F]" />

          <h1 className="text-2xl font-extrabold text-[#2f251f]">
            Cadastro enviado!
          </h1>

          <p className="mt-5 max-w-[360px] text-base leading-relaxed text-[#6f625d]">
            Recebemos suas informações e fotos. Nossa equipe fará a avaliação e
            entrará em contato quando houver disponibilidade.
          </p>

          <Link
            to="/"
            className="mt-6 rounded-lg border border-[#ded7d1] bg-white px-5 py-2.5 text-sm font-semibold text-[#2f251f] transition hover:bg-[#f7f4f1]"
          >
            Voltar ao início
          </Link>
        </section>
      </main>
    </div>
  );
};

export default CadastroEnviado;
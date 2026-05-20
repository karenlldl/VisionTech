import { CheckCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import NavPlataformaInterna from "../../../components/platform/NavPlataformaInterna/NavPlataformaInterna";


const ConviteEnviado = () => {
  return (
    <div className="min-h-screen bg-[#fdfdfc]">
      <NavPlataformaInterna tipoUsuario="admin" />

      <main className="flex min-h-[calc(100vh-68px)] items-center justify-center px-6 py-8">
        <section className="w-full max-w-xl rounded-2xl border border-[#e7dfd8] bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
            <CheckCircle className="h-9 w-9" />
          </div>

          <h1 className="mt-6 text-3xl font-extrabold text-[#2f251f]">
            Convite enviado!
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-[#7c6f67]">
            Um convite foi enviado para o e-mail cadastrado. A pessoa receberá
            um link seguro para criar a própria senha e acessar a plataforma.
          </p>

          <p className="mt-2 text-sm leading-relaxed text-[#7c6f67]">
            O administrador não terá acesso à senha criada pelo usuário.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/admin/equipe"
              className="flex h-11 items-center justify-center gap-2 rounded-xl border border-[#ddd3cb] px-5 text-sm font-bold text-[#2f251f] transition hover:bg-[#f6f1ec]"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar para equipe
            </Link>

            <Link
              to="/admin"
              className="flex h-11 items-center justify-center rounded-xl bg-[#f58200] px-5 text-sm font-bold text-white transition hover:bg-[#df7600]"
            >
              Ir para o painel
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ConviteEnviado;
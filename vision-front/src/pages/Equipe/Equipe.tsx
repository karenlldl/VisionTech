import { Link } from "react-router-dom";
import { Stethoscope, UserRoundPlus, ArrowRight } from "lucide-react";
import NavPlataformaInterna from "../../components/NavPlataformaInterna/NavPlataformaInterna";

const Equipe = () => {
  return (
    <div className="min-h-screen bg-[#fdfdfc]">
      <NavPlataformaInterna tipoUsuario="admin" />

      <main className="mx-auto max-w-5xl px-6 py-8">
        <div>
          <h1 className="text-3xl font-extrabold text-[#2f251f]">
            Equipe
          </h1>

          <p className="mt-1 text-sm text-[#7c6f67]">
            Cadastre e gerencie dentistas voluntários e funcionários da plataforma.
          </p>
        </div>

        <section className="mt-8 grid gap-6 md:grid-cols-2">
          <Link
            to="/admin/equipe/cadastrar-dentista"
            className="group rounded-2xl border border-[#e7dfd8] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#f58200] hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#fff4e8] text-[#f58200]">
              <Stethoscope className="h-6 w-6" />
            </div>

            <h2 className="mt-5 text-xl font-extrabold text-[#2f251f]">
              Cadastrar dentista
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-[#7c6f67]">
              Adicione dentistas voluntários.
            </p>

            <div className="mt-5 flex items-center gap-2 text-sm font-bold text-[#f58200]">
              Abrir cadastro
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </div>
          </Link>

          <Link
            to="/admin/equipe/cadastrar-funcionario"
            className="group rounded-2xl border border-[#e7dfd8] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#f58200] hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#fff4e8] text-[#f58200]">
              <UserRoundPlus className="h-6 w-6" />
            </div>

            <h2 className="mt-5 text-xl font-extrabold text-[#2f251f]">
              Cadastrar funcionário
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-[#7c6f67]">
              Adicione usuários administrativos.
            </p>

            <div className="mt-5 flex items-center gap-2 text-sm font-bold text-[#f58200]">
              Abrir cadastro
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </div>
          </Link>
        </section>
      </main>
    </div>
  );
};

export default Equipe;
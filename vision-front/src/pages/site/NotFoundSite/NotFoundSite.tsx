import { Link } from "react-router-dom";

const NotFoundSite = () => {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-brand-mist px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="display text-[7rem] leading-none text-brand-ember sm:text-[9rem] md:text-[11rem]">
          404
        </h1>

        <h2 className="mt-6 text-3xl font-semibold tracking-tight text-brand-dark sm:text-4xl">
          Página não encontrada
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          A página que você procura não existe ou foi movida. Vamos te levar de
          volta.
        </p>

        <Link
          to="/"
          className="mt-10 inline-flex items-center justify-center rounded-full bg-brand-dark px-8 py-4 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-brand-orange hover:shadow-float"
        >
          Voltar para o início
        </Link>
      </div>
    </section>
  );
};

export default NotFoundSite;
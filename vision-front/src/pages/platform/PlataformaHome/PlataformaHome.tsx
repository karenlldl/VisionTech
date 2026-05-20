import { Heart, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import NavPlataformaHome from "../../../components/platform/NavPlataformaHome/NavPlataformaHome";
import HomeInfoCard from "../../../components/platform/HomeInfoCard/HomeInfoCard";

const cards = [
  {
    img: "img/escola-icone.png",
    title: "Triagem escolar",
    description:
      "Identificamos crianças que precisam de cuidado em escolas parceiras.",
  },
  {
    img: "img/avaliacao-icone.png",
    title: "Avaliação cuidadosa",
    description:
      "Cada caso é analisado com atenção pela nossa equipe de profissionais.",
  },
  {
    img: "img/campanha-icone.png",
    title: "Campanha anual",
    description:
      "Organizamos campanhas para atender o maior número de pessoas possível.",
  },
];

const PlataformaHome = () => {
    return (
        <>
        <div className="flex min-h-screen flex-col bg-[#fdfdfc] text-[#2f251f]">
      <NavPlataformaHome />

      <main className="flex flex-1 flex-col items-center px-6 pt-20">
        <div className="mb-6 flex items-center gap-2 rounded-full bg-[#b5bb0f] px-4 py-2 text-sm font-bold text-white">
          <Heart className="h-4 w-4" />
          <span>Cuidado odontológico para todos</span>
        </div>

        <section className="flex max-w-3xl flex-col items-center text-center">
          <h1 className="max-w-[720px] text-5xl font-extrabold leading-[0.95] tracking-tight text-[#2f251f] md:text-6xl">
            Sorrisos que transformam vidas
          </h1>

          <p className="mt-6 max-w-[540px] text-xl leading-relaxed text-[#7b716d]">
            A Vision organiza e melhora o acesso ao tratamento odontológico para
            pessoas em situação de vulnerabilidade. Juntos, podemos fazer a
            diferença.
          </p>

<div className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
  <Link
    to="/cadastro"
    className="flex w-full max-w-[430px] items-center justify-center gap-3 rounded-lg bg-[#B5BB0F] px-8 py-3.5 text-center text-base font-bold text-white transition hover:bg-[#d9df3b] sm:w-auto md:min-w-[430px]"
  >
    <span className="md:whitespace-nowrap">
      Preciso de atendimento odontológico
    </span>
    <ArrowRight className="h-4 w-4 shrink-0" />
  </Link>

  <Link
  to="/login"
  className="flex w-full max-w-[430px] items-center justify-center gap-3 rounded-lg bg-[#f58200] px-8 py-3.5 text-center text-base font-bold text-white transition hover:bg-[#feae52] sm:w-auto md:min-w-[430px]"
>
  <Users className="h-4 w-4 shrink-0" />
  <span className="md:whitespace-nowrap">
    Sou da equipe / admin e dentistas
  </span>
  <ArrowRight className="h-4 w-4 shrink-0" />
</Link>
</div>
        </section>

        <section className="mt-20 grid w-full max-w-[890px] grid-cols-1 gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <HomeInfoCard
              key={card.title}
              img={card.img}
              title={card.title}
              description={card.description}
            />
          ))}
        </section>
      </main>

      <footer className="mt-20 border-t border-[#e4ded9] bg-white px-6 py-6 text-center text-sm text-[#6f625d]">
        © 2026 Vision — Todos os direitos reservados. Feito com 🧡 para
        transformar sorrisos.
      </footer>
    </div>
        </>
    )
}
export default PlataformaHome;
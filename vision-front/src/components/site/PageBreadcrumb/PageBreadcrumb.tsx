import { ArrowLeft, ChevronRight, Home } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

type PageBreadcrumbProps = {
  currentPage: string;
};

const PageBreadcrumb = ({ currentPage }: PageBreadcrumbProps) => {
  const navigate = useNavigate();

  return (
    <div className="mb-10 flex flex-wrap items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.32em] sm:text-[11px]">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="group flex items-center gap-2 text-brand-orange transition hover:text-brand-ember"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Voltar
      </button>

      <span className="h-4 w-px bg-border" />

      <nav className="flex flex-wrap items-center gap-2 text-muted-foreground">
        <Link
          to="/"
          className="flex items-center gap-2 transition hover:text-brand-orange"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black/5">
            <Home className="h-3.5 w-3.5" />
          </span>
          Início
        </Link>

        <ChevronRight className="h-4 w-4 text-muted-foreground/60" />

        <span className="rounded-full bg-black/5 px-3 py-1.5 text-brand-dark">
          {currentPage}
        </span>
      </nav>
    </div>
  );
};

export default PageBreadcrumb;
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NavPlataformaHome = () => {
    const navigate = useNavigate();
    return (
        <>
      <header className="flex h-[68px] items-center justify-between border-b border-[#e4ded9] bg-white px-6">
        <button
  type="button"
  onClick={() => navigate("/plataforma")}
  className="flex items-center"
  aria-label="Voltar para a home da plataforma"
>
  <img
    src="/img/logo-laranja.png"
    alt="Vision Technology"
    className="h-7 w-auto object-contain"
  />
</button>

        <Link
        to="/login"
        className="rounded-xl border border-[#e4ded9] bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#f7f4f1]">
          Entrar
        </Link>
      </header>
        </>
    )
}
export default NavPlataformaHome;
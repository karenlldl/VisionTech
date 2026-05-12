import NavPlataformaInterna from "../../components/NavPlataformaInterna/NavPlataformaInterna";

const DentistaHome = () => {
  return (
    <div className="min-h-screen bg-[#fdfdfc]">
      <NavPlataformaInterna tipoUsuario="dentista" />

      <main className="px-6 py-8">
        <h1 className="text-2xl font-bold text-[#2f251f]">
          Meus pacientes
        </h1>
      </main>
    </div>
  );
};

export default DentistaHome;
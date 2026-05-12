import NavPlataformaInterna from "../../components/NavPlataformaInterna/NavPlataformaInterna";

const AdminHome = () => {
  return (
    <div className="min-h-screen bg-[#fdfdfc]">
      <NavPlataformaInterna tipoUsuario="admin" />

      <main className="px-6 py-8">
        <h1 className="text-2xl font-bold text-[#2f251f]">
          Painel do administrador
        </h1>
      </main>
    </div>
  );
};

export default AdminHome;
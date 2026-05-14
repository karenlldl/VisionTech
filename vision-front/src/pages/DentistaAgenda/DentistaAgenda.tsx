import NavPlataformaInterna from "../../components/NavPlataformaInterna/NavPlataformaInterna";
import AgendaSemanal from "../../components/Agenda/AgendaSemanal";

const eventosDentista = [
  {
    id: 1,
    paciente: "Maria Silva",
    dentista: "Dra. Camila Santos",
    dia: "SEG",
    horario: "09:00",
    status: "Aguardando",
    prioridade: "Baixa",
  },
  {
    id: 2,
    paciente: "Lucas Oliveira",
    dentista: "Dra. Camila Santos",
    dia: "QUA",
    horario: "14:00",
    status: "Em atendimento",
    prioridade: "Média",
  },
] as const;

const DentistaAgenda = () => {
  return (
    <div className="min-h-screen bg-[#fdfdfc]">
      <NavPlataformaInterna tipoUsuario="dentista" />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <AgendaSemanal
          titulo="Minha agenda"
          modo="dentista"
          eventos={[...eventosDentista]}
        />
      </main>
    </div>
  );
};

export default DentistaAgenda;
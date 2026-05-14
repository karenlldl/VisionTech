import AgendaSemanal from "../../components/Agenda/AgendaSemanal";
import NavPlataformaInterna from "../../components/NavPlataformaInterna/NavPlataformaInterna";

const eventos = [
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
    paciente: "Luana Lima",
    dentista: "Dr. Rafael Lima",
    dia: "TER",
    horario: "10:00",
    status: "Em atendimento",
    prioridade: "Alta",
  },
  {
    id: 3,
    paciente: "Lucas Oliveira",
    dentista: "Dra. Camila Santos",
    dia: "QUA",
    horario: "14:00",
    status: "Concluído",
    prioridade: "Média",
  },
] as const;


const AdminAgenda = () => {
    return (
        <>
        <div className="min-h-screen bg-[#fdfdfc]">
      <NavPlataformaInterna tipoUsuario="admin" />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <AgendaSemanal
          titulo="Agenda geral"
          modo="admin"
          eventos={[...eventos]}
        />
      </main>
    </div>
        </>
    )
}
export default AdminAgenda;
import { CalendarDays, ChevronLeft, ChevronRight, Search } from "lucide-react";

type EventoAgenda = {
  id: number;
  paciente: string;
  dentista: string;
  dia: "SEG" | "TER" | "QUA" | "QUI" | "SEX";
  horario: string;
  status: string; // Alterado para string para aceitar qualquer vindo do banco
  prioridade: "Baixa" | "Média" | "Alta";
};

interface AgendaSemanalProps {
  titulo: string;
  modo: "admin" | "dentista";
  eventos: EventoAgenda[];
}

const dias = ["SEG", "TER", "QUA", "QUI", "SEX"] as const;
const horarios = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];

const statusColor: Record<string, string> = {
  Aguardando: "bg-orange-100 border-orange-300 text-orange-800",
  "Em atendimento": "bg-purple-100 border-purple-300 text-purple-800",
  Concluído: "bg-green-100 border-green-300 text-green-800",
  "Sem dentista": "bg-gray-100 border-gray-300 text-gray-800",
};

const AgendaSemanal = ({ titulo = "Agenda", eventos, modo }: AgendaSemanalProps) => {
  return (
    <section className="rounded-2xl border border-[#e7dfd8] bg-white p-5 shadow-sm">
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-[#f58200]" />
            <h2 className="text-2xl font-bold text-[#2f251f]">{titulo}</h2>
          </div>
          <p className="mt-1 text-sm text-[#7c6f67]">
            Visualização semanal (Modo: {modo}).
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button className="rounded-lg border border-[#ddd3cb] px-3 py-2 text-sm font-semibold hover:bg-[#f6f1ec]">
            Hoje
          </button>
          <button className="rounded-lg border border-[#ddd3cb] p-2 hover:bg-[#f6f1ec]">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button className="rounded-lg border border-[#ddd3cb] p-2 hover:bg-[#f6f1ec]">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mb-5 flex h-11 items-center gap-2 rounded-xl border border-[#ddd3cb] px-3">
        <Search className="h-4 w-4 text-[#7c6f67]" />
        <input
          placeholder="Buscar paciente, dentista ou horário..."
          className="h-full w-full bg-transparent text-sm outline-none"
        />
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[900px]">
          <div className="grid grid-cols-[80px_repeat(5,1fr)] border-b border-[#e7dfd8]">
            <div className="p-3 text-xs font-bold text-[#7c6f67]">HORÁRIO</div>
            {dias.map((dia) => (
              <div key={dia} className="border-l border-[#e7dfd8] p-3 text-center">
                <p className="text-sm font-bold text-[#2f251f]">{dia}</p>
              </div>
            ))}
          </div>

          {horarios.map((hora) => (
            <div key={hora} className="grid min-h-[82px] grid-cols-[80px_repeat(5,1fr)] border-b border-[#f1ebe6]">
              <div className="p-3 text-xs font-semibold text-[#7c6f67]">{hora}</div>
              {dias.map((dia) => {
                const eventosCelula = eventos.filter(
                  (evento) => evento.dia === dia && evento.horario === hora
                );

                return (
                  <div key={`${dia}-${hora}`} className="relative border-l border-[#f1ebe6] p-2">
                    {eventosCelula.map((evento) => (
                      <button
                        key={evento.id}
                        className={`mb-2 w-full rounded-lg border p-2 text-left text-xs shadow-sm transition hover:scale-[1.01] ${
                          statusColor[evento.status] || statusColor["Sem dentista"]
                        }`}
                      >
                        <p className="font-extrabold">{evento.paciente}</p>
                        <p className="mt-1">{evento.horario}</p>
                        <p className="mt-1 truncate">{evento.dentista}</p>
                      </button>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgendaSemanal;
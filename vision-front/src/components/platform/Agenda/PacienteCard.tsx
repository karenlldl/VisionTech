import {
  Eye,
  Building2,
  Globe,
  Stethoscope,
} from "lucide-react";
import type { Paciente } from "../../data/pacientes";


type Props = {
  paciente: Paciente;

  onVerDetalhes?: () => void;

  onAtender?: () => void;

  mostrarBotaoAtender?: boolean;
};

const PacienteCard = ({
  paciente,
  onVerDetalhes,
  onAtender,
  mostrarBotaoAtender = false,
}: Props) => {
  const prioridadeStyle = {
    Baixa:
      "bg-green-100 text-green-700 border border-green-200",

    Média:
      "bg-yellow-100 text-yellow-700 border border-yellow-200",

    Alta:
      "bg-red-100 text-red-700 border border-red-200",
  };

  const statusStyle = {
    "Sem dentista":
      "bg-gray-100 text-gray-700",

    Aguardando:
      "bg-orange-100 text-orange-700",

    "Em atendimento":
      "bg-purple-100 text-purple-700",

    Concluído:
      "bg-green-100 text-green-700",
  };

  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-[#e7dfd8] bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-2xl font-bold text-[#2f251f]">
            {paciente.nome}
          </h2>

          <span className="text-[#7c6f67]">
            ({paciente.idade} anos)
          </span>

          <span className="flex items-center gap-1 rounded-full bg-[#f6f1ec] px-3 py-1 text-sm text-[#7c6f67]">
            {paciente.origemIcone === "globe" ? (
              <Globe className="h-3 w-3 text-sky-500" />
            ) : (
              <Building2 className="h-3 w-3" />
            )}

            {paciente.origem}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full px-3 py-1 text-sm font-semibold ${
              statusStyle[
                paciente.status as keyof typeof statusStyle
              ]
            }`}
          >
            {paciente.status}
          </span>

          <span
            className={`rounded-full px-3 py-1 text-sm font-semibold ${
              prioridadeStyle[
                paciente.prioridade as keyof typeof prioridadeStyle
              ]
            }`}
          >
            {paciente.prioridade}
          </span>

          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
            {paciente.data}
          </span>

          {paciente.dentista && (
            <span className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-700">
              {paciente.dentista}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={onVerDetalhes}
          className="flex items-center gap-2 rounded-xl border border-[#ddd3cb] px-5 py-2 font-medium transition hover:bg-[#f6f1ec]"
        >
          <Eye className="h-4 w-4" />
          Detalhes
        </button>

        {mostrarBotaoAtender && (
          <button
            onClick={onAtender}
            className="flex items-center gap-2 rounded-xl bg-[#f58200] px-5 py-2 font-bold text-white transition hover:bg-[#df7600]"
          >
            <Stethoscope className="h-4 w-4" />
            Atender
          </button>
        )}
      </div>
    </article>
  );
};

export default PacienteCard;
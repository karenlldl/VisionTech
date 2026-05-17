import { useState } from "react";

import NavPlataformaInterna from "../../components/NavPlataformaInterna/NavPlataformaInterna";

import PacienteCard from "../../components/Agenda/PacienteCard";

import {
  pacientesMock,
  type Paciente,
} from "../../data/pacientes";

const Dentista = () => {
  const [modalAberto, setModalAberto] =
    useState(false);

  const [
    pacienteSelecionado,
    setPacienteSelecionado,
  ] = useState<Paciente | null>(null);

  const [
    descricaoAtendimento,
    setDescricaoAtendimento,
  ] = useState("");

  const abrirModalAtendimento = (
    paciente: Paciente
  ) => {
    setPacienteSelecionado(paciente);
    setModalAberto(true);
  };

  const fecharModalAtendimento = () => {
    setModalAberto(false);

    setPacienteSelecionado(null);

    setDescricaoAtendimento("");
  };

  return (
    <div className="min-h-screen bg-[#fdfdfc]">
      <NavPlataformaInterna tipoUsuario="dentista" />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div>
          <h1 className="text-4xl font-bold text-[#2f251f]">
            Fila de atendimento
          </h1>
        </div>

        <section className="mt-8 flex flex-col gap-4">
          {pacientesMock.map((paciente) => (
            <PacienteCard
              key={paciente.id}
              paciente={paciente}
              mostrarBotaoAtender
              onVerDetalhes={() =>
                abrirModalAtendimento(
                  paciente
                )
              }
              onAtender={() =>
                abrirModalAtendimento(
                  paciente
                )
              }
            />
          ))}
        </section>
      </main>

      {/* MODAL */}
{modalAberto && pacienteSelecionado && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-5">
    <section className="w-full max-w-130 rounded-xl bg-white p-6 shadow-xl">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-[#2f251f]">
            Registrar atendimento
          </h2>

          <p className="mt-1 text-sm text-[#6f625d]">
            Paciente: {pacienteSelecionado.nome} (
            {pacienteSelecionado.idade} anos)
          </p>
        </div>

        <button
          type="button"
          onClick={fecharModalAtendimento}
          className="text-2xl leading-none text-[#6f625d] transition hover:text-[#2f251f]"
        >
          ×
        </button>
      </div>

      {/* DESCRIÇÃO */}
      <div>
        <label
          htmlFor="descricaoAtendimento"
          className="mb-2 block text-sm font-bold text-[#2f251f]"
        >
          O que foi feito? *
        </label>

        <textarea
  id="descricaoAtendimento"
  value={descricaoAtendimento}
  onChange={(event) =>
    setDescricaoAtendimento(event.target.value)
  }
  placeholder="Descreva o procedimento realizado, observações clínicas, próximos passos..."
  rows={5}
  className="w-full resize-none rounded-xl border border-[#f58200] bg-white px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-[#f58200]/20"
/>
      </div>

      {/* ANDAMENTO */}
      <div className="mt-6">
        <p className="mb-3 text-sm font-bold text-[#2f251f]">
          Andamento
        </p>

        <div className="space-y-3">
          {/* EM ANDAMENTO */}
          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-[#ded7d1] px-4 py-4 transition hover:border-[#f58200] hover:bg-[#fffaf5]">
            <input
              type="radio"
              name="andamento"
              value="em-andamento"
              defaultChecked
              className="mt-1 accent-[#f58200]"
            />

            <div>
              <p className="text-sm font-bold text-[#2f251f]">
                🟡 Ainda em andamento
              </p>

              <p className="text-xs text-[#6f625d]">
                Tratamento iniciado, requer mais sessões
              </p>
            </div>
          </label>

          {/* CONCLUÍDO */}
          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-[#ded7d1] px-4 py-4 transition hover:border-[#f58200] hover:bg-[#fffaf5]">
            <input
              type="radio"
              name="andamento"
              value="concluido"
              className="mt-1 accent-[#f58200]"
            />

            <div>
              <p className="text-sm font-bold text-[#2f251f]">
                🟢 Concluído
              </p>

              <p className="text-xs text-[#6f625d]">
                Sessão finalizada, com possível acompanhamento
              </p>
            </div>
          </label>

          {/* COMPLETO */}
          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-[#ded7d1] px-4 py-4 transition hover:border-[#f58200] hover:bg-[#fffaf5]">
            <input
              type="radio"
              name="andamento"
              value="completo"
              className="mt-1 accent-[#f58200]"
            />

            <div>
              <p className="text-sm font-bold text-[#2f251f]">
                ✅ Completo
              </p>

              <p className="text-xs text-[#6f625d]">
                Tratamento integralmente finalizado
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* BOTÕES */}
      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={fecharModalAtendimento}
          className="rounded-lg px-4 py-2 text-sm font-semibold text-[#2f251f] transition hover:bg-[#f7f4f1]"
        >
          Cancelar
        </button>

        <button
          type="button"
          className="rounded-lg bg-[#f58200] px-5 py-2 text-sm font-bold text-white transition hover:bg-[#df7600]"
        >
          Salvar atendimento
        </button>
      </div>
    </section>
  </div>
)}
    </div>
  );
};

export default Dentista;
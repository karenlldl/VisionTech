import { useState } from "react";
import {
  HeartHandshake,
  GraduationCap,
  Send,
} from "lucide-react";

import NavPlataformaInterna from "../../components/NavPlataformaInterna/NavPlataformaInterna";

const NovoPaciente = () => {
  const [programa, setPrograma] = useState("apolonias");

  return (
    <div className="min-h-screen bg-[#fdfdfc]">
      <NavPlataformaInterna tipoUsuario="admin" />

      <main className="mx-auto max-w-3xl px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#2f251f]">
            Novo paciente
          </h1>

          <p className="mt-2 text-[#7b6f69]">
            Cadastre um novo paciente para triagem e
            acompanhamento odontológico.
          </p>
        </div>

        {/* Form */}
        <div className="rounded-2xl border border-[#e9e2dc] bg-white p-6 shadow-sm">
          <form className="space-y-6">
            {/* Programa */}
            <div>
              <label className="mb-3 block text-sm font-semibold text-[#2f251f]">
                Programa desejado *
              </label>

              <div className="grid gap-4 md:grid-cols-2">
                {/* Apolonias */}
                <button
                  type="button"
                  onClick={() => setPrograma("apolonias")}
                  className={`rounded-2xl border p-5 text-left transition ${
                    programa === "apolonias"
                      ? "border-[#f58200] bg-[#fff7f0]"
                      : "border-[#e5ddd7] hover:border-[#f5b066]"
                  }`}
                >
                  <HeartHandshake
                    className={`mb-3 h-6 w-6 ${
                      programa === "apolonias"
                        ? "text-[#f58200]"
                        : "text-[#9b8d86]"
                    }`}
                  />

                  <h3 className="font-semibold text-[#2f251f]">
                    Apolónias do Bem
                  </h3>

                  <p className="mt-1 text-sm text-[#7b6f69]">
                    Mulheres vítimas de violência com a
                    dentição afetada.
                  </p>
                </button>

                {/* Dentistas */}
                <button
                  type="button"
                  onClick={() => setPrograma("dentistas")}
                  className={`rounded-2xl border p-5 text-left transition ${
                    programa === "dentistas"
                      ? "border-[#f58200] bg-[#fff7f0]"
                      : "border-[#e5ddd7] hover:border-[#f5b066]"
                  }`}
                >
                  <GraduationCap
                    className={`mb-3 h-6 w-6 ${
                      programa === "dentistas"
                        ? "text-[#f58200]"
                        : "text-[#9b8d86]"
                    }`}
                  />

                  <h3 className="font-semibold text-[#2f251f]">
                    Dentistas do Bem
                  </h3>

                  <p className="mt-1 text-sm text-[#7b6f69]">
                    Crianças e jovens de 11 a 17 anos em
                    vulnerabilidade social.
                  </p>
                </button>
              </div>
            </div>

            {/* Nome */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#2f251f]">
                Nome completo *
              </label>

              <input
                type="text"
                placeholder="Nome do paciente"
                className="w-full rounded-xl border border-[#ddd4ce] bg-white px-4 py-3 outline-none transition focus:border-[#f58200]"
              />
            </div>

            {/* Linha */}
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#2f251f]">
                  Idade *
                </label>

                <input
                  type="number"
                  placeholder="Ex: 15"
                  className="w-full rounded-xl border border-[#ddd4ce] bg-white px-4 py-3 outline-none transition focus:border-[#f58200]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#2f251f]">
                  Cidade *
                </label>

                <input
                  type="text"
                  placeholder="Cidade"
                  className="w-full rounded-xl border border-[#ddd4ce] bg-white px-4 py-3 outline-none transition focus:border-[#f58200]"
                />
              </div>
            </div>

            {/* Linha */}
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#2f251f]">
                  Contato *
                </label>

                <input
                  type="text"
                  placeholder="(00) 00000-0000"
                  className="w-full rounded-xl border border-[#ddd4ce] bg-white px-4 py-3 outline-none transition focus:border-[#f58200]"
                />
              </div>

              {/* Campo só para Dentistas do Bem */}
              {programa === "dentistas" && (
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#2f251f]">
                    Escola / origem *
                  </label>

                  <input
                    type="text"
                    placeholder="Ex: ETEC, ONG..."
                    className="w-full rounded-xl border border-[#ddd4ce] bg-white px-4 py-3 outline-none transition focus:border-[#f58200]"
                  />
                </div>
              )}
            </div>

            {/* Observações */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#2f251f]">
                Observações
              </label>

              <textarea
                rows={4}
                placeholder="Descreva a situação do paciente..."
                className="w-full resize-none rounded-xl border border-[#ddd4ce] bg-white px-4 py-3 outline-none transition focus:border-[#f58200]"
              />
            </div>

            {/* Botão */}
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#f58200] px-6 py-4 font-semibold text-white transition hover:bg-[#e27100]"
            >
              <Send className="h-4 w-4" />
              Cadastrar paciente
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default NovoPaciente;
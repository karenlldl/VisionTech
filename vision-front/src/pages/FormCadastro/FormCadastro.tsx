import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Stethoscope,
  GraduationCap,
  Image,
  Upload,
  Send,
} from "lucide-react";
import NavPlataformaHome from "../../components/NavPlataformaHome/NavPlataformaHome";

type Programa = "apolonias" | "dentistas";

const FormCadastro = () => {
  const navigate = useNavigate();

  const [programaSelecionado, setProgramaSelecionado] =
    useState<Programa>("apolonias");

  const [idade, setIdade] = useState("");
  const [erroPrograma, setErroPrograma] = useState("");

  const [imagensSelecionadas, setImagensSelecionadas] = useState<string[]>([]);
  const [erroImagens, setErroImagens] = useState("");

  const isApolonias = programaSelecionado === "apolonias";
  const isDentistas = programaSelecionado === "dentistas";

  const idadeInformada = idade.trim() !== "";
  const idadeNumerica = Number(idade);

  const dentistasBloqueado = idadeInformada && idadeNumerica > 17;

  const selectedCardClass = "border-[#f58200] bg-[#fffaf5]";
  const unselectedCardClass =
    "border-[#ded7d1] bg-white hover:border-[#f58200] hover:bg-[#fffaf5]";

  const handleAlterarIdade = (event: React.ChangeEvent<HTMLInputElement>) => {
    const novaIdade = event.target.value;

    setIdade(novaIdade);

    const numero = Number(novaIdade);

    if (programaSelecionado === "dentistas" && numero > 17) {
      setProgramaSelecionado("apolonias");
      setErroPrograma(
        "O programa Dentistas do Bem é permitido apenas para pessoas de até 17 anos."
      );
      return;
    }

    setErroPrograma("");
  };

  const handleSelecionarApolonias = () => {
    setProgramaSelecionado("apolonias");
    setErroPrograma("");
  };

  const handleSelecionarDentistas = () => {
    if (dentistasBloqueado) {
      setProgramaSelecionado("apolonias");
      setErroPrograma(
        "O programa Dentistas do Bem é permitido apenas para pessoas de até 17 anos."
      );
      return;
    }

    setProgramaSelecionado("dentistas");
    setErroPrograma("");
  };

  const handleSelecionarImagens = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;

    if (!files || files.length === 0) {
      setImagensSelecionadas([]);
      setErroImagens("Envie pelo menos uma imagem.");
      return;
    }

    const imagens = Array.from(files).map((file) => URL.createObjectURL(file));

    setImagensSelecionadas(imagens);
    setErroImagens("");
  };

  
const handleEnviarFormulario = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (programaSelecionado === "dentistas" && idadeNumerica > 17) {
      setProgramaSelecionado("apolonias");
      setErroPrograma(
        "O programa Dentistas do Bem é permitido apenas para pessoas de até 17 anos."
      );
      return;
    }

    if (imagensSelecionadas.length === 0) {
      setErroImagens("Envie pelo menos uma imagem antes de continuar.");
      return;
    }

    try {
      const inputNome = (document.getElementById("nome") as HTMLInputElement).value;
      const inputContato = (document.getElementById("contato") as HTMLInputElement).value;
      const inputRenda = (document.getElementById("renda") as HTMLInputElement).value;

      const dadosPaciente = {
        nome: inputNome,
        idade: idadeNumerica,
        telefone: inputContato,
        rendaBrutaTotal: Number(inputRenda),
        programa: programaSelecionado
      };

      const response = await fetch("http://localhost:8081/pacientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosPaciente),
      });

      if (!response.ok) {
        const txtErro = await response.text();
        throw new Error(txtErro || "Erro ao salvar no servidor.");
      }

      navigate("/cadastro-enviado");
    } catch (error: any) {
      alert("Falha na integração: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfdfc] font-sans text-[#2f251f]">
      <NavPlataformaHome />

      <main className="flex min-h-[calc(100vh-68px)] items-start justify-center px-5 py-8 md:py-10">
        <section className="w-full max-w-130 rounded-xl border border-[#ded7d1] bg-white px-6 py-6 shadow-sm md:px-7">
          <div className="mb-7">
            <h1 className="text-2xl font-extrabold tracking-tight text-[#2f251f]">
              Cadastro para avaliação
            </h1>

            <p className="mt-2 text-sm leading-relaxed text-[#6f625d]">
              Preencha seus dados e envie fotos dos seus dentes para que nossa
              equipe possa avaliar sua situação. Entraremos em contato quando
              houver disponibilidade.
            </p>
          </div>

          <form onSubmit={handleEnviarFormulario} className="space-y-5">
            {/* Programa desejado */}
            <div>
              <label className="mb-3 block text-sm font-semibold text-[#2f251f]">
                Programa desejado *
              </label>

              <div className="grid gap-3 sm:grid-cols-2">
                <label
                  className={`cursor-pointer rounded-xl border p-4 transition ${
                    isApolonias ? selectedCardClass : unselectedCardClass
                  }`}
                >
                  <input
                    type="radio"
                    name="programa"
                    value="apolonias"
                    checked={isApolonias}
                    onChange={handleSelecionarApolonias}
                    required
                    className="sr-only"
                  />

                  <Stethoscope
                    className={`mb-4 h-5 w-5 ${
                      isApolonias ? "text-[#f58200]" : "text-[#6f625d]"
                    }`}
                  />

                  <strong className="block text-sm font-extrabold text-[#2f251f]">
                    Apolônias do Bem
                  </strong>

                  <span className="mt-1 block text-xs leading-snug text-[#6f625d]">
                    Mulheres vítimas de violência com a dentição afetada
                  </span>
                </label>

                <label
                  className={`rounded-xl border p-4 transition ${
                    isDentistas ? selectedCardClass : unselectedCardClass
                  } ${
                    dentistasBloqueado
                      ? "cursor-not-allowed opacity-60"
                      : "cursor-pointer"
                  }`}
                  title={
                    dentistasBloqueado
                      ? "Disponível apenas para pessoas de até 17 anos."
                      : ""
                  }
                >
                  <input
                    type="radio"
                    name="programa"
                    value="dentistas"
                    checked={isDentistas}
                    onChange={handleSelecionarDentistas}
                    disabled={dentistasBloqueado}
                    required
                    className="sr-only"
                  />

                  <GraduationCap
                    className={`mb-4 h-5 w-5 ${
                      isDentistas ? "text-[#f58200]" : "text-[#6f625d]"
                    }`}
                  />

                  <strong className="block text-sm font-extrabold text-[#2f251f]">
                    Dentistas do Bem
                  </strong>

                  <span className="mt-1 block text-xs leading-snug text-[#6f625d]">
                    Crianças e jovens de até 17 anos em vulnerabilidade social
                  </span>
                </label>
              </div>

              {erroPrograma && (
                <p className="mt-2 text-xs font-semibold text-red-500">
                  {erroPrograma}
                </p>
              )}
            </div>

            {/* Nome */}
            <div>
              <label
                htmlFor="nome"
                className="mb-2 block text-sm font-semibold text-[#2f251f]"
              >
                Nome completo *
              </label>

              <input
                id="nome"
                type="text"
                placeholder="Seu nome"
                required
                className="h-10 w-full rounded-lg border border-[#ded7d1] bg-white px-3 text-sm outline-none transition placeholder:text-[#8f8580] focus:border-[#f58200] focus:ring-2 focus:ring-[#f58200]/20"
              />
            </div>

            {/* Idade e Cidade */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="idade"
                  className="mb-2 block text-sm font-semibold text-[#2f251f]"
                >
                  Idade *
                </label>

                <input
                  id="idade"
                  type="number"
                  min="1"
                  required
                  value={idade}
                  onChange={handleAlterarIdade}
                  className="h-10 w-full rounded-lg border border-[#ded7d1] bg-white px-3 text-sm outline-none transition focus:border-[#f58200] focus:ring-2 focus:ring-[#f58200]/20"
                />
              </div>

              <div>
                <label
                  htmlFor="cidade"
                  className="mb-2 block text-sm font-semibold text-[#2f251f]"
                >
                  Cidade *
                </label>

                <input
                  id="cidade"
                  type="text"
                  required
                  className="h-10 w-full rounded-lg border border-[#ded7d1] bg-white px-3 text-sm outline-none transition focus:border-[#f58200] focus:ring-2 focus:ring-[#f58200]/20"
                />
              </div>
            </div>

            {/* Contato e Renda */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contato"
                  className="mb-2 block text-sm font-semibold text-[#2f251f]"
                >
                  Contato *
                </label>

                <input
                  id="contato"
                  type="tel"
                  placeholder="(00) 00000-0000"
                  required
                  className="h-10 w-full rounded-lg border border-[#ded7d1] bg-white px-3 text-sm outline-none transition placeholder:text-[#8f8580] focus:border-[#f58200] focus:ring-2 focus:ring-[#f58200]/20"
                />
              </div>

              <div>
                <label
                  htmlFor="renda"
                  className="mb-2 block text-sm font-semibold text-[#2f251f]"
                >
                  Renda familiar (R$) *
                </label>

                <input
                  id="renda"
                  type="number"
                  min="0"
                  placeholder="Ex: 1200"
                  required
                  className="h-10 w-full rounded-lg border border-[#ded7d1] bg-white px-3 text-sm outline-none transition placeholder:text-[#8f8580] focus:border-[#f58200] focus:ring-2 focus:ring-[#f58200]/20"
                />
              </div>
            </div>

            {/* Situação */}
            <div>
              <label
                htmlFor="situacao"
                className="mb-2 block text-sm font-semibold text-[#2f251f]"
              >
                Situação *
              </label>

              <textarea
                id="situacao"
                rows={4}
                placeholder="Descreva brevemente sua situação..."
                required
                className="w-full resize-none rounded-lg border border-[#ded7d1] bg-white px-3 py-3 text-sm outline-none transition placeholder:text-[#8f8580] focus:border-[#f58200] focus:ring-2 focus:ring-[#f58200]/20"
              />
            </div>

            {/* Upload */}
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Image className="h-4 w-4 text-[#2f251f]" />

                <label className="text-sm font-semibold text-[#2f251f]">
                  Envio de fotos dos dentes *
                </label>
              </div>

              <p className="mb-3 text-xs leading-relaxed text-[#6f625d]">
                Envie fotos dos seus dentes para que nossa equipe possa fazer
                uma pré-avaliação mais precisa. Você pode enviar mais de uma
                foto para facilitar a avaliação.
              </p>

              <label
                htmlFor="fotos"
                className={`flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed bg-white text-sm font-semibold text-[#2f251f] transition hover:border-[#f58200] hover:bg-[#fffaf5] ${
                  erroImagens ? "border-red-400" : "border-[#ded7d1]"
                }`}
              >
                <Upload className="h-4 w-4" />
                Selecionar imagens
              </label>

              <input
                id="fotos"
                type="file"
                accept="image/*"
                multiple
                onChange={handleSelecionarImagens}
                className="hidden"
              />

              {erroImagens && (
                <p className="mt-2 text-xs font-semibold text-red-500">
                  {erroImagens}
                </p>
              )}

              {imagensSelecionadas.length > 0 && (
                <div className="mt-4">
                  <p className="mb-2 text-xs font-semibold text-[#6f625d]">
                    Imagens selecionadas:
                  </p>

                  <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                    {imagensSelecionadas.map((imagem, index) => (
                      <div
                        key={index}
                        className="aspect-square overflow-hidden rounded-lg border border-[#ded7d1] bg-[#fdfdfc]"
                      >
                        <img
                          src={imagem}
                          alt={`Imagem selecionada ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#f58200] text-sm font-extrabold text-white transition hover:bg-[#df7600]"
            >
              <Send className="h-4 w-4" />
              Enviar para avaliação
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default FormCadastro;
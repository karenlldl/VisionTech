import { useState } from "react";
import { useForm } from "react-hook-form";
import { CheckCircle } from "lucide-react";
import { Reveal } from "../../../components/site/ui/motion";
import PageBreadcrumb from "../../../components/site/PageBreadcrumb/PageBreadcrumb";
import { contactItems } from "../../../data/site/contact";



type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

const Contato = () => {
  const [successMessage, setSuccessMessage] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>();

  const onSubmit = (data: ContactFormData) => {
    console.log("Mensagem enviada:", data);

    setSuccessMessage(true);
    reset();

    setTimeout(() => {
      setSuccessMessage(false);
    }, 4000);
  };

  return (
    <section className="min-h-screen bg-brand-mist px-4 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-32 lg:px-8 lg:pb-32">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <div>
            <PageBreadcrumb currentPage="Contato" />
            <p className="mb-5 inline-flex rounded-full bg-black/5 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground sm:text-xs">
              Contato
            </p>

            <h1 className="display text-4xl leading-[0.95] sm:text-5xl md:text-6xl lg:text-7xl">
              Vamos{" "}
              <span className="font-display text-brand-orange">conversar</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg">
              Tem interesse em conhecer mais sobre o projeto Vision? Entre em
              contato com nossa equipe.
            </p>

            <div className="mt-10 space-y-4 sm:mt-12 sm:space-y-5">
              {contactItems.map((item) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.label}
                    className="flex items-center gap-4 rounded-3xl border border-border bg-white p-4 shadow-soft sm:gap-5 sm:p-5"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#C10801] to-[#E85002] text-white shadow-glow sm:h-12 sm:w-12">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm text-muted-foreground">
                        {item.label}
                      </p>
                      <p className="mt-1 wrap-break-word text-base font-semibold text-brand-dark sm:text-lg">
                        {item.value}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-[28px] border border-border bg-white p-5 shadow-float sm:rounded-4x1 sm:p-6 md:p-8"
          >
            {successMessage && (
              <div className="mb-6 flex items-center gap-3 rounded-2xl border border-brand-orange/20 bg-brand-orange/10 px-4 py-3 text-sm font-medium text-brand-orange">
                <CheckCircle className="h-5 w-5 shrink-0" />
                <span>Sua mensagem foi enviada com sucesso.</span>
              </div>
            )}

            <div className="space-y-5 sm:space-y-6">
              <div>
                <label className="mb-2 block text-sm font-semibold text-brand-dark sm:mb-3">
                  Nome
                </label>

                <input
                  type="text"
                  placeholder="Seu nome completo"
                  {...register("name", {
                    required: "Informe seu nome.",
                    minLength: {
                      value: 3,
                      message: "O nome precisa ter pelo menos 3 caracteres.",
                    },
                  })}
                  className={`w-full rounded-full border bg-brand-mist px-4 py-3.5 text-sm outline-none transition focus:ring-4 sm:px-5 sm:py-4 ${
                    errors.name
                      ? "border-red-500 focus:ring-red-500/10"
                      : "border-border focus:border-brand-orange focus:ring-brand-orange/10"
                  }`}
                />

                {errors.name && (
                  <p className="mt-2 text-xs font-medium text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-brand-dark sm:mb-3">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="voce@email.com"
                  {...register("email", {
                    required: "Informe seu email.",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Digite um email válido.",
                    },
                  })}
                  className={`w-full rounded-full border bg-brand-mist px-4 py-3.5 text-sm outline-none transition focus:ring-4 sm:px-5 sm:py-4 ${
                    errors.email
                      ? "border-red-500 focus:ring-red-500/10"
                      : "border-border focus:border-brand-orange focus:ring-brand-orange/10"
                  }`}
                />

                {errors.email && (
                  <p className="mt-2 text-xs font-medium text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-brand-dark sm:mb-3">
                  Mensagem
                </label>

                <textarea
                  rows={6}
                  placeholder="Conte-nos como podemos ajudar..."
                  {...register("message", {
                    required: "Escreva sua mensagem.",
                    minLength: {
                      value: 10,
                      message:
                        "A mensagem precisa ter pelo menos 10 caracteres.",
                    },
                  })}
                  className={`w-full resize-none rounded-[24px] border bg-brand-mist px-4 py-3.5 text-sm outline-none transition focus:ring-4 sm:rounded-[28px] sm:px-5 sm:py-4 ${
                    errors.message
                      ? "border-red-500 focus:ring-red-500/10"
                      : "border-border focus:border-brand-orange focus:ring-brand-orange/10"
                  }`}
                />

                {errors.message && (
                  <p className="mt-2 text-xs font-medium text-red-500">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-brand-orange px-6 py-3.5 text-sm font-semibold text-white shadow-glow transition hover:bg-brand-ember disabled:cursor-not-allowed disabled:opacity-70 sm:py-4"
              >
                {isSubmitting ? "Enviando..." : "Enviar mensagem"}
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
};

export default Contato;
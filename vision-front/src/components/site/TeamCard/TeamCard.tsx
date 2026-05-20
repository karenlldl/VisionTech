const GithubIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-4 w-4"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.49v-1.73c-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.98c.85 0 1.71.12 2.51.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9v2.8c0 .27.18.59.69.49A10.05 10.05 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-4 w-4"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.11 1 2.5 1s2.48 1.12 2.48 2.5ZM.34 8h4.32v14H.34V8Zm7.1 0h4.14v1.91h.06c.58-1.1 1.99-2.26 4.1-2.26 4.39 0 5.2 2.89 5.2 6.65V22h-4.32v-6.82c0-1.63-.03-3.72-2.27-3.72-2.27 0-2.62 1.77-2.62 3.6V22H7.44V8Z" />
  </svg>
);

type TeamCardProps = {
  name: string;
  role: string;
  rm: string;
  turma: string;
  image: string;
  github: string;
  linkedin: string;
};

const TeamCard = ({
  name,
  role,
  rm,
  turma,
  image,
  github,
  linkedin,
}: TeamCardProps) => {
  return (
    <article className="group relative overflow-hidden rounded-[36px] border border-white/10 bg-white shadow-soft transition-all duration-500 hover:-translate-y-2 hover:shadow-float">
      <div className="relative h-40 overflow-visible bg-gradient-to-br from-[#1a0000] via-[#C10801] to-[#E85002]">
        <div className="gradient-mesh absolute inset-0 opacity-20 mix-blend-overlay" />

        <div className="absolute -bottom-16 left-1/2 z-20 h-32 w-32 -translate-x-1/2 overflow-hidden rounded-full border-4 border-white bg-brand-mist shadow-float">
  <img
    src={image}
    alt={name}
    className="h-full w-full object-cover"
  />
</div>
      </div>

      <div className="px-8 pb-8 pt-23 text-center">
        <h3 className="text-2xl font-semibold tracking-tight text-brand-dark">
          {name}
        </h3>

        <p className="mt-2 font-medium text-brand-orange">{role}</p>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <span className="rounded-full bg-brand-mist px-4 py-1 text-xs text-muted-foreground">
            {rm}
          </span>

          <span className="rounded-full bg-brand-mist px-4 py-1 text-xs text-muted-foreground">
            {turma}
          </span>
        </div>

        <div className="mt-8 flex justify-center gap-3">
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium transition hover:border-brand-orange hover:text-brand-orange"
          >
            <GithubIcon />
            GitHub
          </a>

          <a
            href={linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium transition hover:border-brand-orange hover:text-brand-orange"
          >
            <LinkedinIcon />
            LinkedIn
          </a>
        </div>
      </div>
    </article>
  );
};

export default TeamCard;
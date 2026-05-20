type HomeInfoCardProps = {
  img: string;
  title: string;
  description: string;
};

export default function HomeInfoCard({
  img,
  title,
  description,
}: HomeInfoCardProps) {
  return (
    <article className="flex min-h-[180px] flex-col items-center justify-center rounded-xl border border-[#e2a570] bg-white px-8 py-7 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <img
        src={img}
        alt={title}
        className="mb-4 h-10 w-10 object-contain"
      />

      <h3 className="mb-3 text-lg font-bold text-black">
        {title}
      </h3>

      <p className="max-w-[220px] text-sm leading-relaxed text-[#6f625d]">
        {description}
      </p>
    </article>
  );
}
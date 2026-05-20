const SolutionDashboard = () => {
  return (
    <div className="overflow-hidden rounded-[40px] border border-border bg-white shadow-float">
      <div className="p-8">
        <div className="grid grid-cols-3 gap-4">
          {[
            {
              label: "Pacientes",
              value: "1.248",
              growth: "+12%",
            },
            {
              label: "Triagens",
              value: "324",
              growth: "+24%",
            },
            {
              label: "Profissionais",
              value: "87",
              growth: "+5",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-[28px] border border-border p-6"
            >
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                {item.label}
              </p>

              <p className="mt-3 text-5xl font-semibold">
                {item.value}
              </p>

              <span className="mt-2 inline-block text-sm font-medium text-brand-orange">
                {item.growth}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-4x1 border border-border p-6">
          <div className="mb-6 flex items-center justify-between">
            <p className="font-medium">
              Atendimentos · ano
            </p>

            <span className="text-sm text-muted-foreground">
              +24%
            </span>
          </div>

          <div className="flex h-64 items-end gap-3">
            {[30, 48, 42, 60, 54, 72, 66, 80, 70, 86, 78, 92].map(
              (height, index) => (
                <div
                  key={index}
                  className="flex-1 rounded-t-[18px] bg-linear-to-t from-brand-orange to-brand-orange/30 transition duration-300 hover:from-brand-ember hover:to-brand-orange-soft"
                  style={{ height: `${height}%` }}
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionDashboard;
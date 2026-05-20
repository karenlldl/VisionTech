import {
  CalendarClock,
  Filter,
  LayoutDashboard,
  RotateCcw,
  Stethoscope,
  Workflow,
} from "lucide-react";

const OperationalPreview = () => {
  const bars = [35, 55, 48, 70, 60, 82, 75, 90, 78, 95, 88, 100];

  return (
    <div className="shadow-float relative overflow-hidden rounded-[28px] border border-border bg-card">
      <div className="flex h-10 items-center gap-2 border-b border-border bg-background/50 px-5">
        <div className="h-2.5 w-2.5 rounded-full bg-foreground/10" />
        <div className="h-2.5 w-2.5 rounded-full bg-foreground/10" />
        <div className="h-2.5 w-2.5 rounded-full bg-foreground/10" />
        <div className="mx-auto font-mono text-[11px] text-muted-foreground">
          vision.app/dashboards
        </div>
      </div>

      <div className="grid min-h-125 lg:grid-cols-[220px_1fr]">
        <aside className="hidden space-y-1 border-r border-border bg-background/40 p-4 lg:block">
          {[
            { icon: LayoutDashboard, label: "Visão geral" },
            { icon: CalendarClock, label: "Agenda" },
            { icon: Stethoscope, label: "Atendimentos" },
            { icon: Workflow, label: "Dashboards", active: true },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs ${
                  item.active
                    ? "bg-foreground text-background"
                    : "text-muted-foreground"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {item.label}
              </div>
            );
          })}
        </aside>

        <div className="space-y-4 p-5 lg:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Dashboards administrativos
              </p>
              <h3 className="text-2xl font-semibold tracking-tight">
                Indicadores da operação
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Filtros, métricas e gráficos para apoiar decisões do time.
              </p>
            </div>

            <span className="font-mono text-[10px] text-muted-foreground">
              Maio · 2026
            </span>
          </div>

          <div className="rounded-2xl border border-border bg-background/50 p-4">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-medium">
                <Filter className="h-3.5 w-3.5 text-brand-orange" />
                Filtros
              </div>

              <button className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <RotateCcw className="h-3 w-3" />
                Limpar
              </button>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {["Origem", "Prioridade", "Status"].map((filter) => (
                <div key={filter}>
                  <label className="mb-1 block text-[10px] text-muted-foreground">
                    {filter}
                  </label>
                  <div className="rounded-xl border border-border bg-white px-3 py-2 text-xs">
                    Todas
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { label: "Total de pacientes", value: "1.248", color: "text-brand-orange" },
              { label: "Alta prioridade", value: "32", color: "text-red-500" },
              { label: "Atendidos", value: "842", color: "text-brand-orange" },
              { label: "Taxa de conclusão", value: "67%", color: "text-foreground" },
            ].map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl border border-border bg-background/50 p-4"
              >
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  {metric.label}
                </p>
                <p className={`mt-2 text-2xl font-semibold ${metric.color}`}>
                  {metric.value}
                </p>
              </div>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-background/50 p-5">
              <div className="mb-4 flex items-center justify-between text-xs">
                <span className="font-medium">Distribuição por faixa etária</span>
                <span className="font-mono text-muted-foreground">+18%</span>
              </div>

              <div className="flex h-32 items-end gap-4">
                {[45, 78, 52, 86].map((height, index) => (
                <div key={index} className="flex h-full flex-1 flex-col justify-end gap-2">
                <div className="flex h-full items-end">
            <div
          className="hover:from-brand-orange-soft hover:to-brand-orange-soft-y-110 w-full rounded-t-xl bg-linear-to-t from-brand-orange to-brand-orange/40"
          style={{ height: `${height}%` }}
        />
      </div>

      <span className="text-center text-[9px] text-muted-foreground">
        {["0-7", "8-12", "13-17", "18+"][index]}
      </span>
    </div>
  ))}
</div>
            </div>

            <div className="rounded-2xl border border-border bg-background/50 p-5">
              <div className="mb-4 flex items-center justify-between text-xs">
                <span className="font-medium">Atendimentos · 12 semanas</span>
                <span className="font-mono text-muted-foreground">+24%</span>
              </div>

              <div className="flex h-32 items-end gap-1.5">
                {bars.map((height, index) => (
                  <div
                    key={index}
                    className="flex-1 rounded-t-md bg-linear-to-t from-brand-orange to-brand-orange/40 transition hover:to-brand-orange"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperationalPreview;
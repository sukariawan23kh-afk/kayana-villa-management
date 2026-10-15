"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  CalendarCheck,
  Banknote,
  LineChart as LineChartIcon,
  TrendingUp,
  Users,
  Star,
} from "lucide-react";
import { dashboardSeries } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { Info } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

const KPI_ICONS = [CalendarCheck, Banknote, LineChartIcon, TrendingUp, Users, Star];

const occData = [
  { m: "Mar", v: 64 },
  { m: "Apr", v: 71 },
  { m: "May", v: 68 },
  { m: "Jun", v: 79 },
  { m: "Jul", v: 91 },
  { m: "Aug", v: 95 },
];

export function Revenue() {
  const { t } = useLanguage();
  return (
    <section
      id="performance"
      className="scroll-mt-24 bg-gradient-to-b from-ivory to-sand/40 py-20 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={t.revenue.eyebrow}
          title={t.revenue.title}
          description={t.revenue.description}
        />

        {/* KPI cards */}
        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-16 lg:grid-cols-3 lg:gap-5">
          {t.revenue.kpis.map((kpi, i) => {
            const Icon = KPI_ICONS[i] ?? CalendarCheck;
            return (
              <Reveal key={i} delay={(i % 3) * 80}>
                <div className="group flex h-full flex-col gap-3 rounded-2xl border border-stone/70 bg-card p-5 transition-all duration-400 hover:border-charcoal/20 hover:shadow-[0_20px_50px_-40px_rgba(28,26,23,0.5)] sm:p-6">
                  <span className="inline-flex size-10 items-center justify-center rounded-lg bg-sand text-tropical transition-colors group-hover:bg-tropical group-hover:text-white">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <div className="flex items-baseline gap-2">
                      <h3 className="font-serif-display text-lg font-medium text-charcoal">
                        {kpi.label}
                      </h3>
                      {kpi.abbr && (
                        <span className="text-[0.65rem] uppercase tracking-wide text-muted-foreground/70">
                          {kpi.abbr}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {kpi.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Sample dashboard */}
        <Reveal delay={120} className="mt-10 lg:mt-14">
          <div className="overflow-hidden rounded-[1.5rem] border border-stone/70 bg-card shadow-[0_40px_90px_-60px_rgba(28,26,23,0.5)]">
            {/* Dashboard header */}
            <div className="flex flex-col gap-2 border-b border-stone/70 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-tropical">
                  {t.revenue.dashboard.label}
                </p>
                <h3 className="mt-1 font-serif-display text-xl font-medium text-charcoal sm:text-2xl">
                  {t.revenue.dashboard.title}
                </h3>
              </div>
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-bronze/30 bg-bronze/10 px-3 py-1 text-[0.7rem] font-medium text-bronze">
                <Info className="size-3.5" aria-hidden />
                {t.revenue.dashboard.illustrative}
              </span>
            </div>

            <div className="grid gap-px bg-stone/60 lg:grid-cols-3">
              {/* Revenue trend (spans 2) */}
              <div className="bg-card p-6 sm:p-8 lg:col-span-2">
                <div className="mb-5 flex items-baseline justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {t.revenue.dashboard.revenueLabel}
                    </p>
                    <p className="mt-1 font-serif-display text-2xl font-medium text-charcoal">
                      {t.revenue.dashboard.revenueSub}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-tropical">
                    <span className="size-2 rounded-full bg-tropical" aria-hidden />
                    {t.revenue.dashboard.indexedRevenue}
                  </div>
                </div>
                <div className="h-[240px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={dashboardSeries.revenue}
                      margin={{ top: 6, right: 6, left: -18, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--tropical)" stopOpacity={0.35} />
                          <stop offset="100%" stopColor="var(--tropical)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 6"
                        stroke="var(--stone)"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="month"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 11, fill: "oklch(0.5 0.01 70)" }}
                      />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 11, fill: "oklch(0.5 0.01 70)" }}
                        width={40}
                      />
                      <Tooltip
                        cursor={{ stroke: "var(--bronze)", strokeWidth: 1 }}
                        contentStyle={{
                          borderRadius: 12,
                          border: "1px solid var(--stone)",
                          background: "var(--card)",
                          fontSize: 12,
                          boxShadow: "0 16px 40px -20px rgba(28,26,23,0.4)",
                        }}
                        labelStyle={{ color: "var(--charcoal)", fontWeight: 600 }}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="var(--tropical)"
                        strokeWidth={2.5}
                        fill="url(#revFill)"
                        dot={{ r: 0 }}
                        activeDot={{ r: 5, fill: "var(--bronze)" }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Booking sources */}
              <div className="bg-card p-6 sm:p-8">
                <p className="text-sm font-medium text-muted-foreground">
                  {t.revenue.dashboard.channelsLabel}
                </p>
                <p className="mt-1 font-serif-display text-2xl font-medium text-charcoal">
                  {t.revenue.dashboard.channelsSub}
                </p>
                <div className="relative mt-2 h-[150px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={dashboardSeries.sources}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={48}
                        outerRadius={70}
                        paddingAngle={2}
                        stroke="none"
                      >
                        {dashboardSeries.sources.map((s) => (
                          <Cell key={s.name} fill={s.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          borderRadius: 12,
                          border: "1px solid var(--stone)",
                          background: "var(--card)",
                          fontSize: 12,
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-serif-display text-2xl font-medium text-charcoal">
                      {dashboardSeries.sources.length}
                    </span>
                    <span className="text-[0.6rem] uppercase tracking-wider text-muted-foreground">
                      {t.revenue.dashboard.channelsCount}
                    </span>
                  </div>
                </div>
                <ul className="mt-3 space-y-1.5">
                  {dashboardSeries.sources.map((s) => (
                    <li
                      key={s.name}
                      className="flex items-center justify-between text-xs"
                    >
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <span
                          className="size-2 rounded-full"
                          style={{ backgroundColor: s.color }}
                          aria-hidden
                        />
                        {s.name}
                      </span>
                      <span className="font-medium text-charcoal">{s.value}%</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Occupancy line */}
              <div className="bg-card p-6 sm:p-8 lg:col-span-3">
                <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {t.revenue.dashboard.occupancyLabel}
                    </p>
                    <p className="mt-1 font-serif-display text-2xl font-medium text-charcoal">
                      {t.revenue.dashboard.occupancySub}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {t.revenue.dashboard.rollingView}
                  </p>
                </div>
                <div className="h-[180px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={occData}
                      margin={{ top: 6, right: 6, left: -18, bottom: 0 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 6"
                        stroke="var(--stone)"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="m"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 11, fill: "oklch(0.5 0.01 70)" }}
                      />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 11, fill: "oklch(0.5 0.01 70)" }}
                        width={40}
                        domain={[0, 100]}
                      />
                      <Tooltip
                        cursor={{ stroke: "var(--bronze)", strokeWidth: 1 }}
                        contentStyle={{
                          borderRadius: 12,
                          border: "1px solid var(--stone)",
                          background: "var(--card)",
                          fontSize: 12,
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="v"
                        stroke="var(--bronze)"
                        strokeWidth={2.5}
                        dot={{ r: 3, fill: "var(--bronze)" }}
                        activeDot={{ r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={80} className="mt-6">
          <p className="text-center text-xs italic leading-relaxed text-muted-foreground/80">
            {t.revenue.disclaimer}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

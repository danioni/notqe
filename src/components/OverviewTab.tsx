"use client";

import {
  BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer, Legend,
} from "recharts";
import { srfUsageData, balanceSheetData, injectionByMechanism, events } from "@/lib/data";
import { t, tBadgeSeverity, tBadgeStatus } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n";
import { stealthMechanisms, stealthQeTitle, stealthQeSubtitle, mechLabels, tMechStatus } from "@/lib/stealthQE";

const statusColors: Record<string, string> = { critical: "#ef4444", warning: "#f59e0b", info: "#3b82f6" };

// Build translated readings dynamically
function getReadings(lang: Lang) {
  return [
    { metric: t('metFedFunds', lang), value: '3.50-3.75%', note: t('noteFedFunds', lang), status: 'warning' },
    { metric: t('metSrfCap', lang), value: t('valUnlimited', lang), note: t('noteSrfCap', lang), status: 'critical' },
    { metric: t('metQtStatus', lang), value: t('valEnded', lang), note: t('noteQtStatus', lang), status: 'critical' },
    { metric: t('metBalanceSheet', lang), value: '$6.44T', note: t('noteBalanceSheet', lang), status: 'warning' },
    { metric: t('metBankReserves', lang), value: '$2.81T', note: t('noteBankReserves', lang), status: 'warning' },
    { metric: t('metOnRrp', lang), value: '$6B', note: t('noteOnRrp', lang), status: 'critical' },
    { metric: t('metNotQe', lang), value: t('valActive', lang), note: t('noteNotQe', lang), status: 'critical' },
    { metric: t('metWarsh', lang), value: t('valPending', lang), note: t('noteWarsh', lang), status: 'info' },
    { metric: t('metPatternMatch', lang), value: '95%', note: t('notePatternMatch', lang), status: 'critical' },
  ];
}

function MetricCard({ metric, value, note, status, index }: { metric: string; value: string; note: string; status: string; index: number }) {
  const color = statusColors[status] || "#64748b";
  return (
    <div className={`panel panel-hover animate-fade-in ${status === "critical" ? "pulse-critical" : ""}`}
      style={{ animationDelay: `${index * 50}ms`, borderColor: `${color}22` }}>
      <div style={{ fontSize: 9, color: "#64748b", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>{metric}</div>
      <div style={{ fontSize: 18, fontWeight: 700, color, marginBottom: 4 }}>{value}</div>
      <div style={{ fontSize: 10, color: "#475569" }}>{note}</div>
    </div>
  );
}

function AlertPanel({ lang }: { lang: Lang }) {
  const activeAlerts = events.filter((e) => e.status === "active" || e.status === "planned" || e.status === "pending");
  return (
    <div className="panel" style={{ borderColor: "#ef444422" }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: "#ef4444", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
        <span className="pulse-dot" style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#ef4444" }} />
        {t('activeAlerts', lang)} ({activeAlerts.length})
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {activeAlerts.map((alert) => (
          <div key={alert.id} className="animate-slide-in" style={{
            background: "#0a0d14", border: "1px solid #1a1f2e", borderRadius: 6, padding: "10px 14px",
            borderLeft: `3px solid ${alert.severity === "critical" ? "#ef4444" : alert.severity === "high" ? "#f59e0b" : "#3b82f6"}`,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#e2e8f0" }}>{alert.title}</span>
              <div style={{ display: "flex", gap: 4 }}>
                <span className={`badge badge-${alert.severity}`}>{tBadgeSeverity(alert.severity, lang)}</span>
                <span className={`badge badge-${alert.status}`}>{tBadgeStatus(alert.status, lang)}</span>
              </div>
            </div>
            <div style={{ fontSize: 10, color: "#64748b" }}>{alert.date} · {alert.mechanism}</div>
            <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 4 }}>{alert.description.slice(0, 150)}...</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MechanismTimeline({ lang }: { lang: Lang }) {
  const sorted = [...stealthMechanisms].sort((a, b) => a.introduced - b.introduced);
  const statusColorMap: Record<string, string> = {
    active: '#ef4444', depleted: '#64748b', expired: '#475569', standby: '#f59e0b', permanent: '#3b82f6',
  };

  // Group by decade for visual spacing
  const minYear = sorted[0].introduced;
  const maxYear = 2026;
  const range = maxYear - minYear;

  return (
    <div className="panel" style={{ borderColor: "#06b6d422" }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: "#06b6d4", marginBottom: 4 }}>{mechLabels.timelineTitle[lang]}</div>
      <div style={{ fontSize: 10, color: "#64748b", marginBottom: 20 }}>{mechLabels.timelineSubtitle[lang]}</div>

      {/* Horizontal timeline bar */}
      <div style={{ position: "relative", marginBottom: 12 }}>
        {/* Base line */}
        <div style={{ height: 2, background: "#1a1f2e", borderRadius: 1, position: "relative" }}>
          {/* Markers for crisis years */}
          {[{ year: 2008, label: 'GFC' }, { year: 2020, label: 'COVID' }, { year: 2023, label: 'SVB' }].map(crisis => {
            const pct = ((crisis.year - minYear) / range) * 100;
            return (
              <div key={crisis.year} style={{ position: "absolute", left: `${pct}%`, top: -8, transform: "translateX(-50%)" }}>
                <div style={{ width: 1, height: 18, background: "#ef444444" }} />
                <div style={{ fontSize: 8, color: "#ef444488", textAlign: "center", marginTop: 2, whiteSpace: "nowrap" }}>{crisis.label} {crisis.year}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mechanism entries on timeline */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 24 }}>
        {sorted.map((mech, i) => {
          const sColor = statusColorMap[mech.status] || '#64748b';
          const pct = ((mech.introduced - minYear) / range) * 100;
          return (
            <div key={mech.id} className="animate-slide-in" style={{ animationDelay: `${i * 60}ms`, display: "flex", alignItems: "center", gap: 8 }}>
              {/* Year label */}
              <div style={{ width: 40, fontSize: 10, fontWeight: 600, color: "#64748b", textAlign: "right", flexShrink: 0 }}>
                {mech.introduced}
              </div>

              {/* Timeline bar showing "active since" */}
              <div style={{ flex: 1, position: "relative", height: 28 }}>
                <div style={{ position: "absolute", left: 0, right: 0, top: 13, height: 1, background: "#1a1f2e" }} />
                {/* Active span bar */}
                <div style={{
                  position: "absolute", left: `${pct}%`, right: 0, top: 10, height: 8,
                  background: `linear-gradient(90deg, ${mech.color}44, ${mech.color}${mech.status === 'active' ? '44' : '11'})`,
                  borderRadius: 2,
                  borderLeft: `2px solid ${mech.color}`,
                }} />
                {/* Dot at introduction point */}
                <div style={{
                  position: "absolute", left: `${pct}%`, top: 8, width: 12, height: 12,
                  borderRadius: "50%", background: mech.color, border: "2px solid #0c0f16",
                  transform: "translateX(-50%)",
                  boxShadow: mech.status === 'active' ? `0 0 8px ${mech.color}66` : 'none',
                }} />
              </div>

              {/* Mechanism name + detail + status */}
              <div style={{ width: 320, flexShrink: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ fontSize: 10, color: "#e2e8f0", fontWeight: 500, flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {mech.name[lang]}
                  </div>
                  <span style={{
                    fontSize: 8, fontWeight: 700, color: sColor, letterSpacing: 0.5,
                    padding: "1px 4px", borderRadius: 2, background: `${sColor}15`, border: `1px solid ${sColor}33`,
                    flexShrink: 0,
                  }}>
                    {tMechStatus(mech.status, lang)}
                  </span>
                </div>
                <div style={{ fontSize: 9, color: "#06b6d4aa", marginTop: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {mech.introducedDetail[lang]}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Year axis */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, paddingLeft: 48, fontSize: 9, color: "#475569" }}>
        {[1960, 1980, 2000, 2008, 2015, 2020, 2026].filter(y => y >= minYear).map(y => (
          <span key={y}>{y}</span>
        ))}
      </div>
    </div>
  );
}

function StealthQEPanel({ lang }: { lang: Lang }) {
  const active = stealthMechanisms.filter((m) => m.status === 'active');
  const statusColorMap: Record<string, string> = {
    active: '#ef4444', depleted: '#64748b', expired: '#475569', standby: '#f59e0b', permanent: '#3b82f6',
  };

  return (
    <div className="panel" style={{ borderColor: "#a855f722" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#a855f7", marginBottom: 4 }}>{stealthQeTitle[lang]}</div>
          <div style={{ fontSize: 10, color: "#64748b" }}>{stealthQeSubtitle[lang]}</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <span className="badge badge-critical">{stealthMechanisms.length} {mechLabels.count[lang]}</span>
          <span className="badge badge-active">{active.length} {mechLabels.activeCount[lang]}</span>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 10 }}>
        {stealthMechanisms.map((mech, i) => {
          const sColor = statusColorMap[mech.status] || '#64748b';
          return (
            <div key={mech.id} className="animate-fade-in" style={{
              animationDelay: `${i * 60}ms`,
              background: mech.status === 'active' ? '#ef44440a' : '#0a0d14',
              border: `1px solid ${mech.status === 'active' ? '#ef444422' : '#1a1f2e'}`,
              borderRadius: 6, padding: "12px 14px",
              borderLeft: `3px solid ${mech.color}`,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#e2e8f0" }}>{mech.name[lang]}</div>
                <span style={{
                  fontSize: 9, fontWeight: 700, color: sColor, letterSpacing: 0.5,
                  padding: "2px 6px", borderRadius: 3, background: `${sColor}15`, border: `1px solid ${sColor}33`,
                }}>
                  {tMechStatus(mech.status, lang)}
                </span>
              </div>
              <div style={{ display: "flex", gap: 12, marginBottom: 6, fontSize: 10 }}>
                <span><span style={{ color: "#475569" }}>{mechLabels.injected[lang]}:</span> <span style={{ color: sColor, fontWeight: 600 }}>{mech.injected}</span></span>
                <span><span style={{ color: "#475569" }}>{mechLabels.introduced[lang]}:</span> <span style={{ color: "#06b6d4", fontWeight: 600 }}>{mech.introduced}</span></span>
              </div>
              <div style={{ fontSize: 9, color: "#06b6d4aa", marginBottom: 6 }}>{mech.introducedDetail[lang]}</div>
              <div style={{ fontSize: 10, color: "#94a3b8", lineHeight: 1.6 }}>{mech.how[lang]}</div>
            </div>
          );
        })}
      </div>

      <div style={{
        marginTop: 12, padding: "10px 14px", background: "#a855f70a", border: "1px solid #a855f722",
        borderRadius: 6, fontSize: 10, color: "#a855f7", textAlign: "center", fontWeight: 600,
      }}>
        {mechLabels.totalCapacity[lang]}
      </div>
    </div>
  );
}

const ChartTooltipB = ({ active, payload, label, suffix }: { active?: boolean; payload?: Array<{ value: number }>; label?: string; suffix?: string }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#0c0f16", border: "1px solid #1a1f2e", borderRadius: 6, padding: "8px 12px", fontSize: 11 }}>
      <div style={{ color: "#64748b", marginBottom: 2 }}>{label}</div>
      <div style={{ color: "#e2e8f0", fontWeight: 600 }}>${payload[0].value}{suffix || "B"}</div>
    </div>
  );
};

export default function OverviewTab({ lang }: { lang: Lang }) {
  const readings = getReadings(lang);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Current Readings Grid */}
      <div>
        <h2 style={{ fontSize: 13, fontWeight: 600, color: "#94a3b8", marginBottom: 16, letterSpacing: 0.5 }}>
          {t('currentReadings', lang)}
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
          {readings.map((r, i) => <MetricCard key={r.metric} {...r} index={i} />)}
        </div>
      </div>

      {/* Charts Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: 16 }}>
        {/* SRF Usage Chart */}
        <div className="panel">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#e2e8f0" }}>{t('srfUsage', lang)}</div>
              <div style={{ fontSize: 10, color: "#64748b" }}>{t('srfSubtitle', lang)}</div>
            </div>
            <span className="badge badge-critical">{t('srfRecord', lang)}</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={srfUsageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a1f2e" />
              <XAxis dataKey="year" tick={{ fontSize: 10, fill: "#64748b" }} axisLine={{ stroke: "#1a1f2e" }} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#64748b" }} axisLine={{ stroke: "#1a1f2e" }} tickLine={false} />
              <Tooltip content={<ChartTooltipB />} />
              <ReferenceLine y={29.4} stroke="#f59e0b" strokeDasharray="4 4"
                label={{ value: t('octRecord', lang), position: "right", fill: "#f59e0b", fontSize: 9 }} />
              <Bar dataKey="value" fill="#ef4444" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div style={{ marginTop: 12, padding: "10px 14px", background: "#ef44440a", border: "1px solid #ef444422", borderRadius: 6, fontSize: 10, color: "#94a3b8", lineHeight: 1.7 }}>
            {t('srfContext', lang)}
          </div>
        </div>

        {/* Balance Sheet Chart */}
        <div className="panel">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#e2e8f0" }}>{t('balanceSheet', lang)}</div>
              <div style={{ fontSize: 10, color: "#64748b" }}>{t('balanceSheetSub', lang)}</div>
            </div>
            <span className="badge badge-high">$6.44T ↑</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={balanceSheetData}>
              <defs>
                <linearGradient id="bsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a1f2e" />
              <XAxis dataKey="year" tick={{ fontSize: 10, fill: "#64748b" }} axisLine={{ stroke: "#1a1f2e" }} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#64748b" }} axisLine={{ stroke: "#1a1f2e" }} tickLine={false} domain={[0, 10]} />
              <Tooltip content={<ChartTooltipB suffix="T" />} />
              <Area type="monotone" dataKey="value" stroke="#ef4444" fill="url(#bsGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Injection by Mechanism — Stacked Bar Chart */}
      <div className="panel">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#e2e8f0" }}>{t('injectionTitle', lang)}</div>
            <div style={{ fontSize: 10, color: "#64748b" }}>{t('injectionSubtitle', lang)}</div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={injectionByMechanism} stackOffset="sign">
            <CartesianGrid strokeDasharray="3 3" stroke="#1a1f2e" />
            <XAxis dataKey="year" tick={{ fontSize: 10, fill: "#64748b" }} axisLine={{ stroke: "#1a1f2e" }} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: "#64748b" }} axisLine={{ stroke: "#1a1f2e" }} tickLine={false} label={{ value: '$B', position: 'insideTopLeft', fill: '#64748b', fontSize: 9 }} />
            <Tooltip
              contentStyle={{ background: "#0c0f16", border: "1px solid #1a1f2e", borderRadius: 6, fontSize: 11 }}
              labelStyle={{ color: "#64748b", marginBottom: 4 }}
              itemStyle={{ padding: "1px 0" }}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              formatter={((value: any, name: any) => {
                if (!value || value === 0) return [null, null];
                const labels: Record<string, string> = {
                  omo: 'Open Market Ops', dw: 'Discount Window',
                  qe: 'QE', spv: 'SPVs', fxSwaps: 'FX Swaps', onrrp: 'ON RRP Drainage',
                  tga: 'TGA Drawdowns', srf: 'SRF', notqe: '"Not QE"', btfp: 'BTFP', buybacks: 'Buybacks',
                };
                return [`$${value}B`, labels[name] || name];
              }) as any}
            />
            <Legend
              wrapperStyle={{ fontSize: 9, paddingTop: 8 }}
              formatter={(value: string) => {
                const labels: Record<string, string> = {
                  omo: 'OMO', dw: 'Disc. Window',
                  qe: 'QE', spv: 'SPVs', fxSwaps: 'FX Swaps', onrrp: 'ON RRP',
                  tga: 'TGA', srf: 'SRF', notqe: '"Not QE"', btfp: 'BTFP', buybacks: 'Buybacks',
                };
                return labels[value] || value;
              }}
            />
            <Bar dataKey="omo" stackId="a" fill="#06b6d4" />
            <Bar dataKey="dw" stackId="a" fill="#14b8a6" />
            <Bar dataKey="qe" stackId="a" fill="#ef4444" />
            <Bar dataKey="fxSwaps" stackId="a" fill="#3b82f6" />
            <Bar dataKey="onrrp" stackId="a" fill="#64748b" />
            <Bar dataKey="tga" stackId="a" fill="#f59e0b" />
            <Bar dataKey="spv" stackId="a" fill="#a855f7" />
            <Bar dataKey="notqe" stackId="a" fill="#f87171" />
            <Bar dataKey="srf" stackId="a" fill="#fb923c" />
            <Bar dataKey="btfp" stackId="a" fill="#6366f1" />
            <Bar dataKey="buybacks" stackId="a" fill="#fbbf24" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Stealth QE Arsenal */}
      <StealthQEPanel lang={lang} />

      {/* Mechanism Timeline */}
      <MechanismTimeline lang={lang} />

      {/* Active Alerts */}
      <AlertPanel lang={lang} />
    </div>
  );
}

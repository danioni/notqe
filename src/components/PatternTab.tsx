"use client";

import {
  AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer,
} from "recharts";
import { balanceSheetData, fedFundsRateData, debtToGdpData, playbook2019, playbook2025, ratchetData } from "@/lib/data";
import { t } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n";

const ChartTooltip = ({ active, payload, label, suffix }: { active?: boolean; payload?: Array<{ value: number }>; label?: string; suffix?: string }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#0c0f16", border: "1px solid #1a1f2e", borderRadius: 6, padding: "8px 12px", fontSize: 11 }}>
      <div style={{ color: "#64748b", marginBottom: 2 }}>{label}</div>
      <div style={{ color: "#e2e8f0", fontWeight: 600 }}>{payload[0].value}{suffix || ""}</div>
    </div>
  );
};

function RatchetVisual({ lang }: { lang: Lang }) {
  return (
    <div className="panel">
      <div style={{ fontSize: 12, fontWeight: 600, color: "#e2e8f0", marginBottom: 4 }}>{t('ratchetTitle', lang)}</div>
      <div style={{ fontSize: 10, color: "#64748b", marginBottom: 16 }}>{t('ratchetDesc', lang)}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {ratchetData.map((r, i) => {
          const isExpansion = r.to > r.from;
          const color = isExpansion ? "#ef4444" : "#10b981";
          const maxVal = 9;
          const fromPct = (r.from / maxVal) * 100;
          const toPct = (r.to / maxVal) * 100;
          const left = Math.min(fromPct, toPct);
          const width = Math.abs(toPct - fromPct);
          return (
            <div key={i} className="animate-slide-in" style={{ animationDelay: `${i * 100}ms` }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, marginBottom: 4 }}>
                <span style={{ color: "#94a3b8" }}>{r.label}</span>
                <span style={{ color, fontWeight: 600 }}>${r.from}T → ${r.to}T ({r.change})</span>
              </div>
              <div style={{ height: 20, background: "#0a0d14", borderRadius: 4, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", left: `${left}%`, width: `${width}%`, height: "100%", background: `${color}33`, borderRadius: 4, border: `1px solid ${color}55`, transition: "all 0.5s ease" }} />
                <div style={{ position: "absolute", left: `${fromPct}%`, top: 0, bottom: 0, width: 2, background: "#64748b" }} />
                <div style={{ position: "absolute", left: `${toPct}%`, top: 0, bottom: 0, width: 2, background: color }} />
              </div>
            </div>
          );
        })}
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: "#475569", marginTop: 4 }}>
          <span>$0T</span><span>$4.5T</span><span>$9T</span>
        </div>
      </div>
    </div>
  );
}

function PlaybookComparison({ lang }: { lang: Lang }) {
  return (
    <div className="panel">
      <div style={{ fontSize: 12, fontWeight: 600, color: "#e2e8f0", marginBottom: 4 }}>{t('playbookTitle', lang)}</div>
      <div style={{ fontSize: 10, color: "#64748b", marginBottom: 16 }}>{t('playbookDesc', lang)}</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#64748b", marginBottom: 12, textAlign: "center", padding: "6px 0", background: "#0a0d14", borderRadius: 4 }}>
            {t('precedent', lang)}
          </div>
          {playbook2019.map((step) => (
            <div key={step.step} className="animate-slide-in" style={{ display: "flex", gap: 10, marginBottom: 10, animationDelay: `${step.step * 80}ms` }}>
              <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#64748b22", border: "1px solid #64748b44", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#94a3b8", flexShrink: 0 }}>
                {step.step}
              </div>
              <div>
                <div style={{ fontSize: 10, color: "#475569" }}>{step.date}</div>
                <div style={{ fontSize: 11, color: "#94a3b8" }}>{step.event}</div>
              </div>
            </div>
          ))}
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#ef4444", marginBottom: 12, textAlign: "center", padding: "6px 0", background: "#ef44440a", borderRadius: 4, border: "1px solid #ef444422" }}>
            {t('now', lang)}
          </div>
          {playbook2025.map((step) => {
            const isActive = step.step <= 4;
            const isPending = step.step === 5;
            const c = isActive ? "#ef4444" : isPending ? "#f59e0b" : "#94a3b8";
            return (
              <div key={step.step} className="animate-slide-in" style={{ display: "flex", gap: 10, marginBottom: 10, animationDelay: `${step.step * 80 + 400}ms` }}>
                <div style={{ width: 24, height: 24, borderRadius: "50%", background: `${c}22`, border: `1px solid ${c}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: c, flexShrink: 0 }}>
                  {step.step}
                </div>
                <div>
                  <div style={{ fontSize: 10, color: "#475569" }}>{step.date}</div>
                  <div style={{ fontSize: 11, color: isActive ? "#e2e8f0" : "#64748b", fontWeight: isActive ? 500 : 400 }}>{step.event}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function PhaseMap({ lang }: { lang: Lang }) {
  const phaseKeys: Array<{ name: 'phase1' | 'phase2' | 'phase3' | 'phase4' | 'phase5'; desc: 'phase1Desc' | 'phase2Desc' | 'phase3Desc' | 'phase4Desc' | 'phase5Desc'; status: 'completed' | 'active' | 'pending' }> = [
    { name: 'phase1', desc: 'phase1Desc', status: 'completed' },
    { name: 'phase2', desc: 'phase2Desc', status: 'completed' },
    { name: 'phase3', desc: 'phase3Desc', status: 'active' },
    { name: 'phase4', desc: 'phase4Desc', status: 'pending' },
    { name: 'phase5', desc: 'phase5Desc', status: 'pending' },
  ];

  const colorMap = { completed: '#10b981', active: '#ef4444', pending: '#64748b' };

  return (
    <div className="panel">
      <div style={{ fontSize: 12, fontWeight: 600, color: "#e2e8f0", marginBottom: 16 }}>{t('phaseMapTitle', lang)}</div>

      {/* Progress bar */}
      <div style={{ display: "flex", gap: 2, marginBottom: 16, height: 4, borderRadius: 2, overflow: "hidden" }}>
        {phaseKeys.map((phase, i) => (
          <div key={i} style={{
            flex: 1,
            background: phase.status === 'completed' ? '#10b981' : phase.status === 'active' ? '#ef4444' : '#1a1f2e',
            transition: 'background 0.3s ease',
          }} />
        ))}
      </div>

      <div style={{ display: "flex", gap: 8, overflow: "auto" }}>
        {phaseKeys.map((phase, i) => {
          const isActive = phase.status === "active";
          const isCompleted = phase.status === "completed";
          const color = colorMap[phase.status];
          return (
            <div key={i} className={isActive ? "pulse-critical" : ""} style={{
              flex: 1, minWidth: 160,
              background: isActive ? "#ef44440a" : isCompleted ? "#10b98108" : "#0a0d14",
              border: `1px solid ${isActive ? "#ef444433" : isCompleted ? "#10b98122" : "#1a1f2e"}`,
              borderRadius: 8, padding: 14,
              opacity: isCompleted ? 0.75 : 1,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%",
                  background: isCompleted ? '#10b98122' : `${color}22`,
                  border: `2px solid ${color}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: isCompleted ? 14 : 12, fontWeight: 700, color,
                }}>
                  {isCompleted ? '✓' : i + 1}
                </div>
                {isActive && <span className="pulse-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#ef4444" }} />}
              </div>
              <div style={{ fontSize: 11, fontWeight: 600, color: isActive ? "#e2e8f0" : isCompleted ? "#94a3b8" : "#94a3b8", marginBottom: 4, textDecoration: isCompleted ? "line-through" : "none" }}>{t(phase.name, lang)}</div>
              <div style={{ fontSize: 10, color: "#64748b", lineHeight: 1.5 }}>{t(phase.desc, lang)}</div>
              <div style={{ marginTop: 8, fontSize: 9, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5, color }}>
                {isActive ? t('phaseActive', lang) : isCompleted ? t('phaseCompleted', lang) : t('phasePending', lang)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function PatternTab({ lang }: { lang: Lang }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <RatchetVisual lang={lang} />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: 16 }}>
        <div className="panel">
          <div style={{ fontSize: 12, fontWeight: 600, color: "#e2e8f0", marginBottom: 4 }}>{t('bsRatchet', lang)}</div>
          <div style={{ fontSize: 10, color: "#64748b", marginBottom: 16 }}>{t('bsRatchetDesc', lang)}</div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={balanceSheetData}>
              <defs>
                <linearGradient id="bsGrad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a1f2e" />
              <XAxis dataKey="year" tick={{ fontSize: 9, fill: "#64748b" }} axisLine={{ stroke: "#1a1f2e" }} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: "#64748b" }} axisLine={{ stroke: "#1a1f2e" }} tickLine={false} domain={[0, 10]} />
              <Tooltip content={<ChartTooltip suffix="T" />} />
              <ReferenceLine y={0.9} stroke="#64748b" strokeDasharray="3 3" label={{ value: t('preFloor', lang), position: "right", fill: "#64748b", fontSize: 8 }} />
              <ReferenceLine y={3.8} stroke="#f59e0b" strokeDasharray="3 3" label={{ value: t('qtFloor', lang), position: "right", fill: "#f59e0b", fontSize: 8 }} />
              <ReferenceLine y={6.4} stroke="#ef4444" strokeDasharray="3 3" label={{ value: t('newFloor', lang), position: "right", fill: "#ef4444", fontSize: 8 }} />
              <Area type="monotone" dataKey="value" stroke="#ef4444" fill="url(#bsGrad2)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="panel">
          <div style={{ fontSize: 12, fontWeight: 600, color: "#e2e8f0", marginBottom: 4 }}>{t('fedFundsTitle', lang)}</div>
          <div style={{ fontSize: 10, color: "#64748b", marginBottom: 16 }}>{t('fedFundsDesc', lang)}</div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={fedFundsRateData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a1f2e" />
              <XAxis dataKey="year" tick={{ fontSize: 9, fill: "#64748b" }} axisLine={{ stroke: "#1a1f2e" }} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: "#64748b" }} axisLine={{ stroke: "#1a1f2e" }} tickLine={false} domain={[0, 22]} />
              <Tooltip content={<ChartTooltip suffix="%" />} />
              <Line type="monotone" dataKey="value" stroke="#f59e0b" strokeWidth={2}
                dot={{ fill: "#f59e0b", r: 3, stroke: "#f59e0b" }} activeDot={{ r: 5, fill: "#f59e0b" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="panel">
        <div style={{ fontSize: 12, fontWeight: 600, color: "#e2e8f0", marginBottom: 4 }}>{t('debtGdpTitle', lang)}</div>
        <div style={{ fontSize: 10, color: "#64748b", marginBottom: 16 }}>{t('debtGdpDesc', lang)}</div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={debtToGdpData}>
            <defs>
              <linearGradient id="debtGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a1f2e" />
            <XAxis dataKey="year" tick={{ fontSize: 9, fill: "#64748b" }} axisLine={{ stroke: "#1a1f2e" }} tickLine={false} />
            <YAxis tick={{ fontSize: 9, fill: "#64748b" }} axisLine={{ stroke: "#1a1f2e" }} tickLine={false} domain={[0, 140]} />
            <Tooltip content={<ChartTooltip suffix="%" />} />
            <ReferenceLine y={100} stroke="#ef4444" strokeDasharray="4 4"
              label={{ value: t('debtGdpRef', lang), position: "right", fill: "#ef4444", fontSize: 9 }} />
            <Area type="monotone" dataKey="value" stroke="#a855f7" fill="url(#debtGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <PlaybookComparison lang={lang} />
      <PhaseMap lang={lang} />
    </div>
  );
}

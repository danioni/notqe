"use client";

import { compositeScore } from "@/lib/data";
import { t, tThreatLevel } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n";

// Build translated indicators
function getIndicators(lang: Lang) {
  return [
    { name: t('tiSrf', lang), score: 91, level: t('lvlCritical', lang), detail: t('tiSrfDetail', lang) },
    { name: t('tiNarrative', lang), score: 88, level: t('lvlCritical', lang), detail: t('tiNarrativeDetail', lang) },
    { name: t('tiReserves', lang), score: 78, level: t('lvlElevated', lang), detail: t('tiReservesDetail', lang) },
    { name: t('tiBs', lang), score: 65, level: t('lvlWarning', lang), detail: t('tiBsDetail', lang) },
    { name: t('tiPolitical', lang), score: 70, level: t('lvlWarning', lang), detail: t('tiPoliticalDetail', lang) },
    { name: t('tiPattern', lang), score: 95, level: t('lvlCritical', lang), detail: t('tiPatternDetail', lang) },
  ];
}

function ScoreRing({ score, lang, size = 140 }: { score: number; lang: Lang; size?: number }) {
  const getColor = (s: number) => { if (s >= 80) return "#ef4444"; if (s >= 60) return "#f59e0b"; if (s >= 40) return "#3b82f6"; return "#10b981"; };
  const color = getColor(score);
  const label = tThreatLevel(score, lang);
  const r = (size - 16) / 2;
  const circumference = 2 * Math.PI * r;
  const dashArray = `${(score / 100) * circumference} ${circumference}`;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <div style={{ position: "relative", width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#1a1f2e" strokeWidth="6" />
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="6"
            strokeDasharray={dashArray} strokeLinecap="round" transform={`rotate(-90 ${size / 2} ${size / 2})`}
            style={{ filter: `drop-shadow(0 0 8px ${color})`, transition: "stroke-dasharray 1s ease" }} />
          {[0, 25, 50, 75, 100].map((tick) => {
            const angle = ((tick / 100) * 360 - 90) * (Math.PI / 180);
            return <line key={tick} x1={size / 2 + (r - 8) * Math.cos(angle)} y1={size / 2 + (r - 8) * Math.sin(angle)}
              x2={size / 2 + (r + 2) * Math.cos(angle)} y2={size / 2 + (r + 2) * Math.sin(angle)} stroke="#475569" strokeWidth="1" />;
          })}
        </svg>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center" }}>
          <div style={{ fontSize: 36, fontWeight: 700, color, lineHeight: 1 }}>{score}</div>
          <div style={{ fontSize: 10, color: "#64748b", marginTop: 2 }}>/ 100</div>
        </div>
      </div>
      <div style={{ fontSize: 14, fontWeight: 700, color, letterSpacing: 2 }}>{label}</div>
    </div>
  );
}

function IndicatorBar({ indicator, index }: { indicator: { name: string; score: number; level: string; detail: string }; index: number }) {
  const getColor = (s: number) => { if (s >= 80) return "#ef4444"; if (s >= 60) return "#f59e0b"; if (s >= 40) return "#3b82f6"; return "#10b981"; };
  const color = getColor(indicator.score);
  return (
    <div className="panel panel-hover animate-fade-in" style={{ animationDelay: `${index * 80}ms`, borderColor: `${color}22` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#e2e8f0" }}>{indicator.name}</div>
          <div style={{ fontSize: 10, color: "#64748b", marginTop: 2 }}>{indicator.detail}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 20, fontWeight: 700, color }}>{indicator.score}</div>
          <div style={{ fontSize: 9, fontWeight: 600, color, textTransform: "uppercase", letterSpacing: 0.5 }}>{indicator.level}</div>
        </div>
      </div>
      <div style={{ height: 6, background: "#0a0d14", borderRadius: 3, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${indicator.score}%`, background: `linear-gradient(90deg, ${color}66, ${color})`, borderRadius: 3, transition: "width 1s ease", boxShadow: `0 0 8px ${color}44` }} />
      </div>
    </div>
  );
}

export default function ThreatMatrixTab({ lang }: { lang: Lang }) {
  const indicators = getIndicators(lang);

  const distLabels = [
    { label: t('distCritical', lang), count: indicators.filter((i) => i.score >= 80).length, color: "#ef4444" },
    { label: t('distElevated', lang), count: indicators.filter((i) => i.score >= 60 && i.score < 80).length, color: "#f59e0b" },
    { label: t('distWarning', lang), count: indicators.filter((i) => i.score >= 40 && i.score < 60).length, color: "#3b82f6" },
    { label: t('distLow', lang), count: indicators.filter((i) => i.score < 40).length, color: "#10b981" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Composite Score */}
      <div className="panel threat-glow-elevated" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 24px", borderColor: "#f59e0b33" }}>
        <div style={{ fontSize: 10, color: "#64748b", letterSpacing: 2, textTransform: "uppercase", marginBottom: 20 }}>
          {t('compositeScore', lang)}
        </div>
        <ScoreRing score={compositeScore} lang={lang} />
        <div style={{ marginTop: 20, fontSize: 11, color: "#94a3b8", textAlign: "center", maxWidth: 500, lineHeight: 1.7 }}>
          {t('compositeDesc', lang)}{" "}
          <span style={{ color: "#f59e0b", fontWeight: 600 }}>{t('elevatedProb', lang)}</span>{" "}
          {t('compositeDesc2', lang)}
        </div>
      </div>

      {/* Individual Indicators */}
      <div>
        <h2 style={{ fontSize: 13, fontWeight: 600, color: "#94a3b8", marginBottom: 16, letterSpacing: 0.5 }}>
          {t('indicatorBreakdown', lang)}
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: 12 }}>
          {indicators.map((indicator, i) => <IndicatorBar key={indicator.name} indicator={indicator} index={i} />)}
        </div>
      </div>

      {/* Distribution */}
      <div className="panel">
        <div style={{ fontSize: 12, fontWeight: 600, color: "#e2e8f0", marginBottom: 16 }}>{t('levelDistribution', lang)}</div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {distLabels.map((level) => (
            <div key={level.label} style={{ flex: 1, minWidth: 120, background: "#0a0d14", border: `1px solid ${level.color}22`, borderRadius: 6, padding: "12px 16px", textAlign: "center" }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: level.color }}>{level.count}</div>
              <div style={{ fontSize: 10, color: "#64748b", marginTop: 2 }}>{level.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Conclusion Panel */}
      <div className="panel" style={{ borderColor: "#06b6d433", background: "linear-gradient(135deg, #0c0f16 0%, #0a1015 100%)" }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "#06b6d4", marginBottom: 12, letterSpacing: 0.5 }}>{t('conclusion', lang)}</div>
        <div style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.8, marginBottom: 16 }}>{t('conclusionText', lang)}</div>

        <div style={{ fontSize: 12, color: "#e2e8f0", fontWeight: 600, marginBottom: 12 }}>{t('ecosystemConnection', lang)}</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 12 }}>
          <div style={{ background: "#0a0d14", border: "1px solid #1a1f2e", borderRadius: 6, padding: "12px 16px" }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#3b82f6", marginBottom: 4 }}>losratios.com</div>
            <div style={{ fontSize: 10, color: "#64748b", lineHeight: 1.5 }}>{t('losratiosDesc', lang)}</div>
          </div>
          <div style={{ background: "#0a0d14", border: "1px solid #1a1f2e", borderRadius: 6, padding: "12px 16px" }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#f59e0b", marginBottom: 4 }}>Las Olas</div>
            <div style={{ fontSize: 10, color: "#64748b", lineHeight: 1.5 }}>{t('olasDesc', lang)}</div>
          </div>
          <div style={{ background: "#ef44440a", border: "1px solid #ef444422", borderRadius: 6, padding: "12px 16px" }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#ef4444", marginBottom: 4 }}>{t('fedwatchHere', lang)}</div>
            <div style={{ fontSize: 10, color: "#64748b", lineHeight: 1.5 }}>{t('fedwatchDesc', lang)}</div>
          </div>
        </div>

        <div style={{ marginTop: 16, padding: "12px 16px", background: "#06b6d40a", border: "1px solid #06b6d422", borderRadius: 6, fontSize: 11, color: "#06b6d4", textAlign: "center", lineHeight: 1.7 }}>
          <strong>{lang === 'es' ? 'El flujo:' : 'The flow:'}</strong> {t('ecosystemFlow', lang)}
        </div>

        <div style={{ marginTop: 16, padding: "12px 16px", background: "#06b6d40a", border: "1px solid #06b6d422", borderRadius: 6, fontSize: 11, color: "#94a3b8", textAlign: "center", lineHeight: 1.7 }}>
          {t('btcStatement', lang)}{" "}
          <span style={{ color: "#06b6d4", fontWeight: 600 }}>{t('btcConclusion', lang)}</span>
        </div>
      </div>
    </div>
  );
}

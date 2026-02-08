"use client";

import { useState, useEffect } from "react";
import { compositeScore } from "@/lib/data";
import { t, tThreatLevel } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n";
import OverviewTab from "@/components/OverviewTab";
import HistoryTab from "@/components/HistoryTab";
import PatternTab from "@/components/PatternTab";
import ThreatMatrixTab from "@/components/ThreatMatrixTab";

function ThreatMeter({ score, lang }: { score: number; lang: Lang }) {
  const getColor = (s: number) => {
    if (s >= 80) return "#ef4444";
    if (s >= 60) return "#f59e0b";
    if (s >= 40) return "#3b82f6";
    return "#10b981";
  };

  const color = getColor(score);
  const label = tThreatLevel(score, lang);

  return (
    <div
      className={score >= 80 ? "threat-glow-elevated" : ""}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        background: "#0c0f16",
        border: `1px solid ${color}33`,
        borderRadius: 8,
        padding: "8px 16px",
      }}
    >
      <div style={{ position: "relative", width: 40, height: 40 }}>
        <svg width="40" height="40" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="16" fill="none" stroke="#1a1f2e" strokeWidth="3" />
          <circle
            cx="20" cy="20" r="16" fill="none" stroke={color} strokeWidth="3"
            strokeDasharray={`${(score / 100) * 100.5} 100.5`}
            strokeLinecap="round" transform="rotate(-90 20 20)"
            style={{ filter: `drop-shadow(0 0 4px ${color})` }}
          />
        </svg>
        <span style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)", fontSize: 11, fontWeight: 700, color,
        }}>
          {score}
        </span>
      </div>
      <div>
        <div style={{ fontSize: 9, color: "#64748b", letterSpacing: 1, textTransform: "uppercase" }}>
          {t('threatLevel', lang)}
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, color }}>{label}</div>
      </div>
    </div>
  );
}

function LanguageToggle({ lang, onToggle }: { lang: Lang; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 0,
        background: "#0c0f16",
        border: "1px solid #1a1f2e",
        borderRadius: 6,
        padding: 0,
        cursor: "pointer",
        fontFamily: "inherit",
        overflow: "hidden",
      }}
    >
      <span style={{
        padding: "6px 10px",
        fontSize: 10,
        fontWeight: lang === "en" ? 700 : 400,
        color: lang === "en" ? "#e2e8f0" : "#475569",
        background: lang === "en" ? "#1a1f2e" : "transparent",
        transition: "all 0.2s ease",
      }}>
        EN
      </span>
      <span style={{
        padding: "6px 10px",
        fontSize: 10,
        fontWeight: lang === "es" ? 700 : 400,
        color: lang === "es" ? "#e2e8f0" : "#475569",
        background: lang === "es" ? "#1a1f2e" : "transparent",
        transition: "all 0.2s ease",
      }}>
        ES
      </span>
    </button>
  );
}

function LiveClock({ lang }: { lang: Lang }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleString("en-US", {
          timeZone: "America/New_York",
          hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ textAlign: "right" }}>
      <div style={{ fontSize: 9, color: "#64748b", letterSpacing: 1 }}>
        {t('nyTime', lang)}
      </div>
      <div style={{ fontSize: 14, fontWeight: 600, color: "#94a3b8", fontVariantNumeric: "tabular-nums" }}>
        {time}
      </div>
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("overview");
  const [lang, setLang] = useState<Lang>("en");

  const tabDefs = [
    { id: "overview", label: t('tabOverview', lang) },
    { id: "history", label: t('tabHistory', lang) },
    { id: "pattern", label: t('tabPattern', lang) },
    { id: "threat", label: t('tabThreat', lang) },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#06080c" }}>
      {/* Header */}
      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(6, 8, 12, 0.95)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid #1a1f2e",
      }}>
        <div style={{
          maxWidth: 1400, margin: "0 auto", padding: "12px 24px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div>
              <h1 style={{
                fontSize: 18, fontWeight: 700, color: "#e2e8f0", letterSpacing: -0.5,
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <span style={{ color: "#ef4444" }}>&#9673;</span>
                FED WATCH
              </h1>
              <div style={{ fontSize: 10, color: "#64748b", letterSpacing: 1.5, textTransform: "uppercase" }}>
                {t('subtitle', lang)}
              </div>
            </div>
            <ThreatMeter score={compositeScore} lang={lang} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <LanguageToggle lang={lang} onToggle={() => setLang(lang === "es" ? "en" : "es")} />
            <LiveClock lang={lang} />
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{
          maxWidth: 1400, margin: "0 auto", padding: "0 24px",
          display: "flex", gap: 0, borderTop: "1px solid #1a1f2e",
        }}>
          {tabDefs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "10px 20px", fontSize: 11,
                fontWeight: activeTab === tab.id ? 600 : 400,
                color: activeTab === tab.id ? "#e2e8f0" : "#64748b",
                background: "transparent", border: "none",
                borderBottom: activeTab === tab.id ? "2px solid #ef4444" : "2px solid transparent",
                cursor: "pointer", fontFamily: "inherit", letterSpacing: 0.5,
                transition: "all 0.2s ease",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: 1400, margin: "0 auto", padding: "24px" }} className="tab-content" key={`${activeTab}-${lang}`}>
        {activeTab === "overview" && <OverviewTab lang={lang} />}
        {activeTab === "history" && <HistoryTab lang={lang} />}
        {activeTab === "pattern" && <PatternTab lang={lang} />}
        {activeTab === "threat" && <ThreatMatrixTab lang={lang} />}
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: "1px solid #1a1f2e", padding: "20px 24px", textAlign: "center",
        maxWidth: 1400, margin: "40px auto 0",
      }}>
        <div style={{ fontSize: 11, color: "#06b6d4", fontStyle: "italic", marginBottom: 8 }}>
          &ldquo;Chancellor on brink of second bailout for banks&rdquo;
          <span style={{ color: "#64748b", fontStyle: "normal" }}>
            {" "}— Satoshi Nakamoto, Block #0, Jan 3 2009
          </span>
        </div>
        <div style={{ fontSize: 10, color: "#475569" }}>
          Fed Watch — {t('footerEcosystem', lang)}{" "}
          <span style={{ color: "#64748b" }}>losratios.com</span> ·{" "}
          <span style={{ color: "#64748b" }}>las olas</span> ·{" "}
          <span style={{ color: "#ef4444" }}>fed watch</span>
        </div>
      </footer>
    </div>
  );
}

"use client";

import { useState } from "react";
import { events, eras } from "@/lib/data";
import { t, tEra, tBadgeSeverity, tBadgeStatus } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n";
import type { HistoricalEvent } from "@/lib/data";

function EventCard({ event, isExpanded, onToggle, lang }: {
  event: HistoricalEvent; isExpanded: boolean; onToggle: () => void; lang: Lang;
}) {
  const eraColor = eras.find((e) => e.id === event.era)?.color || "#64748b";
  const sevColors: Record<string, string> = { critical: "#ef4444", high: "#f59e0b", medium: "#3b82f6" };
  const sevColor = sevColors[event.severity] || "#64748b";

  return (
    <div className="panel-hover" onClick={onToggle} style={{
      background: "#0c0f16", border: "1px solid #1a1f2e", borderRadius: 8,
      borderLeft: `3px solid ${sevColor}`, cursor: "pointer", overflow: "hidden", transition: "all 0.2s ease",
    }}>
      <div style={{ padding: "14px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 10, color: "#475569" }}>{event.date}</span>
              <span style={{ width: 4, height: 4, borderRadius: "50%", background: eraColor, display: "inline-block" }} />
              <span style={{ fontSize: 10, color: eraColor }}>{tEra(event.era, lang)}</span>
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0" }}>
              {event.isAlert && <span style={{ color: "#ef4444", marginRight: 6 }}>&#9888;</span>}
              {event.title}
            </div>
          </div>
          <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
            <span className={`badge badge-${event.severity}`}>{tBadgeSeverity(event.severity, lang)}</span>
            <span className={`badge badge-${event.status}`}>{tBadgeStatus(event.status, lang)}</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 8, fontSize: 10, color: "#64748b" }}>
          <span><span style={{ color: "#475569" }}>{t('mechanism', lang)}:</span> {event.mechanism}</span>
          <span><span style={{ color: "#475569" }}>{t('amount', lang)}:</span> {event.amount}</span>
        </div>
      </div>

      {isExpanded && (
        <div className="animate-fade-in" style={{ padding: "0 16px 16px", borderTop: "1px solid #1a1f2e", paddingTop: 14 }}>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>
              {t('description', lang)}
            </div>
            <div style={{ fontSize: 11, color: "#94a3b8", lineHeight: 1.7 }}>{event.description}</div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: "#f59e0b", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>
              {t('consequence', lang)}
            </div>
            <div style={{ fontSize: 11, color: "#94a3b8", lineHeight: 1.7 }}>{event.consequence}</div>
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, color: "#06b6d4", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>
              {t('btcRelevance', lang)}
            </div>
            <div style={{ fontSize: 11, color: "#94a3b8", lineHeight: 1.7 }}>{event.btcRelevance}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function HistoryTab({ lang }: { lang: Lang }) {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [selectedEra, setSelectedEra] = useState<number | null>(null);
  const filteredEvents = selectedEra ? events.filter((e) => e.era === selectedEra) : events;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Thesis Banner */}
      <div className="panel" style={{
        borderColor: "#ef444433", background: "linear-gradient(135deg, #0c0f16 0%, #120a0a 100%)",
        textAlign: "center", padding: "24px 32px",
      }}>
        <div style={{ fontSize: 12, color: "#ef4444", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>
          {t('centralThesis', lang)}
        </div>
        <div style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.8, maxWidth: 800, margin: "0 auto" }}>
          {t('thesisText', lang)}{" "}
          <span style={{ color: "#ef4444", fontWeight: 600 }}>{t('thesisEnd', lang)}</span>
        </div>
      </div>

      {/* Era Filters */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ fontSize: 10, color: "#64748b", letterSpacing: 1, marginRight: 4 }}>{t('eraLabel', lang)}</span>
        <button onClick={() => setSelectedEra(null)} style={{
          padding: "4px 12px", borderRadius: 4, fontSize: 10, fontWeight: 500, border: "1px solid",
          borderColor: selectedEra === null ? "#e2e8f0" : "#1a1f2e",
          background: selectedEra === null ? "#e2e8f01a" : "transparent",
          color: selectedEra === null ? "#e2e8f0" : "#64748b", cursor: "pointer", fontFamily: "inherit",
        }}>
          {t('allEras', lang)} ({events.length})
        </button>
        {eras.map((era) => {
          const count = events.filter((e) => e.era === era.id).length;
          return (
            <button key={era.id} onClick={() => setSelectedEra(era.id)} style={{
              padding: "4px 12px", borderRadius: 4, fontSize: 10, fontWeight: 500, border: "1px solid",
              borderColor: selectedEra === era.id ? era.color : "#1a1f2e",
              background: selectedEra === era.id ? `${era.color}1a` : "transparent",
              color: selectedEra === era.id ? era.color : "#64748b", cursor: "pointer", fontFamily: "inherit",
            }}>
              {tEra(era.id, lang)} ({count})
            </button>
          );
        })}
      </div>

      {/* Timeline */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} isExpanded={expandedId === event.id}
            onToggle={() => setExpandedId(expandedId === event.id ? null : event.id)} lang={lang} />
        ))}
      </div>

      <div style={{ textAlign: "center", fontSize: 10, color: "#475569", padding: 16 }}>
        {filteredEvents.length} {t('eventsDocumented', lang)}
        {selectedEra !== null && ` ${t('inThisEra', lang)}`}
      </div>
    </div>
  );
}

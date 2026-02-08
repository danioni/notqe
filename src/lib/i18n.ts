// Fed Watch — Internationalization (EN/ES)

export type Lang = 'es' | 'en';

const translations = {
  // Header
  subtitle: { es: 'Vigilancia Monetaria', en: 'Monetary Surveillance' },
  threatLevel: { es: 'Nivel de Amenaza', en: 'Threat Level' },
  nyTime: { es: 'HORA NY', en: 'NY TIME' },

  // Threat levels
  elevated: { es: 'ELEVADO', en: 'ELEVATED' },
  warning: { es: 'ALERTA', en: 'WARNING' },
  moderate: { es: 'MODERADO', en: 'MODERATE' },
  low: { es: 'BAJO', en: 'LOW' },

  // Tabs
  tabOverview: { es: 'Situación Actual', en: 'Current Status' },
  tabHistory: { es: 'Registro Histórico', en: 'Historical Record' },
  tabPattern: { es: 'El Patrón', en: 'The Pattern' },
  tabThreat: { es: 'Matriz de Amenaza', en: 'Threat Matrix' },

  // Overview
  currentReadings: { es: 'LECTURAS ACTUALES', en: 'CURRENT READINGS' },
  activeAlerts: { es: 'ALERTAS ACTIVAS', en: 'ACTIVE ALERTS' },
  srfUsage: { es: 'Uso del SRF', en: 'SRF Usage' },
  srfSubtitle: { es: 'Standing Repo Facility ($B)', en: 'Standing Repo Facility ($B)' },
  srfRecord: { es: 'Récord $74.6B', en: 'Record $74.6B' },
  octRecord: { es: 'Récord Oct', en: 'Oct Record' },
  balanceSheet: { es: 'Balance de la Fed', en: 'Fed Balance Sheet' },
  balanceSheetSub: { es: 'Activos Totales ($T) — Histórico', en: 'Total Assets ($T) — Historical' },

  // Current readings metrics
  metFedFunds: { es: 'Tasa Fed Funds', en: 'Fed Funds Rate' },
  metSrfCap: { es: 'Tope SRF', en: 'SRF Cap' },
  metQtStatus: { es: 'Estado QT', en: 'QT Status' },
  metBalanceSheet: { es: 'Balance de la Fed', en: 'Fed Balance Sheet' },
  metBankReserves: { es: 'Reservas Bancarias', en: 'Bank Reserves' },
  metOnRrp: { es: 'ON RRP', en: 'ON RRP' },
  metNotQe: { es: "Compras 'No QE'", en: "'Not QE' Purchases" },
  metWarsh: { es: 'Warsh', en: 'Warsh' },
  metPatternMatch: { es: 'Match Patrón 2019', en: '2019 Pattern Match' },

  // Current readings notes
  noteFedFunds: { es: '2 disidentes a favor de recortes', en: '2 dissenters favor cuts' },
  noteSrfCap: { es: 'Eliminado Dic 2025', en: 'Removed Dec 2025' },
  noteQtStatus: { es: 'Dic 2025', en: 'Dec 2025' },
  noteBalanceSheet: { es: 'Expandiéndose ↑', en: 'Expanding ↑' },
  noteBankReserves: { es: "Cerca de zona 'escasa'", en: "Near 'scarce' zone" },
  noteOnRrp: { es: 'Buffer agotado (era $2.5T)', en: 'Buffer depleted (was $2.5T)' },
  noteNotQe: { es: 'Bonos de corto plazo', en: 'Short-dated bonds' },
  noteWarsh: { es: 'Asume Mayo 2026', en: 'Assumes May 2026' },
  notePatternMatch: { es: "Estrés repo → 'no QE' → QE", en: "Repo stress → 'not QE' → QE" },

  // Values
  valUnlimited: { es: 'SIN LÍMITE', en: 'UNLIMITED' },
  valEnded: { es: 'TERMINADO', en: 'ENDED' },
  valActive: { es: 'ACTIVO', en: 'ACTIVE' },
  valPending: { es: 'PENDIENTE', en: 'PENDING' },

  // History tab
  centralThesis: { es: 'La Tesis Central', en: 'The Central Thesis' },
  thesisText: {
    es: 'Desde 1971, cada "crisis" se ha resuelto expandiendo la oferta monetaria, inventando nuevas facilidades, y devaluando el ahorro. Cada rescate crea la siguiente crisis más grande. Cada herramienta "temporal" se vuelve permanente. Cada "normalización" fracasa. El patrón es tan consistente que no puede ser incompetencia —',
    en: 'Since 1971, every "crisis" has been resolved by expanding the monetary supply, inventing new facilities, and devaluing savings. Each rescue creates the next, bigger crisis. Each "temporary" tool becomes permanent. Each "normalization" fails. The pattern is so consistent it cannot be incompetence —',
  },
  thesisEnd: { es: 'es diseño.', en: 'it is design.' },
  eraLabel: { es: 'ERA:', en: 'ERA:' },
  allEras: { es: 'Todas', en: 'All' },
  eventsDocumented: { es: 'eventos documentados', en: 'events documented' },
  inThisEra: { es: 'en esta era', en: 'in this era' },
  description: { es: 'Descripción', en: 'Description' },
  consequence: { es: 'Consecuencia', en: 'Consequence' },
  btcRelevance: { es: 'Relevancia Bitcoin', en: 'Bitcoin Relevance' },
  mechanism: { es: 'Mecanismo', en: 'Mechanism' },
  amount: { es: 'Monto', en: 'Amount' },

  // Era names
  era1: { es: 'Fin del Dinero Sólido', en: 'End of Sound Money' },
  era2: { es: 'La Era Greenspan', en: 'The Greenspan Era' },
  era3: { es: 'Gran Crisis Financiera', en: 'Great Financial Crisis' },
  era4: { es: 'Normalización Fallida', en: 'Failed Normalization' },
  era5: { es: 'COVID y Burbuja Total', en: 'COVID & Everything Bubble' },
  era6: { es: 'Ciclo Actual', en: 'Current Cycle' },

  // Pattern tab
  ratchetTitle: { es: 'Efecto Ratchet — El Piso Siempre Sube', en: 'Ratchet Effect — The Floor Always Rises' },
  ratchetDesc: {
    es: 'Cada QT remueve MENOS de lo que el QE anterior agregó. El piso sigue subiendo: $0.9T → $3.8T → $6.4T → ???',
    en: 'Each QT removes LESS than the previous QE added. Floor keeps rising: $0.9T → $3.8T → $6.4T → ???',
  },
  bsRatchet: { es: 'Balance Sheet — Efecto Ratchet', en: 'Balance Sheet — Ratchet Effect' },
  bsRatchetDesc: { es: 'QE expande, QT nunca regresa al baseline ($T)', en: 'QE expands, QT never returns to baseline ($T)' },
  preFloor: { es: 'Pre-2008: $0.9T', en: 'Pre-2008: $0.9T' },
  qtFloor: { es: 'Piso QT: $3.8T', en: 'QT Floor: $3.8T' },
  newFloor: { es: 'Nuevo Piso: $6.4T', en: 'New Floor: $6.4T' },
  fedFundsTitle: { es: 'Tasa Fed Funds — 50 Años', en: 'Fed Funds Rate — 50 Years' },
  fedFundsDesc: { es: '"Máximos más bajos" — cada ciclo termina más bajo (%)', en: '"Lower highs" — each cycle ends lower (%)' },
  debtGdpTitle: { es: 'Deuda / PIB', en: 'Debt / GDP' },
  debtGdpDesc: { es: 'Una dirección: arriba. Línea de referencia en 100% (%)', en: 'One direction: up. Reference line at 100% (%)' },
  debtGdpRef: { es: '100% Deuda/PIB', en: '100% Debt/GDP' },
  playbookTitle: { es: 'El Playbook: 2019 vs 2025-26', en: 'The Playbook: 2019 vs 2025-26' },
  playbookDesc: {
    es: 'Brecha entre "no QE" y QE real en 2019: 5 meses. Si el patrón se repite: expansión monetaria significativa para Mayo-Julio 2026.',
    en: 'Gap between "not QE" and actual QE in 2019: 5 months. If pattern repeats: significant monetary expansion by May-July 2026.',
  },
  precedent: { es: '2019 — El Precedente', en: '2019 — The Precedent' },
  now: { es: '2025-26 — Ahora', en: '2025-26 — Now' },
  phaseMapTitle: { es: 'Mapa de 5 Fases — Posición Actual', en: '5-Phase Map — Current Position' },
  phaseActive: { es: '● ACTIVA', en: '● ACTIVE' },
  phaseCompleted: { es: '✓ COMPLETADA', en: '✓ COMPLETED' },
  phasePending: { es: '○ PENDIENTE', en: '○ PENDING' },

  // Phase names
  phase1: { es: 'Hablar Duro', en: 'Talk Tough' },
  phase1Desc: { es: 'Nominar halcones, señalar disciplina, dejar que los mercados corrijan', en: 'Nominate hawks, signal discipline, let markets correct' },
  phase2: { es: 'Construir Backdoors', en: 'Build Backdoors' },
  phase2Desc: { es: 'Eliminar topes, crear facilidades, expandir infraestructura silenciosamente', en: 'Remove caps, create facilities, expand infrastructure silently' },
  phase3: { es: 'Manufacturar Crisis', en: 'Manufacture Crisis' },
  phase3Desc: { es: 'Los datos se deterioran, mercados caen, empleo se debilita', en: 'Data deteriorates, markets crash, employment weakens' },
  phase4: { es: 'Pivot Forzado', en: 'Forced Pivot' },
  phase4Desc: { es: "La 'emergencia' justifica la intervención. 'No QE' se convierte en QE", en: "'Emergency' justifies intervention. 'Not QE' becomes QE" },
  phase5: { es: 'Tomar Crédito', en: 'Take Credit' },
  phase5Desc: { es: 'El liderazgo "salva" la economía. La devaluación continúa', en: "Leadership 'saves' economy. Debasement continues" },

  // Threat Matrix
  compositeScore: { es: 'Score Compuesto de Amenaza', en: 'Composite Threat Score' },
  compositeDesc: {
    es: 'Promedio ponderado de 6 indicadores. Score actual indica',
    en: 'Weighted average of 6 indicators. Current score indicates',
  },
  elevatedProb: {
    es: 'probabilidad elevada',
    en: 'elevated probability',
  },
  compositeDesc2: {
    es: 'de expansión monetaria significativa en los próximos 3-6 meses.',
    en: 'of significant monetary expansion in the next 3-6 months.',
  },
  indicatorBreakdown: { es: 'DESCOMPOSICIÓN DE INDICADORES', en: 'INDICATOR BREAKDOWN' },
  levelDistribution: { es: 'Distribución de Niveles', en: 'Level Distribution' },

  // Threat indicator names
  tiSrf: { es: 'Infraestructura SRF', en: 'SRF Infrastructure' },
  tiSrfDetail: { es: 'Tope eliminado. Allotment ilimitado. Central clearing planeado.', en: 'Cap removed. Unlimited allotment. Central clearing planned.' },
  tiNarrative: { es: 'Brecha Narrativa vs Realidad', en: 'Narrative vs Reality Gap' },
  tiNarrativeDetail: { es: "Compras 'No QE' activas mientras hablan hawkish. Playbook 2019.", en: "'Not QE' purchases active while talking hawkish. 2019 playbook." },
  tiReserves: { es: 'Escasez de Reservas', en: 'Reserve Scarcity' },
  tiReservesDetail: { es: 'Reservas $2.81T — cerca del umbral 10% PIB de Waller.', en: "Reserves $2.81T — near Waller's 10% GDP threshold." },
  tiBs: { es: 'Dirección del Balance Sheet', en: 'Balance Sheet Direction' },
  tiBsDetail: { es: "QT terminó. Expandiéndose vía 'gestión de reservas'.", en: "QT ended. Expanding via 'reserve management.'" },
  tiPolitical: { es: 'Presión Política', en: 'Political Pressure' },
  tiPoliticalDetail: { es: 'Nominación de Warsh + disidencia FOMC creciente.', en: 'Warsh nomination + FOMC dissent growing.' },
  tiPattern: { es: 'Match de Patrón Histórico', en: 'Historical Pattern Match' },
  tiPatternDetail: { es: "Secuencia actual coincide con repo 2019 → 'no QE' → QE exactamente.", en: "Current sequence matches 2019 repo → 'not QE' → QE exactly." },

  // Threat levels for indicators
  lvlCritical: { es: 'Crítico', en: 'Critical' },
  lvlElevated: { es: 'Elevado', en: 'Elevated' },
  lvlWarning: { es: 'Alerta', en: 'Warning' },
  lvlLow: { es: 'Bajo', en: 'Low' },

  // Distribution labels
  distCritical: { es: 'Crítico (80+)', en: 'Critical (80+)' },
  distElevated: { es: 'Elevado (60-79)', en: 'Elevated (60-79)' },
  distWarning: { es: 'Alerta (40-59)', en: 'Warning (40-59)' },
  distLow: { es: 'Bajo (<40)', en: 'Low (<40)' },

  // Conclusion
  conclusion: { es: 'CONCLUSIÓN', en: 'CONCLUSION' },
  conclusionText: {
    es: 'La infraestructura para la próxima expansión monetaria ya está construida. El SRF ha sido destopeado, QT terminó, las compras "no QE" están activas, y el match de patrón histórico con 2019 es del 95%. La única variable faltante es el catalizador — y los catalizadores nunca son difíciles de encontrar.',
    en: 'The infrastructure for the next monetary expansion is already built. The SRF has been uncapped, QT has ended, "not QE" purchases are active, and the historical pattern match with 2019 is at 95%. The only missing variable is the catalyst — and catalysts are never hard to find.',
  },
  ecosystemConnection: { es: 'Conexión al Ecosistema', en: 'Ecosystem Connection' },
  ecosystemFlow: {
    es: 'El flujo: Fed Watch detecta los backdoors → Las Olas calcula cuándo la liquidez llega → LosRatios identifica dónde posicionarse.',
    en: 'The flow: Fed Watch detects the backdoors → Las Olas calculates when liquidity arrives → LosRatios identifies where to position.',
  },
  losratiosDesc: {
    es: 'Identifica activos relativamente baratos vía ratios. Cuando los ratios están deprimidos, el activo está subvalorado relativo a su par.',
    en: 'Identifies relatively cheap assets via ratios. When ratios are depressed, the asset is undervalued relative to its pair.',
  },
  olasDesc: {
    es: 'Calcula el timing de las olas de liquidez global para posicionarse en activos con buen performance histórico.',
    en: 'Calculates the timing of global liquidity waves to position in assets with good historical performance.',
  },
  fedwatchHere: { es: 'Fed Watch ← Estás aquí', en: 'Fed Watch ← You are here' },
  fedwatchDesc: {
    es: 'Vigila y documenta las manipulaciones monetarias que GENERAN las olas de liquidez. Sin entender los mecanismos, no puedes anticipar el timing.',
    en: 'Monitors and documents the monetary manipulations that GENERATE the liquidity waves. Without understanding the mechanisms, you cannot anticipate timing.',
  },
  btcStatement: {
    es: 'Bitcoin — con su emisión fija, reglas inmutables y ausencia de backdoors — es la primera tecnología en la historia que permite a los individuos opt-out de este sistema.',
    en: 'Bitcoin — with its fixed issuance, immutable rules, and absence of backdoors — is the first technology in history that allows individuals to opt-out of this system.',
  },
  btcConclusion: {
    es: 'No es una inversión. Es un seguro contra 50 años de evidencia.',
    en: "It's not an investment. It's insurance against 50 years of evidence.",
  },

  // Footer
  footerEcosystem: { es: 'Parte del ecosistema:', en: 'Part of the ecosystem:' },

  // Severity/status badges (keep short)
  badgeCritical: { es: 'crítico', en: 'critical' },
  badgeHigh: { es: 'alto', en: 'high' },
  badgeMedium: { es: 'medio', en: 'medium' },
  badgeActive: { es: 'activo', en: 'active' },
  badgePlanned: { es: 'planeado', en: 'planned' },
  badgePending: { es: 'pendiente', en: 'pending' },
  badgePermanent: { es: 'permanente', en: 'permanent' },
  badgeHistorical: { es: 'histórico', en: 'historical' },
  badgeExpired: { es: 'expirado', en: 'expired' },
  badgeEroding: { es: 'erosionando', en: 'eroding' },
} as const;

export type TranslationKey = keyof typeof translations;

export function t(key: TranslationKey, lang: Lang): string {
  return translations[key]?.[lang] || translations[key]?.['en'] || key;
}

// Helper for badge translations
export function tBadgeSeverity(severity: string, lang: Lang): string {
  const map: Record<string, TranslationKey> = {
    critical: 'badgeCritical',
    high: 'badgeHigh',
    medium: 'badgeMedium',
  };
  return map[severity] ? t(map[severity], lang) : severity;
}

export function tBadgeStatus(status: string, lang: Lang): string {
  const map: Record<string, TranslationKey> = {
    active: 'badgeActive',
    planned: 'badgePlanned',
    pending: 'badgePending',
    permanent: 'badgePermanent',
    historical: 'badgeHistorical',
    expired: 'badgeExpired',
    eroding: 'badgeEroding',
  };
  return map[status] ? t(map[status], lang) : status;
}

// Helper for era names
export function tEra(eraId: number, lang: Lang): string {
  const map: Record<number, TranslationKey> = {
    1: 'era1', 2: 'era2', 3: 'era3', 4: 'era4', 5: 'era5', 6: 'era6',
  };
  return map[eraId] ? t(map[eraId], lang) : '';
}

// Threat level label
export function tThreatLevel(score: number, lang: Lang): string {
  if (score >= 80) return t('elevated', lang);
  if (score >= 60) return t('warning', lang);
  if (score >= 40) return t('moderate', lang);
  return t('low', lang);
}

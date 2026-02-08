// Stealth QE Mechanisms — All the creative ways to print without calling it printing

import type { Lang } from './i18n';

export interface StealthMechanism {
  id: string;
  name: { es: string; en: string };
  status: 'active' | 'depleted' | 'expired' | 'standby' | 'permanent';
  injected: string;
  how: { es: string; en: string };
  color: string;
  introduced: number; // Year introduced
  introducedDetail: { es: string; en: string }; // Context for introduction
}

export const stealthMechanisms: StealthMechanism[] = [
  {
    id: 'srf',
    name: { es: 'Standing Repo Facility (SRF)', en: 'Standing Repo Facility (SRF)' },
    status: 'active',
    injected: '∞',
    how: {
      es: 'Repos overnight ilimitados contra Treasuries/MBS. Tope eliminado Dic 2025. Si bancos piden liquidez diaria, es rolling QE con etiqueta "no QE". Récord: $74.6B en un día.',
      en: 'Unlimited overnight repos against Treasuries/MBS. Cap removed Dec 2025. If banks need daily liquidity, it\'s rolling QE with a "not QE" label. Record: $74.6B in a single day.',
    },
    color: '#ef4444',
    introduced: 2021,
    introducedDetail: { es: 'Creada Jul 2021, destopada Dic 2025', en: 'Created Jul 2021, uncapped Dec 2025' },
  },
  {
    id: 'notqe',
    name: { es: 'Compras "No QE" (Reserve Management)', en: '"Not QE" Purchases (Reserve Management)' },
    status: 'active',
    injected: 'TBD',
    how: {
      es: 'Fed compra bonos de corto plazo para "gestión de reservas". Idéntico a Sep 2019. En 2019, "not QE" precedió al QE real por 5 meses. Balance sheet subiendo desde Ene 2026.',
      en: 'Fed buys short-dated bonds for "reserve management." Identical to Sep 2019. In 2019, "not QE" preceded actual QE by 5 months. Balance sheet rising since Jan 2026.',
    },
    color: '#ef4444',
    introduced: 2019,
    introducedDetail: { es: 'Primera vez Sep 2019, reaparecen Dic 2025', en: 'First used Sep 2019, reappeared Dec 2025' },
  },
  {
    id: 'onrrp',
    name: { es: 'ON RRP Drainage', en: 'ON RRP Drainage' },
    status: 'depleted',
    injected: '~$2.5T',
    how: {
      es: 'El ON RRP fue de $2.5T a $6B. Los money market funds sacaron liquidez del RRP y la metieron en T-bills. Inyección masiva stealth — cada dólar que sale del RRP entra al sistema financiero. Ya se agotó.',
      en: 'ON RRP went from $2.5T to $6B. Money market funds pulled liquidity from RRP into T-bills. Massive stealth injection — every dollar leaving RRP enters the financial system. Now depleted.',
    },
    color: '#64748b',
    introduced: 2013,
    introducedDetail: { es: 'Creada 2013, pico $2.5T en 2022, agotada 2025', en: 'Created 2013, peak $2.5T in 2022, depleted 2025' },
  },
  {
    id: 'tga',
    name: { es: 'TGA Drawdowns (Cuenta del Tesoro)', en: 'TGA Drawdowns (Treasury Account)' },
    status: 'standby',
    injected: 'Variable',
    how: {
      es: 'Cuando el Tesoro gasta de su General Account en la Fed, las reservas bancarias suben. Cada drawdown del TGA = inyección de liquidez. Usado repetidamente en techo de deuda — cuando el Tesoro no puede emitir, gasta el TGA.',
      en: 'When Treasury spends from its General Account at the Fed, bank reserves rise. Each TGA drawdown = liquidity injection. Used repeatedly during debt ceiling — when Treasury can\'t issue, it spends the TGA.',
    },
    color: '#f59e0b',
    introduced: 2011,
    introducedDetail: { es: 'Usado como herramienta desde crisis techo deuda 2011', en: 'Used as tool since 2011 debt ceiling crisis' },
  },
  {
    id: 'buybacks',
    name: { es: 'Treasury Buybacks (Recompras del Tesoro)', en: 'Treasury Buybacks' },
    status: 'active',
    injected: '$30B+ planned',
    how: {
      es: 'Tesoro recompra bonos off-the-run (ilíquidos) y emite nuevos on-the-run. Mejora liquidez del mercado de Treasuries. Efecto: reduce presión en yields, funciona como soporte indirecto. Bessent expandió el programa.',
      en: 'Treasury buys back off-the-run (illiquid) bonds and issues new on-the-run. Improves Treasury market liquidity. Effect: reduces yield pressure, functions as indirect support. Bessent expanded the program.',
    },
    color: '#f59e0b',
    introduced: 2024,
    introducedDetail: { es: 'Reintroducidos 2024, expandidos por Bessent 2025', en: 'Reintroduced 2024, expanded by Bessent 2025' },
  },
  {
    id: 'btfp',
    name: { es: 'Bank Term Funding Program (BTFP)', en: 'Bank Term Funding Program (BTFP)' },
    status: 'expired',
    injected: 'Peak $165B',
    how: {
      es: 'Préstamos a PAR VALUE por bonos que cotizaban a 80 centavos — subsidio del 20%. Inventado un domingo. Sin aprobación del Congreso. Expiró Mar 2024, pero demostró que la Fed puede inventar cualquier facilidad en un fin de semana.',
      en: 'Loans at PAR VALUE for bonds trading at 80 cents — 20% subsidy. Invented on a Sunday. No Congressional approval. Expired Mar 2024, but proved the Fed can invent any facility over a weekend.',
    },
    color: '#64748b',
    introduced: 2023,
    introducedDetail: { es: 'Inventado un domingo, Mar 12 2023. Expirado Mar 2024', en: 'Invented on a Sunday, Mar 12 2023. Expired Mar 2024' },
  },
  {
    id: 'fima',
    name: { es: 'FIMA Repo Facility', en: 'FIMA Repo Facility' },
    status: 'permanent',
    injected: 'Variable',
    how: {
      es: 'Repos para bancos centrales extranjeros contra Treasuries. Permite que bancos centrales moneticen Treasuries sin venderlos en mercado abierto (que haría subir yields). Backdoor para mantener demanda artificial de deuda US.',
      en: 'Repos for foreign central banks against Treasuries. Allows central banks to monetize Treasuries without selling in open market (which would raise yields). Backdoor to maintain artificial demand for US debt.',
    },
    color: '#3b82f6',
    introduced: 2020,
    introducedDetail: { es: 'Creada Mar 2020, hecha permanente Jul 2021', en: 'Created Mar 2020, made permanent Jul 2021' },
  },
  {
    id: 'discount',
    name: { es: 'Discount Window (redesigned)', en: 'Discount Window (redesigned)' },
    status: 'standby',
    injected: '∞',
    how: {
      es: 'Históricamente estigmatizado — usarlo señalaba debilidad. Desde 2023 la Fed trabaja para "destigmatizarlo", con new Standing Borrowing Facility. Otra ventanilla de liquidez ilimitada disfrazada de "reforma operacional".',
      en: 'Historically stigmatized — using it signaled weakness. Since 2023 the Fed works to "destigmatize" it, with new Standing Borrowing Facility. Another unlimited liquidity window disguised as "operational reform."',
    },
    color: '#3b82f6',
    introduced: 1913,
    introducedDetail: { es: 'Original 1913 con la Fed. Rediseñada 2023 para "destigmatizarla"', en: 'Original 1913 with the Fed. Redesigned 2023 to "destigmatize" it' },
  },
  {
    id: 'spv',
    name: { es: 'SPVs (Special Purpose Vehicles)', en: 'SPVs (Special Purpose Vehicles)' },
    status: 'standby',
    injected: '∞ potential',
    how: {
      es: 'Vehículos que permiten a la Fed comprar activos que legalmente no puede comprar directamente. Usados en 2008 (Maiden Lane), 2020 (bonos corporativos + ETFs via BlackRock). La Fed se asocia con el Tesoro y un asset manager. Precedente establecido para comprar cualquier cosa.',
      en: 'Vehicles that allow the Fed to buy assets it legally cannot buy directly. Used in 2008 (Maiden Lane), 2020 (corporate bonds + ETFs via BlackRock). Fed partners with Treasury and asset manager. Precedent set to buy anything.',
    },
    color: '#a855f7',
    introduced: 2008,
    introducedDetail: { es: 'Primera vez 2008 (Maiden Lane). Expandidos 2020 (corporativos + ETFs)', en: 'First used 2008 (Maiden Lane). Expanded 2020 (corporates + ETFs)' },
  },
  {
    id: 'fx-swaps',
    name: { es: 'FX Swap Lines (Líneas de Swap)', en: 'FX Swap Lines' },
    status: 'permanent',
    injected: 'Variable',
    how: {
      es: 'La Fed presta dólares a bancos centrales extranjeros (BCE, BOJ, BOE, etc.) a cambio de su moneda. Exporta liquidez en dólares globalmente sin que aparezca en el balance sheet doméstico. Usadas masivamente en 2008 y 2020.',
      en: 'The Fed lends dollars to foreign central banks (ECB, BOJ, BOE, etc.) in exchange for their currency. Exports dollar liquidity globally without appearing on domestic balance sheet. Used massively in 2008 and 2020.',
    },
    color: '#3b82f6',
    introduced: 1962,
    introducedDetail: { es: 'Originadas 1962. Expandidas masivamente 2008 y 2020', en: 'Originated 1962. Massively expanded 2008 and 2020' },
  },
  {
    id: 'ycc-implicit',
    name: { es: 'YCC Implícito (Yield Curve Control)', en: 'Implicit YCC (Yield Curve Control)' },
    status: 'standby',
    injected: '∞ potential',
    how: {
      es: 'No declarado oficialmente, pero cuando yields suben demasiado, la Fed o el Tesoro intervienen (buybacks, operaciones twist, jawboning). De facto controlan la curva sin admitirlo. Si se formaliza = impresión ilimitada para fijar tasas.',
      en: 'Not officially declared, but when yields rise too much, the Fed or Treasury intervene (buybacks, twist operations, jawboning). De facto controlling the curve without admitting it. If formalized = unlimited printing to fix rates.',
    },
    color: '#a855f7',
    introduced: 2022,
    introducedDetail: { es: 'De facto desde 2022 (jawboning + intervenciones). No declarado oficialmente', en: 'De facto since 2022 (jawboning + interventions). Not officially declared' },
  },
];

// Translation helpers for status labels
export function tMechStatus(status: string, lang: Lang): string {
  const map: Record<string, { es: string; en: string }> = {
    active: { es: 'ACTIVO', en: 'ACTIVE' },
    depleted: { es: 'AGOTADO', en: 'DEPLETED' },
    expired: { es: 'EXPIRADO', en: 'EXPIRED' },
    standby: { es: 'EN ESPERA', en: 'STANDBY' },
    permanent: { es: 'PERMANENTE', en: 'PERMANENT' },
  };
  return map[status]?.[lang] || status;
}

export const stealthQeTitle = {
  es: 'ARSENAL DE QE ENCUBIERTO',
  en: 'STEALTH QE ARSENAL',
};

export const stealthQeSubtitle = {
  es: 'Todos los mecanismos que la Fed ha inventado para inyectar liquidez sin llamarlo QE',
  en: 'Every mechanism the Fed has invented to inject liquidity without calling it QE',
};

export const mechLabels = {
  howItWorks: { es: 'Cómo funciona', en: 'How it works' },
  injected: { es: 'Inyectado', en: 'Injected' },
  introduced: { es: 'Introducido', en: 'Introduced' },
  status: { es: 'Estado', en: 'Status' },
  count: { es: 'mecanismos documentados', en: 'mechanisms documented' },
  activeCount: { es: 'activos ahora', en: 'active now' },
  totalCapacity: { es: 'Capacidad total: ilimitada. Cada crisis inventa uno nuevo.', en: 'Total capacity: unlimited. Each crisis invents a new one.' },
  timelineTitle: { es: 'LÍNEA DE TIEMPO — EVOLUCIÓN DEL ARSENAL', en: 'TIMELINE — ARSENAL EVOLUTION' },
  timelineSubtitle: { es: 'Cada crisis inventa nuevas herramientas. Ninguna se desmantela.', en: 'Each crisis invents new tools. None are dismantled.' },
};

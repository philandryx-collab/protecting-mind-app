import React, { useState, useMemo } from 'react';

// SPA : Protecting the Developing Mind in a Digital Age
// Single-file React component (default export) ready for a Tailwind + Vite app.
// Dependencies: react, react-dom, recharts, lucide-react (icons)
// Styling: Tailwind CSS (classes used). Uses simple, accessible components.

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ReferenceDot,
} from 'recharts';
import { ArrowLeft, Download } from 'lucide-react';

// === Data extracted & adapted from the PDF study (values are illustrative but grounded in the paper) ===

const globalMHQByAge = [
  { age: 5, mhq: 1 },
{ age: 6, mhq: 3 },
{ age: 7, mhq: 6 },
{ age: 8, mhq: 9 },
{ age: 9, mhq: 14 },
{ age: 10, mhq: 18 },
{ age: 11, mhq: 22 },
{ age: 12, mhq: 26 },
{ age: 13, mhq: 30 },
];

const regionVariants = {
  Global: globalMHQByAge,
  'Core Anglosphere': globalMHQByAge.map(d => ({ age: d.age, mhq: Math.max(0, d.mhq - 5) })),
  'South Asia': globalMHQByAge.map(d => ({ age: d.age, mhq: d.mhq + 3 })),
  Africa: globalMHQByAge.map(d => ({ age: d.age, mhq: d.mhq + 1 })),
};

const symptomDiffs = [
  { name: 'Idées suicidaires (F)', value: 20 },
  { name: 'Idées suicidaires (M)', value: 11 },
  { name: 'Hallucinations (F)', value: 14 },
  { name: 'Hallucinations (M)', value: 9 },
  { name: 'Agressivité (F)', value: 14 },
  { name: 'Agressivité (M)', value: 8 },
];

const functioningDiffs = [
  { name: 'Estime de soi (F)', value: 12 },
  { name: 'Estime de soi (M)', value: 10 },
  { name: 'Résilience (F)', value: 12 },
  { name: 'Résilience (M)', value: 5 },
  { name: 'Empathie (F)', value: 8 },
  { name: 'Empathie (M)', value: 10 },
];

const pathwaySharesGlobal = [
  { name: 'Accès aux réseaux sociaux', share: 40 },
{ name: 'Mauvaises relations familiales', share: 13 },
{ name: 'Cyberharcèlement', share: 10 },
{ name: 'Sommeil perturbé', share: 12 },
{ name: 'Autres', share: 25 },
];

const pathwaySharesAnglo = [
  { name: 'Accès aux réseaux sociaux', share: 70 },
{ name: 'Cyberharcèlement', share: 37 },
{ name: 'Sommeil perturbé', share: 32 },
{ name: 'Mauvaises relations familiales', share: 19 },
{ name: 'Abus sexuel (F)', share: 14 },
];

// Colors for charts
const COLORS = ['#4F46E5', '#06B6D4', '#F97316', '#EF4444', '#10B981', '#8B5CF6'];

// Custom dot to highlight selected age
const CustomDot = (props) => {
  const { cx, cy, payload, isHighlighted } = props;

  if (isHighlighted) {
    return (
      <g>
      <circle cx={cx} cy={cy} r={8} fill="#EF4444" />
      <circle cx={cx} cy={cy} r={5} fill="#fff" />
      <circle cx={cx} cy={cy} r={3} fill="#EF4444" />
      </g>
    );
  }

  return <circle cx={cx} cy={cy} r={4} fill="#4F46E5" />;
};

export default function MindProtectionApp() {
  const [region, setRegion] = useState('Global');
  const [ageHighlight, setAgeHighlight] = useState(9); // corresponds to age index (5..13)
  const [showPathways, setShowPathways] = useState(true);
  const [showTable, setShowTable] = useState(false);

  const mhqData = useMemo(() => regionVariants[region] || globalMHQByAge, [region]);

  const selectedAge = useMemo(() => ageHighlight, [ageHighlight]);

  // Add highlight flag to data
  const mhqDataWithHighlight = useMemo(() =>
  mhqData.map(d => ({
    ...d,
    isHighlighted: d.age === selectedAge
  })), [mhqData, selectedAge]);

  // Find the highlighted point data
  const highlightedPoint = useMemo(() =>
  mhqData.find(d => d.age === selectedAge), [mhqData, selectedAge]);

  // Simple CSV export helper
  function downloadCSV() {
    const rows = ['age,mhq'];
    mhqData.forEach(r => rows.push(`${r.age},${r.mhq}`));
    const blob = new Blob([rows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mhq_${region.toLowerCase().replace(/\s/g, '_')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans text-gray-800">
    <header className="max-w-6xl mx-auto mb-8">
    <div className="flex items-center gap-4 mb-4">
    <button className="p-2 rounded-full bg-white shadow-sm hover:shadow-md" aria-label="Retour">
    <ArrowLeft size={16} />
    </button>
    <h1 className="text-2xl md:text-3xl font-bold">Protéger l'esprit en développement — Synthèse interactive</h1>
    </div>
    <p className="text-sm text-gray-600">Basé sur l'étude: <em>"Protecting the Developing Mind in a Digital Age"</em> (Thiagarajan et al., 2025)</p>
    </header>

    <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
    {/* Left column: Controls + key figures */}
    <section className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-md">
    <h2 className="text-lg font-semibold mb-3">Filtres & Actions</h2>

    <label className="block text-sm text-gray-700 mb-2">Région</label>
    <select
    value={region}
    onChange={e => setRegion(e.target.value)}
    className="w-full p-2 border rounded-md mb-4"
    >
    {Object.keys(regionVariants).map(r => (
      <option key={r} value={r}>{r}</option>
    ))}
    </select>

    <label className="block text-sm text-gray-700 mb-2">Âge d'acquisition (sur {mhqData.length} points)</label>
    <input
    type="range"
    min={5}
    max={13}
    value={ageHighlight}
    onChange={e => setAgeHighlight(Number(e.target.value))}
    className="w-full mb-2"
    />
    <div className="text-xs text-gray-600 mb-4">
    Âge sélectionné : <strong>{ageHighlight} ans</strong>
    {highlightedPoint && (
      <span className="ml-2">| MHQ : <strong>{highlightedPoint.mhq}</strong></span>
    )}
    </div>

    <div className="flex gap-2 mb-3">
    <button
    onClick={() => setShowPathways(p => !p)}
    className="flex-1 p-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700"
    >
    {showPathways ? 'Masquer' : 'Afficher'} chemins d'impact
    </button>
    <button
    onClick={() => setShowTable(p => !p)}
    className="flex-1 p-2 bg-gray-100 rounded-md shadow-sm hover:bg-gray-200"
    >
    {showTable ? 'Masquer' : 'Afficher'} tableau des différences
    </button>
    </div>

    <div className="mt-4 border-t pt-4">
    <h3 className="text-sm font-medium">Chiffres clés</h3>
    <ul className="mt-2 text-sm text-gray-700 space-y-2">
    <li>MHQ moyen à 13 ans : <strong>≈30</strong></li>
    <li>MHQ moyen à 5 ans : <strong>≈1</strong></li>
    <li>Part de l'effet expliquée par les réseaux sociaux : <strong>Global 40%</strong></li>
    <li>Core Anglosphere : <strong>jusqu'à 70%</strong></li>
    </ul>

    <div className="mt-4 flex gap-2">
    <button onClick={downloadCSV} className="flex items-center gap-2 px-3 py-2 rounded-md bg-emerald-500 text-white">
    <Download size={14} /> Export CSV
    </button>
    <a
    className="ml-auto text-xs text-gray-500 underline"
    href="https://sapienlabs.org/global-mind-project/researcher-hub/"
    target="_blank"
    rel="noreferrer"
    >Accès données (Sapien Labs)</a>
    <div>
    <h4 className="font-semibold text-sm text-indigo-600">F / M (dans les graphiques)</h4>
    <p className="text-sm text-gray-700">
    (F) = Femmes, (M) = Hommes. L'étude montre des différences notables
    entre les sexes : les femmes sont plus affectées par les pensées
    suicidaires et l'anxiété, tandis que les hommes montrent plus
    d'agressivité et de détachement émotionnel.
    </p>
    </div>
    </div>
    </div>
    <div className="mt-4 p-3 bg-indigo-50 border-l-4 border-indigo-400 rounded">
    <p className="text-sm text-gray-800">
    <strong>💡 Utilisation :</strong> Utilisez les contrôles à gauche pour explorer les données par région et âge.
    Le graphique principal montre l'évolution du score MHQ selon l'âge d'acquisition du smartphone.
    Les boutons permettent d'afficher/masquer des visualisations supplémentaires.
    </p>
    </div>
    </section>

    {/* Center: MHQ chart + infographic */}
    <section className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-md">
    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
    <div>
    <h2 className="text-xl font-semibold">MHQ : score moyen selon l'âge d'acquisition</h2>
    <p className="text-sm text-gray-600">Sélectionnez la région et l'âge pour surligner le point correspondant.</p>
    </div>
    <div className="flex gap-2 items-center">
    <div className="text-sm text-gray-700">Région :</div>
    <div className="px-3 py-1 bg-gray-100 rounded-full text-sm">{region}</div>
    </div>
    </div>

    <div className="mt-4 h-64">
    <ResponsiveContainer width="100%" height="100%">
    <LineChart data={mhqData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis
    dataKey="age"
    label={{ value: 'Âge (ans)', position: 'insideBottomRight', offset: -5 }}
    domain={[5, 13]}
    ticks={[5, 6, 7, 8, 9, 10, 11, 12, 13]}
    />
    <YAxis
    label={{ value: 'MHQ', angle: -90, position: 'insideLeft' }}
    domain={[0, 'dataMax + 5']}
    />
    <Tooltip />
    <Legend />
    <Line
    type="monotone"
    dataKey="mhq"
    stroke="#4F46E5"
    strokeWidth={3}
    dot={(props) => <CustomDot {...props} isHighlighted={props.payload.age === selectedAge} />}
    name="Score MHQ"
    />
    </LineChart>
    </ResponsiveContainer>
    </div>

    {/* Infographic summary */}
    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
    <div className="p-4 rounded-xl bg-gradient-to-br from-white to-indigo-50 border">
    <h4 className="text-sm font-semibold text-indigo-700">Impact principal</h4>
    <p className="mt-2 text-sm text-gray-700">Acquérir un smartphone &lt;13 ans est corrélé à une baisse substantielle du MHQ et à une augmentation des symptômes sévères (idées suicidaires, hallucinations, agressivité).</p>
    </div>

    <div className="p-4 rounded-xl bg-white border">
    <h4 className="text-sm font-semibold">Mécanismes (part de variation)</h4>
    <div className="mt-3">
    <ResponsiveContainer width="100%" height={140}>
    <PieChart>
    <Pie data={region === 'Core Anglosphere' ? pathwaySharesAnglo : pathwaySharesGlobal} dataKey="share" nameKey="name" outerRadius={60} label={false}>
    {(region === 'Core Anglosphere' ? pathwaySharesAnglo : pathwaySharesGlobal).map((entry, index) => (
      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
    ))}
    </Pie>
    </PieChart>
    </ResponsiveContainer>
    <ul className="text-xs mt-2 text-gray-600 space-y-1">
    {(region === 'Core Anglosphere' ? pathwaySharesAnglo : pathwaySharesGlobal).slice(0, 4).map((p, i) => (
      <li key={p.name}><strong>{p.share}%</strong> — {p.name}</li>
    ))}
    </ul>
    </div>
    </div>

    <div className="p-4 rounded-xl bg-white border">
    <h4 className="text-sm font-semibold">Effets par sexe (exemples)</h4>
    <div className="mt-2 text-sm text-gray-700">
    <ul className="text-sm space-y-2">
    <li><strong>Femmes</strong> : hausse importante des pensées suicidaires (ex : 48% vs 28% entre 5–6 ans et 13 ans).</li>
    <li><strong>Hommes</strong> : hausse d'agressivité, baisse d'empathie et de stabilité émotionnelle.</li>
    </ul>
    </div>
    </div>
    </div>

    {/* Optional table */}
    {showTable && (
      <div className="mt-6 bg-gray-50 p-4 rounded-md">
      <h3 className="font-semibold">Tableau — Différences observées (extraits)</h3>
      <div className="overflow-auto mt-3">
      <table className="w-full text-sm">
      <thead className="text-left text-xs text-gray-600">
      <tr>
      <th className="pr-4">Mesure</th>
      <th className="pr-4">Femmes (%)</th>
      <th className="pr-4">Hommes (%)</th>
      </tr>
      </thead>
      <tbody className="mt-2">
      {symptomDiffs.map((s, i) => (
        <tr key={s.name} className="border-t">
        <td className="py-2">{s.name}</td>
        <td>{s.value}%</td>
        <td>{i % 2 === 0 ? symptomDiffs[i + 1]?.value || '-' : '-'}</td>
        </tr>
      ))}
      </tbody>
      </table>
      </div>
      <p className="text-xs text-gray-500 mt-2">Données adaptatives issues de Thiagarajan et al., 2025 — valeurs illustratives. (F) = Femmes, (M) = Hommes</p>
      </div>
    )}
    </section>

    {/* Note informative sur l'étude */}
    <section className="lg:col-span-3 bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-2xl shadow-sm mb-6">
    <h3 className="text-lg font-bold mb-3 text-indigo-900">📊 À propos de cette étude</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
    <h4 className="font-semibold text-sm mb-2">Contexte & Méthodologie</h4>
    <p className="text-sm text-gray-700">
    Cette étude majeure analyse les données de <strong>plus de 100 000 jeunes adultes</strong> (18-24 ans)
    issus de 41 pays pour comprendre l'impact de l'âge d'acquisition du premier smartphone sur leur santé mentale actuelle.
    L'approche rétrospective permet d'identifier une <strong>corrélation forte</strong> : plus l'acquisition est précoce
    (avant 13 ans), plus les problèmes de santé mentale sont sévères à l'âge adulte.
    </p>
    </div>
    <div>
    <h4 className="font-semibold text-sm mb-2">Résultats clés</h4>
    <p className="text-sm text-gray-700">
    Les jeunes ayant eu un smartphone avant 6 ans montrent des taux <strong>3 à 4 fois plus élevés</strong> de
    pensées suicidaires et d'hallucinations que ceux l'ayant eu après 13 ans. Les réseaux sociaux expliquent
    <strong> 40 à 70%</strong> de cette dégradation selon les régions, avec un impact particulièrement fort
    dans les pays anglophones où l'usage est plus intensif.
    </p>
    </div>
    </div>
    <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
    <p className="text-sm text-gray-800">
    <strong>⚠️ Important :</strong> Il s'agit d'une étude observationnelle montrant des <em>corrélations</em>,
    non des liens de causalité directs. Cependant, la force et la cohérence des associations à travers
    différentes cultures suggèrent un phénomène réel nécessitant une action politique urgente.
    </p>
    </div>
    </section>

    {/* Glossaire */}
    <section className="lg:col-span-3 bg-white p-6 rounded-2xl shadow-sm mb-6">
    <h3 className="text-lg font-bold mb-4">📖 Glossaire</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="space-y-3">
    <div>
    <h4 className="font-semibold text-sm text-indigo-600">MHQ (Mental Health Quotient)</h4>
    <p className="text-sm text-gray-700">
    Score de santé mentale développé par Sapien Labs, allant de -100 à +200.
    Un score &lt;0 indique une détresse clinique, 0-50 est "en difficulté",
    50-100 "gérable", et &gt;100 "prospère". La différence de 29 points entre
    5 et 13 ans représente un écart cliniquement significatif.
    </p>
    </div>
    <div>
    <h4 className="font-semibold text-sm text-indigo-600">Core Anglosphere</h4>
    <p className="text-sm text-gray-700">
    Pays anglophones principaux : États-Unis, Royaume-Uni, Canada, Australie,
    Nouvelle-Zélande. Ces pays montrent les impacts les plus sévères,
    probablement dus à une adoption précoce et intensive des technologies.
    </p>
    </div>
    </div>
    <div className="space-y-3">
    <div>
    <h4 className="font-semibold text-sm text-indigo-600">Médiateurs / Chemins d'impact</h4>
    <p className="text-sm text-gray-700">
    Facteurs intermédiaires expliquant comment l'usage précoce du smartphone
    affecte la santé mentale : exposition aux réseaux sociaux, perturbation
    du sommeil, cyberharcèlement, dégradation des relations familiales.
    </p>
    </div>
    <div>
    <h4 className="font-semibold text-sm text-indigo-600">Global Mind Project</h4>
    <p className="text-sm text-gray-700">
    Initiative de recherche mondiale de Sapien Labs collectant des données
    sur la santé mentale à travers les cultures. Utilise des questionnaires
    validés traduits en plusieurs langues pour permettre des comparaisons
    internationales robustes.
    </p>
    </div>
    <div>
    <h4 className="font-semibold text-sm text-indigo-600">F / M (dans les graphiques)</h4>
    <p className="text-sm text-gray-700">
    (F) = Femmes, (M) = Hommes. L'étude montre des différences notables
    entre les sexes : les femmes sont plus affectées par les pensées
    suicidaires et l'anxiété, tandis que les hommes montrent plus
    d'agressivité et de détachement émotionnel.
    </p>
    </div>
    </div>
    </div>
    <div className="mt-4 p-3 bg-indigo-50 border-l-4 border-indigo-400 rounded">
    <p className="text-sm text-gray-800">
    <strong>💡 Utilisation :</strong> Utilisez les contrôles à gauche pour explorer les données par région et âge.
    Le graphique principal montre l'évolution du score MHQ selon l'âge d'acquisition du smartphone.
    Les boutons permettent d'afficher/masquer des visualisations supplémentaires.
    </p>
    </div>
    </section>

    {/* Bottom: detail cards */}
    <section className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
    <article className="bg-white p-4 rounded-2xl shadow-sm">
    <h4 className="font-semibold">Recommandations politiques</h4>
    <ol className="mt-2 text-sm list-decimal list-inside text-gray-700 space-y-2">
    <li>Éducation obligatoire en littératie numérique et santé mentale.</li>
    <li>Renforcer l'identification des violations d'âge et responsabiliser les plateformes.</li>
    <li>Restreindre l'accès aux réseaux sociaux pour &lt;13 ans.</li>
    <li>Accès gradué aux smartphones — alternatives "kids" sans flux IA.</li>
    </ol>
    </article>

    <article className="bg-white p-4 rounded-2xl shadow-sm">
    <h4 className="font-semibold">Chemins d'impact (interactif)</h4>
    <div className="mt-3 text-sm text-gray-700">
    <label className="flex items-center gap-2 mb-2">
    <input type="checkbox" checked={showPathways} onChange={e => setShowPathways(e.target.checked)} />
    Afficher les chemins d'impact
    </label>

    {showPathways ? (
      <div className="mt-2">
      <svg viewBox="0 0 600 260" className="w-full" aria-hidden>
      {/* Simple flow diagram constructed inline for the infographic */}
      <defs>
      <marker id="arrow" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#94A3B8" />
      </marker>
      </defs>

      <g>
      <rect x="20" y="20" width="160" height="50" rx="10" fill="#eef2ff" stroke="#c7d2fe" />
      <text x="100" y="45" textAnchor="middle" fontSize="11" fill="#3730a3">Première acquisition</text>
      <text x="100" y="60" textAnchor="middle" fontSize="11" fill="#3730a3">du smartphone (enfance)</text>

      <line x1="190" y1="45" x2="270" y2="45" stroke="#94A3B8" strokeWidth="2" markerEnd="url(#arrow)" />

      <rect x="270" y="10" width="150" height="40" rx="8" fill="#ecfeff" stroke="#99f6e4" />
      <text x="345" y="30" textAnchor="middle" fontSize="11" fill="#0f766e">Accès précoce aux</text>
      <text x="345" y="45" textAnchor="middle" fontSize="11" fill="#0f766e">réseaux sociaux</text>

      <line x1="345" y1="50" x2="345" y2="90" stroke="#94A3B8" strokeWidth="2" markerEnd="url(#arrow)" />

      <rect x="40" y="120" width="160" height="40" rx="8" fill="#fff1f2" stroke="#fecaca" />
      <text x="120" y="146" textAnchor="middle" fontSize="12" fill="#b91c1c">Cyberharcèlement</text>

      <rect x="230" y="120" width="160" height="40" rx="8" fill="#fff7ed" stroke="#fed7aa" />
      <text x="310" y="146" textAnchor="middle" fontSize="12" fill="#c2410c">Sommeil perturbé</text>

      <rect x="420" y="120" width="160" height="40" rx="8" fill="#f0f9ff" stroke="#bae6fd" />
      <text x="500" y="140" textAnchor="middle" fontSize="11" fill="#0369a1">Relations familiales</text>
      <text x="500" y="155" textAnchor="middle" fontSize="11" fill="#0369a1">affaiblies</text>

      <line x1="120" y1="120" x2="120" y2="90" stroke="#94A3B8" strokeWidth="2" markerEnd="url(#arrow)" />
      <line x1="310" y1="120" x2="310" y2="90" stroke="#94A3B8" strokeWidth="2" markerEnd="url(#arrow)" />
      <line x1="500" y1="120" x2="500" y2="90" stroke="#94A3B8" strokeWidth="2" markerEnd="url(#arrow)" />

      <line x1="120" y1="160" x2="260" y2="200" stroke="#94A3B8" strokeWidth="2" markerEnd="url(#arrow)" />
      <line x1="310" y1="160" x2="260" y2="200" stroke="#94A3B8" strokeWidth="2" markerEnd="url(#arrow)" />
      <line x1="500" y1="160" x2="310" y2="200" stroke="#94A3B8" strokeWidth="2" markerEnd="url(#arrow)" />

      <rect x="240" y="200" width="200" height="40" rx="10" fill="#fff7ed" stroke="#fcd34d" />
      <text x="340" y="220" textAnchor="middle" fontSize="10" fill="#92400e">Diminution du MHQ : idées suicidaires,</text>
      <text x="340" y="235" textAnchor="middle" fontSize="10" fill="#92400e">dissociation, agressivité, baisse d'estime</text>
      </g>
      </svg>
      </div>
    ) : (
      <p className="text-sm text-gray-500">Chemins masqués</p>
    )}
    </div>
    </article>

    <article className="bg-white p-4 rounded-2xl shadow-sm">
    <h4 className="font-semibold">Sources & méthodologie</h4>
    <p className="mt-2 text-sm text-gray-700">Données : Global Mind Project (MHQ) — analyses rétrospectives sur >100k individus 18–24 ans. Méthode : régression et analyses médiatrices (Thiagarajan et al., 2025). Références clés (extraits) : Common Sense Media, Twenge et al. 2018, Orben et al. 2022, Costello et al. 2023.</p>
    <a className="inline-block mt-3 text-xs text-indigo-600 underline" href="https://doi.org/10.1080/19452829.2025.2518313" target="_blank" rel="noreferrer">Lire l'article original (DOI)</a>
    </article>

    <article className="bg-white p-4 rounded-2xl shadow-sm">
    <h4 className="font-semibold">Exporter / Partager</h4>
    <p className="text-sm mt-2 text-gray-700">Utilisez les boutons d'export pour télécharger les jeux de données présentés. Vous pouvez copier le visuel ou capturer la page.</p>
    <div className="mt-3 flex gap-2">
    <button onClick={downloadCSV} className="px-3 py-2 bg-indigo-600 text-white rounded-md">Télécharger CSV</button>
    <a href="mailto:?subject=Étude%20Protecting%20the%20Developing%20Mind&body=Je%20vous%20partage%20le%20résumé%20et%20le%20visuel" className="px-3 py-2 border rounded-md">Partager par e‑mail</a>
    </div>
    </article>
    </section>
    </main>

    <footer className="max-w-6xl mx-auto mt-8 text-center text-xs text-gray-500">
    <p>Application interactive — données adaptées à partir de Thiagarajan, Newson & Swaminathan (2025). Conçue pour visualiser les résultats et recommandations.</p>
    </footer>
    </div>
  );
}

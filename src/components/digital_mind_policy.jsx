import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { motion } from "framer-motion";

export default function App() {
  // Données MHQ par âge d'acquisition smartphone
  const mhqData = [
    { age: '5 ans', score: 1 },
    { age: '8 ans', score: 10 },
    { age: '10 ans', score: 20 },
    { age: '13 ans', score: 30 }
  ];

  // Facteurs médiateurs (globaux)
  const mediatorsData = [
    { name: 'Accès précoce aux réseaux sociaux', value: 40 },
    { name: 'Relations familiales dégradées', value: 13 },
    { name: 'Cyberharcèlement', value: 10 },
    { name: 'Sommeil perturbé', value: 12 }
  ];

  const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-center"
      >
        Protéger l’esprit en développement à l’ère numérique
      </motion.h1>

      <Card className="shadow-lg">
        <CardContent className="p-6 space-y-4">
          <p>
            Cette application interactive présente les résultats de l’étude <em>Protecting the Developing Mind in a Digital Age</em> (Thiagarajan et al., 2025), analysant l’impact de l’âge d’acquisition du premier smartphone sur la santé mentale des jeunes adultes.
          </p>
          <p>
            Les données sont issues du <strong>Global Mind Project</strong> et mettent en évidence une détérioration progressive du bien-être mental (MHQ) lorsque le premier smartphone est acquis avant 13 ans.
          </p>
        </CardContent>
      </Card>

      {/* Graphique MHQ */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Score MHQ moyen selon l’âge d’acquisition</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mhqData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="age" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="score" fill="#36A2EB" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Graphique médiateurs */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Facteurs médiateurs de l’impact</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={mediatorsData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {mediatorsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recommandations */}
      <Card>
        <CardContent className="p-6 space-y-3">
          <h2 className="text-xl font-semibold">Recommandations politiques clés</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Éducation obligatoire à la littératie numérique et à la santé mentale avant accès aux réseaux sociaux.</li>
            <li>Responsabilisation et sanctions pour les entreprises technologiques en cas de non-respect des âges.</li>
            <li>Interdiction des réseaux sociaux pour les moins de 13 ans, avec contrôle technique renforcé.</li>
            <li>Restrictions sur l’usage du smartphone pour les moins de 13 ans, avec alternatives adaptées.</li>
          </ul>
          <Button className="mt-4" onClick={() => window.open('https://doi.org/10.1080/19452829.2025.2518313', '_blank')}>Lire l’étude complète</Button>
        </CardContent>
      </Card>
    </div>
  );
}

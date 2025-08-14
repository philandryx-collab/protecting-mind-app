import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Protéger l'esprit en développement - Projets
        </h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-2">Étude Interactive</h2>
            <p className="text-gray-700 mb-4">
              Un tableau de bord interactif pour explorer les données de l'étude "Protéger l'esprit en développement".
            </p>
            <Link to="/study" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Accéder à l'étude interactive
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-2">Synthèse Politique</h2>
            <p className="text-gray-700 mb-4">
              Un résumé des principales conclusions et des recommandations politiques de l'étude.
            </p>
            <Link to="/policy" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Voir la synthèse politique
            </Link>
          </div>
        </div>
        <div className="text-center mt-8">
            <Link to="/login" className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">
                Connexion
            </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

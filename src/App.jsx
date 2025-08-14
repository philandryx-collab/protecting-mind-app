import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SPAProtectingMind from './components/spa_protecting_developing_mind_study';
import DigitalMindPolicy from './components/digital_mind_policy';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/study" element={<SPAProtectingMind />} />
      <Route path="/policy" element={<DigitalMindPolicy />} />
    </Routes>
  );
}

export default App;

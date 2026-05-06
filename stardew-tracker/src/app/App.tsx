import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '@ui/layout';
import { Bundles } from '@features/bundles';
import { Villagers } from '@features/villagers';
import { Agenda } from '@features/agenda';
import { Settings } from '@features/settings';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Agenda />} />
          <Route path="bundles" element={<Bundles />} />
          <Route path="villagers" element={<Villagers />} />
          <Route path="agenda" element={<Agenda />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import Shell from './components/Shell.jsx';
import { CallProvider } from './components/CallContext.jsx';
import { PulseProvider } from './components/PulseContext.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Plan, { CallsToMake, Incoming, Recent } from './pages/Plan.jsx';
import Calendar from './pages/Calendar.jsx';
import PulseHome, { Channel } from './pages/Pulse.jsx';

// HashRouter keeps deep links working on any static host with no server config.
export default function App() {
  return (
    <PulseProvider>
      <CallProvider>
        <HashRouter>
          <Routes>
            <Route element={<Shell />}>
              <Route index element={<Dashboard />} />
              <Route path="plan" element={<Plan />}>
                <Route index element={<Navigate to="calls" replace />} />
                <Route path="calls" element={<CallsToMake />} />
                <Route path="incoming" element={<Incoming />} />
                <Route path="recent" element={<Recent />} />
              </Route>
              <Route path="calendar" element={<Calendar />} />
              <Route path="pulse" element={<PulseHome />} />
              <Route path="pulse/:id" element={<Channel />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </HashRouter>
      </CallProvider>
    </PulseProvider>
  );
}

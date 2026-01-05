
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Severity, ThreatType, SecurityAlert, SecurityStatus, NetworkLog } from './types';
import { 
  ShieldCheckIcon, 
  ExclamationTriangleIcon, 
  ActivityIcon, 
  LockIcon, 
  GlobeAltIcon,
  TrashIcon
} from './components/Icons';
import DetectionEngine from './services/detectionEngine';
import AlertList from './components/AlertList';
import SecurityMeter from './components/SecurityMeter';
import NetworkLogTable from './components/NetworkLogTable';

const App: React.FC = () => {
  const [alerts, setAlerts] = useState<SecurityAlert[]>([]);
  const [status, setStatus] = useState<SecurityStatus>({
    score: 100,
    activeThreats: 0,
    lastScan: Date.now(),
    sslValid: true,
    dnsIntegrity: true
  });
  const [logs, setLogs] = useState<NetworkLog[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);
  
  const detectionEngine = useRef(new DetectionEngine());

  const addAlert = useCallback((alert: Omit<SecurityAlert, 'id' | 'timestamp'>) => {
    const newAlert: SecurityAlert = {
      ...alert,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now()
    };
    setAlerts(prev => [newAlert, ...prev].slice(0, 50));
    
    // Update score based on severity
    setStatus(prev => {
      const penalty = alert.severity === Severity.CRITICAL ? 25 : alert.severity === Severity.HIGH ? 15 : 5;
      return {
        ...prev,
        score: Math.max(0, prev.score - penalty),
        activeThreats: prev.activeThreats + 1
      };
    });
  }, []);

  const runSimulation = useCallback(async () => {
    if (!isMonitoring) return;

    // Simulate real-time network probes
    const results = await detectionEngine.current.probeNetwork();
    
    setLogs(prev => [results.log, ...prev].slice(0, 10));

    if (results.threats.length > 0) {
      results.threats.forEach(t => addAlert(t));
    }
    
    setStatus(prev => ({ ...prev, lastScan: Date.now() }));
  }, [isMonitoring, addAlert]);

  useEffect(() => {
    let interval: any;
    if (isMonitoring) {
      interval = setInterval(runSimulation, 3000);
    }
    return () => clearInterval(interval);
  }, [isMonitoring, runSimulation]);

  const clearAlerts = () => {
    setAlerts([]);
    setStatus(prev => ({ ...prev, score: 100, activeThreats: 0 }));
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-6">
      {/* Header */}
      <header className="flex justify-between items-center bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-700">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <ShieldCheckIcon className="text-emerald-400 w-8 h-8" />
            NetGuard <span className="text-sm font-normal text-slate-400">v1.0</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">Public Wi-Fi Threat Monitor</p>
        </div>
        <button 
          onClick={() => setIsMonitoring(!isMonitoring)}
          className={`px-6 py-2 rounded-full font-semibold transition-all ${
            isMonitoring 
              ? 'bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500/30' 
              : 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-600'
          }`}
        >
          {isMonitoring ? 'Stop Shield' : 'Start Shield'}
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Status Column */}
        <div className="md:col-span-1 space-y-6">
          <SecurityMeter score={status.score} />
          
          <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700 space-y-4">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Environment Status</h3>
            <div className="space-y-3">
              <StatusItem 
                icon={<LockIcon className="w-5 h-5 text-blue-400" />} 
                label="SSL Integrity" 
                value={status.sslValid ? 'Validated' : 'Compromised'} 
                isDanger={!status.sslValid}
              />
              <StatusItem 
                icon={<GlobeAltIcon className="w-5 h-5 text-purple-400" />} 
                label="DNS Health" 
                value={status.dnsIntegrity ? 'Normal' : 'Hijacked'} 
                isDanger={!status.dnsIntegrity}
              />
              <StatusItem 
                icon={<ActivityIcon className="w-5 h-5 text-orange-400" />} 
                label="Latency" 
                value={isMonitoring ? `${Math.floor(Math.random() * 50) + 10}ms` : '---'} 
              />
            </div>
          </div>
        </div>

        {/* Alerts & Logs Column */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden flex flex-col h-[400px]">
            <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-800/50">
              <h3 className="font-bold flex items-center gap-2">
                <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500" />
                Live Threat Intelligence
              </h3>
              <button onClick={clearAlerts} className="text-slate-500 hover:text-white transition-colors">
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 bg-slate-900/50">
              {alerts.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-50">
                  <ShieldCheckIcon className="w-12 h-12 mb-2" />
                  <p>System clean. Monitoring active...</p>
                </div>
              ) : (
                <AlertList alerts={alerts} />
              )}
            </div>
          </div>

          <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Network Traffic Log</h3>
            <NetworkLogTable logs={logs} />
          </div>
        </div>
      </div>

      <footer className="text-center text-slate-500 text-xs py-4 border-t border-slate-800">
        &copy; 2024 NetGuard Security Architect. Academic Research Project.
      </footer>
    </div>
  );
};

const StatusItem: React.FC<{ icon: React.ReactNode, label: string, value: string, isDanger?: boolean }> = ({ icon, label, value, isDanger }) => (
  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/50 border border-slate-700/50">
    <div className="flex items-center gap-3">
      {icon}
      <span className="text-sm text-slate-300">{label}</span>
    </div>
    <span className={`text-sm font-mono ${isDanger ? 'text-red-400' : 'text-slate-400'}`}>{value}</span>
  </div>
);

export default App;

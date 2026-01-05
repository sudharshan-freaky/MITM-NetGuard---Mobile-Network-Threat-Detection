
import React from 'react';
import { SecurityAlert, Severity } from '../types';

interface AlertListProps {
  alerts: SecurityAlert[];
}

const AlertList: React.FC<AlertListProps> = ({ alerts }) => {
  return (
    <div className="space-y-3">
      {alerts.map((alert) => (
        <div 
          key={alert.id} 
          className={`p-4 rounded-xl border-l-4 bg-slate-800 transition-all animate-in slide-in-from-right-2 ${
            alert.severity === Severity.CRITICAL ? 'border-red-600' :
            alert.severity === Severity.HIGH ? 'border-orange-500' :
            alert.severity === Severity.MEDIUM ? 'border-yellow-500' : 'border-blue-500'
          }`}
        >
          <div className="flex justify-between items-start mb-1">
            <span className="text-xs font-bold uppercase tracking-tighter opacity-70">
              {alert.type}
            </span>
            <span className="text-[10px] text-slate-500 font-mono">
              {new Date(alert.timestamp).toLocaleTimeString()}
            </span>
          </div>
          <p className="text-sm text-slate-200">{alert.description}</p>
          <div className="mt-2 text-[10px] text-slate-500 font-medium">
            DETECTOR: {alert.source.toUpperCase()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlertList;

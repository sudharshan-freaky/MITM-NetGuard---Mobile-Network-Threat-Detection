
import React from 'react';
import { NetworkLog } from '../types';

interface NetworkLogTableProps {
  logs: NetworkLog[];
}

const NetworkLogTable: React.FC<NetworkLogTableProps> = ({ logs }) => {
  if (logs.length === 0) return <div className="text-center text-slate-600 py-4 italic text-sm">No traffic captured yet...</div>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-xs">
        <thead className="text-slate-500 border-b border-slate-700 uppercase">
          <tr>
            <th className="pb-2 font-medium">Domain</th>
            <th className="pb-2 font-medium">Protocol</th>
            <th className="pb-2 font-medium">Lat.</th>
            <th className="pb-2 font-medium">Fingerprint</th>
            <th className="pb-2 font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {logs.map((log, i) => (
            <tr key={i} className="group hover:bg-slate-700/30 transition-colors">
              <td className="py-3 font-semibold text-slate-300">{log.domain}</td>
              <td className="py-3">
                <span className={`px-2 py-0.5 rounded ${log.protocol === 'HTTP' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/10 text-blue-400'}`}>
                  {log.protocol}
                </span>
              </td>
              <td className="py-3 text-slate-400">{log.latency}ms</td>
              <td className="py-3 font-mono text-slate-500 text-[10px]">{log.fingerprint.substring(0, 11)}...</td>
              <td className="py-3">
                <span className={`w-2 h-2 rounded-full inline-block ${log.status === 'secure' ? 'bg-emerald-500 shadow-lg shadow-emerald-500/50' : 'bg-red-500 animate-pulse'}`}></span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NetworkLogTable;

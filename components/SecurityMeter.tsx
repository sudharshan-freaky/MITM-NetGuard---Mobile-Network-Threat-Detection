
import React from 'react';

interface SecurityMeterProps {
  score: number;
}

const SecurityMeter: React.FC<SecurityMeterProps> = ({ score }) => {
  const getColor = () => {
    if (score > 80) return 'text-emerald-400';
    if (score > 50) return 'text-yellow-400';
    return 'text-red-500';
  };

  const getBg = () => {
    if (score > 80) return 'bg-emerald-400';
    if (score > 50) return 'bg-yellow-400';
    return 'bg-red-500';
  };

  const getStatusText = () => {
    if (score > 80) return 'SAFE ENVIRONMENT';
    if (score > 50) return 'CAUTION ADVISED';
    return 'UNSAFE NETWORK';
  };

  return (
    <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 text-center space-y-4">
      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Network Integrity Score</h3>
      <div className="relative inline-block">
        <svg className="w-40 h-40 transform -rotate-90">
          <circle
            cx="80"
            cy="80"
            r="70"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-slate-700"
          />
          <circle
            cx="80"
            cy="80"
            r="70"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={440}
            strokeDashoffset={440 - (440 * score) / 100}
            className={`${getColor()} transition-all duration-1000 ease-out`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-4xl font-bold ${getColor()}`}>{score}</span>
          <span className="text-[10px] text-slate-500">POINTS</span>
        </div>
      </div>
      <div>
        <div className={`text-sm font-bold tracking-widest ${getColor()}`}>
          {getStatusText()}
        </div>
      </div>
    </div>
  );
};

export default SecurityMeter;

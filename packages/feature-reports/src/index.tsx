import React, { useState, useEffect } from 'react';
import { Card } from '@taskflow/ui-components';
import { storage } from '@taskflow/utils';
import { LayoutDashboard, CheckSquare, Briefcase, Users2, MoreHorizontal } from 'lucide-react';

export const StatisticsDashboard: React.FC = () => {
  const [stats, setStats] = useState({ tasks: 0, projects: 0, teams: 0 });

  useEffect(() => {
    const updateStats = () => {
      setStats({
        tasks: storage.get<any[]>('tasks', []).length,
        projects: storage.get<any[]>('projects', []).length,
        teams: storage.get<any[]>('teams', []).length,
      });
    };
    updateStats();
    window.addEventListener('storage', updateStats);
    return () => window.removeEventListener('storage', updateStats);
  }, []);

  const statCards = [
    { label: 'Total Tasks', value: stats.tasks, icon: <CheckSquare className="w-6 h-6" />, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Active Projects', value: stats.projects, icon: <Briefcase className="w-6 h-6" />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Collaborative Teams', value: stats.teams, icon: <Users2 className="w-6 h-6" />, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <LayoutDashboard className="w-8 h-8 text-indigo-600" />
        <h2 className="text-2xl font-bold text-gray-900">Workspace Statistics</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map(s => (
          <Card key={s.label} className="p-8 relative overflow-hidden group">
            <div className={`absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity ${s.color}`}>
              {s.icon}
            </div>
            <div className={`h-12 w-12 rounded-2xl ${s.bg} ${s.color} flex items-center justify-center mb-6`}>
              {s.icon}
            </div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">{s.label}</p>
            <h3 className="text-5xl font-black text-gray-900 mt-2">{s.value}</h3>
          </Card>
        ))}
      </div>

      <Card className="p-8 bg-indigo-900 text-white overflow-hidden relative">
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-2">Ready to scale?</h3>
          <p className="text-indigo-200 mb-6 max-w-md">Your workspace is growing. Consider inviting more team members to boost productivity.</p>
          <div className="flex gap-2">
            <div className="px-4 py-2 bg-indigo-800 rounded-lg text-sm font-semibold border border-indigo-700">Invite Members</div>
            <div className="px-4 py-2 bg-white text-indigo-900 rounded-lg text-sm font-bold">Try Enterprise</div>
          </div>
        </div>
        <div className="absolute -bottom-10 -right-10 opacity-20 rotate-12">
          <LayoutDashboard className="w-64 h-64" />
        </div>
      </Card>
    </div>
  );
};

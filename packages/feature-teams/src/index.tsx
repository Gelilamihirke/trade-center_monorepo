import React, { useState, useEffect } from 'react';
import { Button, Input, Card, Badge } from '@taskflow/ui-components';
import { storage, generateId } from '@taskflow/utils';
import { Users, UserPlus, Shield } from 'lucide-react';

export interface Team {
  id: string;
  name: string;
  memberIds: string[];
}

export const TeamManager: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [name, setName] = useState('');

  useEffect(() => {
    setTeams(storage.get<Team[]>('teams', []));
  }, []);

  const createTeam = () => {
    if (!name) return;
    const newTeam: Team = {
      id: generateId(),
      name,
      memberIds: [Math.random().toString()] // Demo member
    };
    const updated = [newTeam, ...teams];
    setTeams(updated);
    storage.set('teams', updated);
    setName('');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Teams</h2>
        <div className="flex gap-2">
          <Input value={name} onChange={e => setName(e.target.value)} placeholder="Team name..." className="w-64" />
          <Button onClick={createTeam}><UserPlus className="w-4 h-4 mr-2" /> Create</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">Build your first team to collaborate.</p>
          </div>
        ) : (
          teams.map(team => (
            <Card key={team.id} className="p-6 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4">
                <Shield className="w-5 h-5 text-indigo-100" />
               </div>
               <div className="flex items-center gap-4 mb-6">
                 <div className="h-12 w-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-bold text-xl">
                   {team.name.charAt(0).toUpperCase()}
                 </div>
                 <div>
                   <h4 className="font-bold text-gray-900">{team.name}</h4>
                   <p className="text-sm text-gray-500">{team.memberIds.length} Members</p>
                 </div>
               </div>
               <div className="flex -space-x-2">
                 {[1,2,3].map(i => (
                   <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-[10px] font-bold">
                     U{i}
                   </div>
                 ))}
                 <div className="h-8 w-8 rounded-full border-2 border-white bg-indigo-50 flex items-center justify-center text-[10px] font-bold text-indigo-600">
                   +{team.memberIds.length}
                 </div>
               </div>
               <Button variant="secondary" className="w-full mt-6" size="sm">Manage Team</Button>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

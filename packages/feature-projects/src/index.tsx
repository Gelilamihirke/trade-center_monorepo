import React, { useState, useEffect } from 'react';
import { Button, Input, Card, Badge } from '@taskflow/ui-components';
import { storage, generateId, formatDate } from '@taskflow/utils';
import { FolderPlus, Trash2, Folder } from 'lucide-react';

export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

export const ProjectManager: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setProjects(storage.get<Project[]>('projects', []));
  }, []);

  const addProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    const newProject: Project = {
      id: generateId(),
      name,
      description,
      createdAt: new Date().toISOString()
    };
    const updated = [newProject, ...projects];
    setProjects(updated);
    storage.set('projects', updated);
    setName('');
    setDescription('');
  };

  const deleteProject = (id: string) => {
    const updated = projects.filter(p => p.id !== id);
    setProjects(updated);
    storage.set('projects', updated);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="p-6 h-fit md:w-80 shrink-0">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FolderPlus className="w-5 h-5 text-indigo-600" /> New Project
          </h3>
          <form onSubmit={addProject} className="space-y-4">
            <Input value={name} onChange={e => setName(e.target.value)} placeholder="Project Name" required />
            <textarea 
              className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Description"
              rows={3}
            />
            <Button type="submit" className="w-full">Create</Button>
          </form>
        </Card>

        <div className="flex-1 space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Your Projects</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {projects.length === 0 ? (
              <div className="col-span-full py-12 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                <p className="text-gray-500">No projects yet.</p>
              </div>
            ) : (
              projects.map(project => (
                <Card key={project.id} className="p-5 hover:border-indigo-200 transition-colors group">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-50 rounded-lg">
                        <Folder className="w-5 h-5 text-indigo-600" />
                      </div>
                      <h4 className="font-bold text-gray-900">{project.name}</h4>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => deleteProject(project.id)} className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{project.description || 'No description provided.'}</p>
                  <p className="text-xs text-gray-400">Created {formatDate(project.createdAt)}</p>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

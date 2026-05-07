import React, { useState, useEffect } from 'react';
import { Button, Input, Card, Badge, Modal } from '@taskflow/ui-components';
import { storage, generateId, formatDate, getPriorityColor, getStatusColor } from '@taskflow/utils';
import { Plus, Trash2, CheckCircle2, Clock, PlayCircle } from 'lucide-react';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'done';
  createdAt: string;
  dueDate?: string;
}

export const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', priority: 'medium' as Task['priority'] });

  useEffect(() => {
    setTasks(storage.get<Task[]>('tasks', []));
  }, []);

  const saveTasks = (newTasks: Task[]) => {
    setTasks(newTasks);
    storage.set('tasks', newTasks);
  };

  const addTask = () => {
    if (!newTask.title) return;
    const task: Task = {
      id: generateId(),
      ...newTask,
      status: 'todo',
      createdAt: new Date().toISOString(),
    };
    saveTasks([task, ...tasks]);
    setNewTask({ title: '', description: '', priority: 'medium' });
    setIsAddModalOpen(false);
  };

  const updateStatus = (id: string, status: Task['status']) => {
    saveTasks(tasks.map(t => t.id === id ? { ...t, status } : t));
  };

  const deleteTask = (id: string) => {
    saveTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Tasks</h2>
        <Button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Task
        </Button>
      </div>

      <div className="grid gap-4">
        {tasks.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
            <p className="text-gray-500">No tasks yet. Start by adding one!</p>
          </div>
        ) : (
          tasks.map(task => (
            <Card key={task.id} className="p-4 flex items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900">{task.title}</h3>
                  <Badge color={getPriorityColor(task.priority)}>{task.priority}</Badge>
                  <Badge color={getStatusColor(task.status)}>{task.status}</Badge>
                </div>
                <p className="text-sm text-gray-600 line-clamp-1">{task.description}</p>
                <p className="text-xs text-gray-400 mt-2">Created {formatDate(task.createdAt)}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <select 
                  value={task.status} 
                  onChange={(e) => updateStatus(task.id, e.target.value as any)}
                  className="text-sm border-gray-200 rounded-lg focus:ring-indigo-500"
                >
                  <option value="todo">Todo</option>
                  <option value="in-progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
                <Button variant="ghost" size="sm" onClick={() => deleteTask(task.id)} className="text-red-500 hover:text-red-600">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="New Task">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <Input value={newTask.title} onChange={e => setNewTask({...newTask, title: e.target.value})} placeholder="What needs to be done?" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea 
              className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={newTask.description}
              onChange={e => setNewTask({...newTask, description: e.target.value})}
              rows={3}
              placeholder="Add some details..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select 
              value={newTask.priority}
              onChange={e => setNewTask({...newTask, priority: e.target.value as any})}
              className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <Button onClick={addTask} className="w-full">Create Task</Button>
        </div>
      </Modal>
    </div>
  );
};

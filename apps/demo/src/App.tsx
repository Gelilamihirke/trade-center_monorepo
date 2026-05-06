import React, { useState } from 'react';
import { AuthProvider, useAuth, LoginForm, RegisterForm } from '@taskflow/feature-auth';
import { TaskList } from '@taskflow/feature-tasks';
import { ProjectManager } from '@taskflow/feature-projects';
import { TeamManager } from '@taskflow/feature-teams';
import { CalendarView } from '@taskflow/feature-calendar';
import { NotificationCenter } from '@taskflow/feature-notifications';
import { StatisticsDashboard } from '@taskflow/feature-reports';
import { SettingsPanel } from '@taskflow/feature-settings';
import { AttachmentUploader } from '@taskflow/feature-attachments';
import { CommentSection } from '@taskflow/feature-comments';
import { Button, Card, Badge } from '@taskflow/ui-components';
import { 
  BarChart3, 
  CheckSquare, 
  FolderKanban, 
  Users, 
  Calendar, 
  Bell, 
  Settings, 
  LogOut,
  Layout,
  Paperclip,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('tasks');
  const [showAuthMode, setShowAuthMode] = useState<'login' | 'register'>('login');

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa] p-4">
        <AnimatePresence mode="wait">
          {showAuthMode === 'login' ? (
            <motion.div 
              key="login"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full flex justify-center"
            >
              <LoginForm onToggle={() => setShowAuthMode('register')} />
            </motion.div>
          ) : (
            <motion.div 
              key="register"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full flex justify-center"
            >
              <RegisterForm onToggle={() => setShowAuthMode('login')} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'tasks', label: 'Tasks', icon: <CheckSquare className="w-5 h-5" /> },
    { id: 'projects', label: 'Projects', icon: <FolderKanban className="w-5 h-5" /> },
    { id: 'teams', label: 'Teams', icon: <Users className="w-5 h-5" /> },
    { id: 'calendar', label: 'Calendar', icon: <Calendar className="w-5 h-5" /> },
    { id: 'notifications', label: 'Alerts', icon: <Bell className="w-5 h-5" /> },
    { id: 'attachments', label: 'Files', icon: <Paperclip className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-100 flex items-center gap-2">
          <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Layout className="w-5 h-5 text-white" />
          </div>
          <h1 className="font-black text-xl tracking-tight text-gray-900">TaskFlow</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold text-sm ${
                activeTab === tab.id 
                ? 'bg-indigo-50 text-indigo-700 shadow-sm' 
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 px-4 py-3 mb-2">
            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-600">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
          <Button variant="ghost" className="w-full flex items-center justify-center gap-2 text-gray-400 hover:text-red-500" onClick={logout}>
            <LogOut className="w-4 h-4" /> Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between sticky top-0 z-40">
           <h3 className="font-bold text-gray-400 uppercase tracking-widest text-xs">
             Current View: <span className="text-gray-900 ml-1">{tabs.find(t => t.id === activeTab)?.label}</span>
           </h3>
           <div className="flex items-center gap-4">
              <Badge color="green">v1.2.0 Stable</Badge>
              <div className="h-4 w-px bg-gray-200" />
              <button className="relative p-2 text-gray-400 hover:text-gray-600">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full ring-2 ring-white" />
              </button>
           </div>
        </header>

        <section className="p-8 max-w-6xl w-full mx-auto">
          <div className="mb-8 p-8 bg-white rounded-2xl border border-gray-100 flex items-center justify-between shadow-sm overflow-hidden relative group">
            <div className="relative z-10">
              <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Welcome back, {user.name}! 👋</h1>
              <p className="text-gray-500 font-medium max-w-lg">You have <span className="text-indigo-600 font-bold underline">12 pending tasks</span> and 2 project deadlines approaching this week.</p>
            </div>
            <div className="hidden lg:block relative z-10">
              <Button size="lg" onClick={() => setActiveTab('tasks')}>View Schedule</Button>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'dashboard' && <StatisticsDashboard />}
              {activeTab === 'tasks' && (
                <div className="space-y-8">
                  <TaskList />
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card className="p-6">
                      <h4 className="font-bold flex items-center gap-2 mb-4"><MessageSquare className="w-4 h-4" /> Global Discussion</h4>
                      <CommentSection taskId="global" />
                    </Card>
                    <Card className="p-6">
                       <h4 className="font-bold flex items-center gap-2 mb-4"><Paperclip className="w-4 h-4" /> Shared Attachments</h4>
                       <AttachmentUploader />
                    </Card>
                  </div>
                </div>
              )}
              {activeTab === 'projects' && <ProjectManager />}
              {activeTab === 'teams' && <TeamManager />}
              {activeTab === 'calendar' && <CalendarView />}
              {activeTab === 'notifications' && <NotificationCenter />}
              {activeTab === 'attachments' && (
                <Card className="p-8">
                  <h2 className="text-2xl font-bold mb-6">File Explorer</h2>
                  <AttachmentUploader />
                </Card>
              )}
              {activeTab === 'settings' && <SettingsPanel />}
            </motion.div>
          </AnimatePresence>
        </section>
      </main>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <Dashboard />
    </AuthProvider>
  );
}

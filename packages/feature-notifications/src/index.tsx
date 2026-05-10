import React, { useState, useEffect } from 'react';
import { Card, Badge, Button } from '@taskflow/ui-components';
import { storage, generateId } from '@taskflow/utils';
import { Bell, BellRing, Check, Info, AlertTriangle, XCircle } from 'lucide-react';

export interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'error';
  read: boolean;
  timestamp: string;
}

export const NotificationCenter: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    setNotifications(storage.get<Notification[]>('notifications', []));
  }, []);

  const markAsRead = (id: string) => {
    const updated = notifications.map(n => n.id === id ? { ...n, read: true } : n);
    setNotifications(updated);
    storage.set('notifications', updated);
  };

  const addDemoNotification = (type: Notification['type']) => {
    const fresh: Notification = {
      id: generateId(),
      message: `New ${type} alert: System update completed successfully.`,
      type,
      read: false,
      timestamp: new Date().toISOString()
    };
    const updated = [fresh, ...notifications];
    setNotifications(updated);
    storage.set('notifications', updated);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
             <Bell className="w-8 h-8 text-gray-400" />
             {unreadCount > 0 && (
               <span className="absolute -top-1 -right-1 h-5 w-5 bg-indigo-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                 {unreadCount}
               </span>
             )}
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="secondary" onClick={() => addDemoNotification('info')}>Info</Button>
          <Button size="sm" variant="secondary" onClick={() => addDemoNotification('success')}>Success</Button>
          <Button size="sm" variant="secondary" onClick={() => addDemoNotification('error')}>Error</Button>
        </div>
      </div>

      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
             <BellRing className="w-12 h-12 text-gray-300 mx-auto mb-4" />
             <p className="text-gray-500 font-medium">All caught up! No notifications.</p>
          </div>
        ) : (
          notifications.map(n => {
            const icons = {
              info: <Info className="w-5 h-5 text-blue-600" />,
              success: <Check className="w-5 h-5 text-green-600" />,
              error: <AlertTriangle className="w-5 h-5 text-red-600" />,
            };
            const bgs = {
              info: 'bg-blue-50 border-blue-100',
              success: 'bg-green-50 border-green-100',
              error: 'bg-red-50 border-red-100',
            };
            return (
              <Card key={n.id} className={`p-4 transition-all ${bgs[n.type]} ${n.read ? 'opacity-60 saturate-50' : 'border-l-4 border-l-indigo-600'}`}>
                <div className="flex items-start gap-4">
                  <div className="mt-0.5">{icons[n.type]}</div>
                  <div className="flex-1">
                    <p className={`text-sm ${n.read ? 'text-gray-500' : 'text-gray-900 font-medium'}`}>{n.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{new Date(n.timestamp).toLocaleTimeString()}</p>
                  </div>
                  {!n.read && (
                    <Button variant="ghost" size="sm" onClick={() => markAsRead(n.id)} className="text-gray-400 hover:text-indigo-600">
                      <Check className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

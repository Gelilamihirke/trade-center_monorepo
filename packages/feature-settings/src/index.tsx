import React, { useState, useEffect } from 'react';
import { Card, Button } from '@taskflow/ui-components';
import { storage } from '@taskflow/utils';
import { Settings, Moon, Sun, Bell, Shield, UserCircle } from 'lucide-react';

export const SettingsPanel: React.FC = () => {
  const [settings, setSettings] = useState({ theme: 'light', notifications: true });

  useEffect(() => {
    setSettings(storage.get('app_settings', { theme: 'light', notifications: true }));
  }, []);

  const save = (newSettings: typeof settings) => {
    setSettings(newSettings);
    storage.set('app_settings', newSettings);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex items-center gap-3">
        <Settings className="w-8 h-8 text-gray-400" />
        <h2 className="text-2xl font-bold text-gray-900">User Settings</h2>
      </div>

      <div className="grid gap-6">
        <Card className="p-8">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <UserCircle className="w-5 h-5 text-indigo-600" /> Appearance
          </h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900">Interface Theme</p>
              <p className="text-sm text-gray-500">Choose between light and dark modes.</p>
            </div>
            <select 
              value={settings.theme} 
              onChange={e => save({...settings, theme: e.target.value})}
              className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="light">☀️ Light</option>
              <option value="dark">🌙 Dark</option>
            </select>
          </div>
        </Card>

        <Card className="p-8">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Bell className="w-5 h-5 text-indigo-600" /> Subscriptions
          </h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900">Email Notifications</p>
              <p className="text-sm text-gray-500">Toggle whether to receive system alerts.</p>
            </div>
            <div className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={settings.notifications} 
                onChange={e => save({...settings, notifications: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </div>
          </div>
        </Card>

        <Card className="p-8 bg-gray-50 border-gray-100 italic">
          <p className="text-sm text-gray-500 text-center">More settings are being added soon. Stay tuned!</p>
        </Card>
      </div>
    </div>
  );
};

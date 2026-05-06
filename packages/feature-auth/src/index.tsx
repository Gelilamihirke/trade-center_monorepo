import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '@taskflow/utils';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, name: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = storage.get<User | null>('active_user', null);
    if (savedUser) setUser(savedUser);
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Demo: any email works with password "password"
    if (password === 'password') {
      const users = storage.get<any[]>('users', []);
      const existingUser = users.find(u => u.email === email);
      
      const loggedUser = existingUser || { id: Math.random().toString(), email, name: email.split('@')[0] };
      setUser(loggedUser);
      storage.set('active_user', loggedUser);
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const register = async (email: string, name: string, password: string) => {
    const users = storage.get<any[]>('users', []);
    if (users.find(u => u.email === email)) throw new Error('User already exists');
    
    const newUser = { id: Math.random().toString(), email, name };
    users.push({ ...newUser, password });
    storage.set('users', users);
    
    setUser(newUser);
    storage.set('active_user', newUser);
  };

  const logout = () => {
    setUser(null);
    storage.remove('active_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

// Components
import { Button, Input, Card, Badge } from '@taskflow/ui-components';

export const LoginForm: React.FC<{ onToggle: () => void }> = ({ onToggle }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Card className="p-8 max-w-md w-full mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Sign In</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <Input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="demo@example.com" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <Input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="password" />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button type="submit" className="w-full">Sign In</Button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        Don't have an account? <button onClick={onToggle} className="text-indigo-600 font-medium">Register</button>
      </p>
      <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
        <p className="text-xs text-indigo-700 font-semibold uppercase tracking-wider mb-1">Demo Access</p>
        <p className="text-xs text-indigo-600">Password is always <Badge color="indigo">password</Badge></p>
      </div>
    </Card>
  );
};

export const RegisterForm: React.FC<{ onToggle: () => void }> = ({ onToggle }) => {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(email, name, password);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Card className="p-8 max-w-md w-full mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Create Account</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <Input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="John Doe" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <Input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="john@example.com" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <Input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Create a password" />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button type="submit" className="w-full">Register</Button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account? <button onClick={onToggle} className="text-indigo-600 font-medium">Sign In</button>
      </p>
    </Card>
  );
};

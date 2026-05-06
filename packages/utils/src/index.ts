/**
 * Date formatting functions
 */
export const formatDate = (date: Date | string | number) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
};

export const formatDateTime = (date: Date | string | number) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(new Date(date));
};

/**
 * Priority and status helper functions
 */
export const getPriorityColor = (priority: 'low' | 'medium' | 'high'): 'green' | 'yellow' | 'red' => {
  const colors = {
    low: 'green' as const,
    medium: 'yellow' as const,
    high: 'red' as const,
  };
  return colors[priority];
};

export const getStatusColor = (status: 'todo' | 'in-progress' | 'done'): 'gray' | 'blue' | 'green' => {
  const colors = {
    todo: 'gray' as const,
    'in-progress': 'blue' as const,
    done: 'green' as const,
  };
  return colors[status];
};

/**
 * LocalStorage wrapper utilities
 */
export const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      return defaultValue;
    }
  },
  set: (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  remove: (key: string) => {
    localStorage.removeItem(key);
  },
};

/**
 * Unique ID generator
 */
export const generateId = () => Math.random().toString(36).substring(2, 9);

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Task filtering utility
 */
export const filterTasks = (
  tasks: any[],
  filters: { priority?: string; status?: string }
) => {
  return tasks.filter((task) => {
    if (filters.priority && task.priority !== filters.priority) return false;
    if (filters.status && task.status !== filters.status) return false;
    return true;
  });
};

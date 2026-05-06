import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@taskflow/ui-components': path.resolve(__dirname, '../../packages/ui-components/src/index.tsx'),
      '@taskflow/utils': path.resolve(__dirname, '../../packages/utils/src/index.ts'),
      '@taskflow/feature-auth': path.resolve(__dirname, '../../packages/feature-auth/src/index.tsx'),
      '@taskflow/feature-tasks': path.resolve(__dirname, '../../packages/feature-tasks/src/index.tsx'),
      '@taskflow/feature-projects': path.resolve(__dirname, '../../packages/feature-projects/src/index.tsx'),
      '@taskflow/feature-teams': path.resolve(__dirname, '../../packages/feature-teams/src/index.tsx'),
      '@taskflow/feature-calendar': path.resolve(__dirname, '../../packages/feature-calendar/src/index.tsx'),
      '@taskflow/feature-notifications': path.resolve(__dirname, '../../packages/feature-notifications/src/index.tsx'),
      '@taskflow/feature-comments': path.resolve(__dirname, '../../packages/feature-comments/src/index.tsx'),
      '@taskflow/feature-attachments': path.resolve(__dirname, '../../packages/feature-attachments/src/index.tsx'),
      '@taskflow/feature-reports': path.resolve(__dirname, '../../packages/feature-reports/src/index.tsx'),
      '@taskflow/feature-settings': path.resolve(__dirname, '../../packages/feature-settings/src/index.tsx'),
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
    hmr: process.env.DISABLE_HMR !== 'true',
  },
});

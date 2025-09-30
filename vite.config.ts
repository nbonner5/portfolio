import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'nexus',
      remotes: {
        nexus: 'http://localhost:5001/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom']
    }),
  ],
})

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    fs: { allow: ['..'] }, // tokens live in ../tokens/v2
    allowedHosts: ['.local'], // the Mac's fixed name (xxx.local) for phone testing — see tools/landing-server.command
  },
});

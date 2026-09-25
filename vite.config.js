import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Relative asset paths so the build works on GitHub Pages (served from /<repo-name>/).
  base: './',
  // The project folder name contains "#", which Vite cannot serve.
  // start.cmd runs Vite through a mapped drive; preserveSymlinks keeps Vite
  // from resolving files back to the real "#" path.
  resolve: { preserveSymlinks: true },
});

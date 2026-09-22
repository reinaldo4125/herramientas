import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';

// Dynamically discover all HTML files in the root directory
const htmlFiles = fs.readdirSync(__dirname)
  .filter(file => file.endsWith('.html'));

const input = {};
htmlFiles.forEach(file => {
  const name = file.replace(/\.html$/, '');
  input[name] = resolve(__dirname, file);
});

export default defineConfig({
  server: {
    port: 3000,
    host: true
  },
  build: {
    rollupOptions: {
      input
    }
  }
});

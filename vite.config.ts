import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import swc from 'rollup-plugin-swc3';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: [{ find: '@/', replacement: resolve(__dirname, 'src') }],
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ds',
      formats: ['cjs', 'es'],
      fileName: (format) => (format === 'es' ? 'index.mjs' : 'index.cjs'),
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
      plugins: [
        swc({
          jsc: {
            parser: {
              syntax: 'typescript',
              tsx: true,
            },
            target: 'esnext',
          },
        }),
      ],
    },
  },
  plugins: [react()],
});

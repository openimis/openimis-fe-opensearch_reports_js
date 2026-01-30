import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import json from '@rollup/plugin-json';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.jsx'),
      name: 'OpenimisFeOpensearchReports',
      fileName: (format) => `index.${format === 'es' ? 'es' : 'cjs'}.js`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: [
        /^@babel.*/,
        /^@date-io\/.*/,
       
        /^@openimis.*/,
        'classnames',
        'clsx',
        'history',
        /^lodash.*/,
        'moment',
        'prop-types',
        /^react.*/,
        /^redux.*/
      ],
    //   plugins: [json()]
    },
    sourcemap: true,
    outDir: 'dist',
    emptyOutDir: true,
  },
  plugins: [react({
    jsxRuntime: 'automatic',
    jsxImportSource: '@emotion/react',
  })],
});

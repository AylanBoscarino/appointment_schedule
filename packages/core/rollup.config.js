import ts from '@wessberg/rollup-plugin-ts';

export default {
  input: 'src/index.ts',
  plugins: [ts()],
  output: {
    file: 'dist/index.js',
    format: 'cjs',
  },
};

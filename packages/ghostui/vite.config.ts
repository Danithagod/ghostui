import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [
        react(),
        dts({
            insertTypesEntry: true,
            rollupTypes: true,
        }),
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'GhostUI',
            formats: ['es', 'umd'],
            fileName: (format) => `ghostui.${format === 'es' ? 'mjs' : 'js'}`,
        },
        rollupOptions: {
            external: ['react', 'react-dom', 'react/jsx-runtime', 'framer-motion'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    'react/jsx-runtime': 'react/jsx-runtime',
                    'framer-motion': 'FramerMotion',
                },
            },
        },
        cssCodeSplit: false,
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        },
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/test/setup.ts',
        css: true,
    },
});

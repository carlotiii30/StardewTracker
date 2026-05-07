import { defineConfig } from 'vitest/config'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./src/test/setup.ts'],
        alias: {
            '@app': fileURLToPath(new URL('./src/app', import.meta.url)),
            '@features': fileURLToPath(new URL('./src/features', import.meta.url)),
            '@shared': fileURLToPath(new URL('./src/shared', import.meta.url)),
            '@ui': fileURLToPath(new URL('./src/ui', import.meta.url)),
        },
    },
})

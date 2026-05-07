import { defineConfig, type PluginOption } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { fileURLToPath, URL } from 'node:url'

const cloudflarePluginModule = '@cloudflare/vite-plugin'

async function loadCloudflarePlugin(): Promise<PluginOption | undefined> {
  try {
    const cloudflareModule = await import(cloudflarePluginModule)
    return cloudflareModule.cloudflare?.()
  } catch {
    console.warn(
      'Cloudflare Vite plugin is not installed. Continuing without cloudflare() integration.',
    )
    return undefined
  }
}

// https://vitejs.dev/config/
export default defineConfig(async () => {
  const cloudflarePlugin = await loadCloudflarePlugin()

  return {
    resolve: {
      alias: {
        '@app': fileURLToPath(new URL('./src/app', import.meta.url)),
        '@features': fileURLToPath(new URL('./src/features', import.meta.url)),
        '@shared': fileURLToPath(new URL('./src/shared', import.meta.url)),
        '@ui': fileURLToPath(new URL('./src/ui', import.meta.url)),
      },
    },
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        devOptions: {
          enabled: true
        },
        manifest: {
          name: 'Stardew Companion',
          short_name: 'SDV Tracker',
          description: 'Tu guía de bolsillo interactiva para Stardew Valley',
          theme_color: '#5d2e08',
          background_color: '#ffcea6',
          display: 'standalone',
          icons: [
            {
              src: '/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: '/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        }
      }),
      ...(cloudflarePlugin ? [cloudflarePlugin] : []),
    ],
  }
})

import { ManifestV3Export, crx } from '@crxjs/vite-plugin';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import manifest from './manifest.json';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), crx({ manifest: manifest as ManifestV3Export })],
});

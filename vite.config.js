import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    root: 'src',
    plugins: [
        react({
            // Use React plugin in all *.jsx and *.tsx files
            include: '**/*.{jsx,tsx}',
        })],
    build: {
        // Relative to the root
        outDir: '../build',
    },
})
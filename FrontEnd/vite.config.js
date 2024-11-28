import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // Use jsdom for DOM simulation
    reporters: ['default', 'json'],
    outputFile: './test-results/results.json',
  },
})

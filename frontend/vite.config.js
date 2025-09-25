import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
// server: {
//     host: true, // 👈 makes Vite listen on all network interfaces
//     port: 5173,
//     // strictPort: true
//   }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],  
  routes: [
    { path: '/', component: Home },
    { path: '/comunidade', component: Contacts },
  ],
})

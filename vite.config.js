import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Home from './src/pages/Home'
import Contacts from './src/pages/Contacts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],  
  routes: [
    { path: '*', component: Home },
    { path: '/', component: Home },
    { path: '/comunidade', component: Contacts },
  ],
})

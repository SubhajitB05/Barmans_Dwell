import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // server:{
  //   proxy:{
  //     '/user':{
  //       target:'http://localhost:7000',
  //       changeOrigin:true,
  //     }
  //   }
  // },
  plugins: [react()],
})

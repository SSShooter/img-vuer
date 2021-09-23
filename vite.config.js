const path = require('path')
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  console.log(command, mode)
  if (command !== 'lib') {
    return{
      plugins: [vue()],
    }
  } else {
    return {
      plugins: [vue()],
      build:{
        lib: {
          entry: path.resolve(__dirname, 'src/gallery.js'),
          name: 'ImgVuer',
          fileName: (format) => `img-vuer.${format}.js`,
        },
      },
    }
  }
})

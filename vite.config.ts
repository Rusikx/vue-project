import { fileURLToPath, URL } from "node:url"

import { defineConfig, loadEnv  } from "vite"
import vue from "@vitejs/plugin-vue"


// https://vitejs.dev/config/
// @ts-ignore
export default ({ mode }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  return defineConfig({
    plugins: [
      vue(),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url))
      }
    },
    server: {
      port: parseInt(process.env.VITE_FRONT_PORT || "8081")
    }
  })
}
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import devServer from "@hono/vite-dev-server";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    devServer({
      entry: "server/app.ts", // The file path of your application.
      exclude: [/^(?!\/api).*$/],
    }),
  ],
});

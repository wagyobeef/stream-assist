import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import fs from "fs";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Stream Assist",
        short_name: "StreamAssist",
        start_url: "/",
        display: "standalone",
        background_color: "#000000",
        theme_color: "#ffffff",
        icons: [], // No custom icons provided
      },
    }),
  ],
  server: {
    https: {
      key: fs.readFileSync("./cert/key.pem"),
      cert: fs.readFileSync("./cert/cert.pem"),
    },
  },
});

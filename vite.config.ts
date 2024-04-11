import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import crossOriginIsolation from "vite-plugin-cross-origin-isolation";

export default defineConfig({
  plugins: [react(), crossOriginIsolation()],
});

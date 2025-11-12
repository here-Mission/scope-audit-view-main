import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Remove all references to LOVABLE or any branding plugin!
export default defineConfig({
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});


import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // resolve: {
  //   alias: {
  //     "@components": path.resolve(__dirname, "src/components"),
  //     "@hooks": path.resolve(__dirname, "src/hooks"),
  //     "@utils": path.resolve(__dirname, "src/utils"),
  //     "@assets": path.resolve(__dirname, "src/assets"),
  //     "@store": path.resolve(__dirname, "src/store"),
  //     "@services": path.resolve(__dirname, "src/services"),
  //     "@layouts": path.resolve(__dirname, "src/layouts"),
  //     "@pages": path.resolve(__dirname, "src/pages"),
  //     "@routes": path.resolve(__dirname, "src/routes"),
  //     // "@styles": path.resolve(__dirname, "src/styles"),
  //   },
  // },
});

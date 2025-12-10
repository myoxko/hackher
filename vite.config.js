import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/hackher/", // ★ 깃허브 페이지의 repo 이름
});

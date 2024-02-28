import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
    return {
        server: {
            proxy: {
                "/api": "http://localhost:5001",
            },
        },
        plugins: [react()],
    };
});

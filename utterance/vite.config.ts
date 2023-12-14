import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");
    return {
        plugins: [react()],
        define: {
            "process.env": {
                VITE_DEFAULT_API_KEY: env.REACT_APP_API_KEY,
                VITE_DEFAULT_AUTH_DOMAIN: env.REACT_APP_AUTH_DOMAIN,
                VITE_DEFAULT_PROJECT_ID: env.REACT_APP_PROJECT_ID,
                VITE_DEFAULT_STORAGE_BUCKET: env.REACT_APP_STORAGE_BUCKET,
                VITE_DEFAULT_MESSAGING_SENDER_ID:
                    env.REACT_APP_MESSAGING_SENDER_ID,
                VITE_DEFAULT_APP_ID: env.REACT_APP_APP_ID,
            },
        },
    };
});

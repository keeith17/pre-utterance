import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");
    return {
        plugins: [react()],
        resolve: {
            alias: [
                {
                    find: "@",
                    replacement: path.resolve(__dirname, "src"),
                },
            ],
        },
        define: {
            "process.env": {
                REACT_APP_API_KEY: env.REACT_APP_API_KEY,
                REACT_APP_AUTH_DOMAIN: env.REACT_APP_AUTH_DOMAIN,
                REACT_APP_PROJECT_ID: env.REACT_APP_PROJECT_ID,
                REACT_APP_STORAGE_BUCKET: env.REACT_APP_STORAGE_BUCKET,
                REACT_APP_MESSAGING_SENDER_ID:
                    env.REACT_APP_MESSAGING_SENDER_ID,
                REACT_APP_APP_ID: env.REACT_APP_APP_ID,
            },
        },
    };
});

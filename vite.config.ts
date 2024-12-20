import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import vueI18n from "@intlify/vite-plugin-vue-i18n";
import laravel from "laravel-vite-plugin";

export default defineConfig({
    base: '/../../../../build/',
    plugins: [
        laravel({
            input: ["resources/js/src/main.ts"],
            refresh: true,
            hotFile: '../../../public_html/themes/vristo/assets/hot/vite.hot', // Customize the "hot" file...
            buildDirectory: '../../../../public_html/build', // Customize the build directory...
        }),
        vue({
            template: {
                transformAssetUrls: {
                    includeAbsolute: false,
                },
            },
        }),
        vueI18n({
            include: path.resolve("resources/js/src/locales/**"),
        }),
    ],
    resolve: {
        alias: {
            "@": path.resolve("./resources/js/src"),
        },
    },
    optimizeDeps: {
        include: ["quill"],
    },
});

import path from "node:path";
import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import Pages from "vite-plugin-pages";
import Layouts from "vite-plugin-vue-layouts"; // eslint-disable-line
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import Markdown from "vite-plugin-vue-markdown";
import LinkAttributes from "markdown-it-link-attributes";
import Unocss from "unocss/vite";
import Shiki from "markdown-it-shiki";
import VueMacros from "unplugin-vue-macros/vite";
import WebfontDownload from "vite-plugin-webfont-dl";
import vueJsx from "@vitejs/plugin-vue-jsx";
import mdx from "vite-plugin-vue3-mdx";

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "~/styles/variables.scss";`,
      },
    },
  },
  build: {
    outDir: "../static",
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "~/": `${path.resolve(__dirname, "src")}/`,
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://lr.aiofauna.com/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
    watch: {
      usePolling: true,
      ignored: "/node_modules/",
    },
  },

  plugins: [
     Pages({
      extensions: ["vue", "md", "mdx", "ts", "tsx"],
    }),
     Layouts(),
     AutoImport({
       include: [
         /\.[tj]sx?$/,
         /\.vue$/,
         /\.vue\?vue/,
         /\.md$/
       ],
      imports: [
        "vue", 
        "vue-router", 
        "@vueuse/head", 
        "@vueuse/core"
      ],
      dts: "src/auto-imports.d.ts",
      dirs: [
        "src/composables",
        "src/stores",
        "src/types",
        "src/lib",
        "src/firebase",
      ],
      vueTemplate: true,
    }),
    VueMacros({
      plugins: {
        vue: Vue({
          include: [/\.vue$/, /\.md$/],
        }),
      },
    }),
    vueJsx({
      include: [/\.[jt]sx$/, /\.mdx?$/],
    }),
    mdx(),
    Components({
       extensions: ["vue", "md",",mdx","tsx"],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/, /\.mdx?$/, /\.tsx?$/],
      dts: "src/components.d.ts",
    }),
  
    Unocss(),
    Markdown({
      wrapperClasses: "prose prose-sm m-auto text-left",
      headEnabled: true,
      markdownItSetup(md) {
        md.use(Shiki, {
          theme: {
            light: "vitesse-light",
            dark: "vitesse-dark",
          },
        });
        md.use(LinkAttributes, {
          matcher: (link: string) => /^https?:\/\//.test(link),
          attrs: {
            target: "_blank",
            rel: "noopener",
          },
        });
      },
    }),
   WebfontDownload()]});
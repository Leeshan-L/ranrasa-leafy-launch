// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  // Outside Lovable's sandbox the preset skips nitro unless it's enabled here.
  // These are the same settings Lovable applies in its sandbox, so the build is
  // identical everywhere: a Cloudflare Worker in dist/ plus a generated
  // dist/server/wrangler.json that `npx wrangler deploy` picks up automatically.
  nitro: {
    preset: "cloudflare-module",
    output: { dir: "dist", serverDir: "dist/server", publicDir: "dist/client" },
    // Worker name and compatibility date come from wrangler.jsonc.
    cloudflare: { nodeCompat: true, deployConfig: true },
  },
});

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig, passthroughImageService } from "astro/config";
import { BASE_URL } from "./src/consts.ts";
import { DEFAULT_LOCALE_SETTING, LOCALES_SETTING } from "./src/i18n/locales";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
	output: "static",
	site: "http://okami-web-iqjh4d-1e52ec-88-11-130-61.traefik.me",
	vite: {
		plugins: [tailwindcss()],
	},
	image: {
		service: passthroughImageService(),
	},
	i18n: {
		defaultLocale: DEFAULT_LOCALE_SETTING,
		locales: Object.keys(LOCALES_SETTING),
		routing: {
			prefixDefaultLocale: true,
			redirectToDefaultLocale: false,
		},
	},
	integrations: [
		mdx(),
		sitemap({
			filter: (page) => page !== `${BASE_URL}/admin/`,
			i18n: {
				defaultLocale: DEFAULT_LOCALE_SETTING,
				locales: Object.fromEntries(
					Object.entries(LOCALES_SETTING).map(([key, value]) => [
						key,
						value.lang ?? key,
					]),
				),
			},
		}),
	],
});

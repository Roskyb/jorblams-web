// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

import type { Multilingual } from "@/i18n";

export const BRAND_NAME: string | Multilingual = "Jorblams";
export const SITE_TITLE: string | Multilingual = "jorblams";

export const SITE_DESCRIPTION: string | Multilingual = {
	en: "Full-stack developer passionate about creating modern web applications with TypeScript, Angular, and NestJS.",
	es: "Desarrollador full-stack apasionado por crear aplicaciones web modernas con TypeScript, Angular y NestJS.",
};

export const X_ACCOUNT: string | Multilingual = "@yacosta738";

export const NOT_TRANSLATED_CAUTION: string | Multilingual = {
	en: "This page is not available in your language.",
	es: "Esta página no está disponible en tu idioma.",
};

// Base URLs
const BASE_URL_LOCAL = "http://localhost:4321";
const BASE_URL_PROD =
	import.meta.env.PUBLIC_SITE_URL || "https://astro-cms.pages.dev";
export const BASE_URL = import.meta.env.DEV ? BASE_URL_LOCAL : BASE_URL_PROD;

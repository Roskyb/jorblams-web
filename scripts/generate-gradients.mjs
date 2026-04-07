/**
 * Generates unique mesh-gradient cover images for blog posts.
 * Each gradient is deterministic based on the post slug.
 *
 * Usage: node scripts/generate-gradients.mjs
 * Regenerate: node scripts/generate-gradients.mjs --force
 */

import { readdir, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const BLOG_DIR = "src/data/blog/es";
const OUTPUT_DIR = "src/assets/images/covers";
const WIDTH = 1200;
const HEIGHT = 800;
const FORCE = process.argv.includes("--force");

// Hash a string to a number
function hash(str) {
	let h = 0;
	for (let i = 0; i < str.length; i++) {
		h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
	}
	return Math.abs(h);
}

// Curated color palettes — vibrant, high contrast, dark-theme friendly
const PALETTES = [
	// Warm sunset — Orange + Magenta + Deep blue
	["#f97316", "#db2777", "#1e3a8a", "#f59e0b"],
	// Midnight — Indigo + Pink + Emerald
	["#312e81", "#ec4899", "#10b981", "#6366f1"],
	// Teal + Deep Purple + Gold
	["#14b8a6", "#4f46e5", "#fbbf24", "#0f172a"],
	// Rose + Deep Blue + Mint
	["#f43f5e", "#1e3a8a", "#34d399", "#fbbf24"],
	// Violet + Coral + Dark Teal
	["#8b5cf6", "#ff6b6b", "#0d9488", "#1e1b4b"],
	// Electric Blue + Orange + Dark Cyan
	["#3b82f6", "#f97316", "#1e293b", "#06b6d4"],
	// Fuchsia + Cyan + Dark Indigo
	["#d946ef", "#22d3ee", "#0f172a", "#f472b6"],
	// Deep Red + Purple + Amber
	["#dc2626", "#7c3aed", "#fbbf24", "#1c1917"],
	// Ocean — Navy + Teal + Rose
	["#1e3a8a", "#14b8a6", "#f43f5e", "#0ea5e9"],
	// Pink + Blue + Purple (like original)
	["#e84393", "#0984e3", "#a855f7", "#2d3436"],
];

function generateSVG(slug) {
	const h = hash(slug);
	const palette = PALETTES[h % PALETTES.length];
	const angle = 20 + (hash(slug + "angle") % 50);

	// 6 large overlapping ellipses covering the full canvas
	const count = 6;
	const shapes = [];
	for (let i = 0; i < count; i++) {
		const color = palette[i % palette.length];
		const seed = hash(slug + `s${i}`);
		// Spread positions across the full canvas
		const cx = -10 + (hash(slug + `cx${i}`) % 120); // -10 to 110%
		const cy = -10 + (hash(slug + `cy${i}`) % 120);
		const rx = 50 + (seed % 40); // 50-90%
		const ry = 40 + (hash(slug + `ry${i}`) % 35); // 40-75%
		const rotation = angle + (hash(slug + `rot${i}`) % 60) - 30;
		const opacity = 0.5 + (hash(slug + `op${i}`) % 40) / 100; // 0.5-0.9

		shapes.push({ color, cx, cy, rx, ry, rotation, opacity });
	}

	return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="75" />
    </filter>
  </defs>
  <rect width="100%" height="100%" fill="${palette[0]}" />
  ${shapes
		.map(
			(s) =>
				`<ellipse cx="${s.cx}%" cy="${s.cy}%" rx="${s.rx}%" ry="${s.ry}%" fill="${s.color}" filter="url(#blur)" opacity="${s.opacity}" transform="rotate(${s.rotation}, ${(s.cx / 100) * WIDTH}, ${(s.cy / 100) * HEIGHT})" />`,
		)
		.join("\n  ")}
</svg>`;
}

async function main() {
	if (!existsSync(OUTPUT_DIR)) {
		await mkdir(OUTPUT_DIR, { recursive: true });
	}

	const files = (await readdir(BLOG_DIR)).filter(
		(f) => f.endsWith(".mdx") || f.endsWith(".md"),
	);

	let generated = 0;
	let skipped = 0;

	for (const file of files) {
		const slug = file.replace(/\.(mdx?|md)$/, "");
		const outputPath = join(OUTPUT_DIR, `${slug}.png`);

		if (existsSync(outputPath) && !FORCE) {
			console.log(`  skip: ${slug} (use --force to regenerate)`);
			skipped++;
			continue;
		}

		const svg = generateSVG(slug);
		await sharp(Buffer.from(svg)).png({ quality: 90 }).toFile(outputPath);
		console.log(`  created: ${outputPath}`);
		generated++;
	}

	console.log(`\nDone: ${generated} generated, ${skipped} skipped`);
}

main().catch(console.error);

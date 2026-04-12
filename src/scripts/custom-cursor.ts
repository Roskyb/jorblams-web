function initCursor() {
	if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

	const cursor: HTMLElement | null = document.querySelector(".custom-cursor");
	const triggers = document.querySelectorAll(".custom-cursor-trigger");
	let isMorphing = false;

	document.addEventListener("mousemove", (e) => {
		if (cursor && !isMorphing) {
			cursor.style.left = `${e.clientX}px`;
			cursor.style.top = `${e.clientY}px`;
		}
	});

	// Handle custom cursor triggers (buttons)
	for (const trigger of triggers) {
		trigger.addEventListener("mouseenter", () => {
			isMorphing = true;

			const rect = trigger.getBoundingClientRect();
			const centerX = rect.left + rect.width / 2;
			const centerY = rect.top + rect.height / 2;

			cursor?.classList.remove("cursor-grow");
			cursor?.classList.add("morphing");
			if (cursor) {
				cursor.style.transition =
					"width 0.2s cubic-bezier(0.4, 0, 0.2, 1), height 0.2s cubic-bezier(0.4, 0, 0.2, 1), border-radius 0.2s cubic-bezier(0.4, 0, 0.2, 1), left 0.2s cubic-bezier(0.4, 0, 0.2, 1), top 0.2s cubic-bezier(0.4, 0, 0.2, 1)";
				cursor.style.left = `${centerX}px`;
				cursor.style.top = `${centerY}px`;
				cursor.style.width = `${rect.width}px`;
				cursor.style.height = `${rect.height}px`;
				cursor.style.borderRadius = "9999px";
			}
		});

		trigger.addEventListener("mouseleave", () => {
			isMorphing = false;
			cursor?.classList.remove("morphing");
			if (cursor) {
				cursor.style.transition =
					"width 0.2s cubic-bezier(0.4, 0, 0.2, 1), height 0.2s cubic-bezier(0.4, 0, 0.2, 1), border-radius 0.2s cubic-bezier(0.4, 0, 0.2, 1)";
				cursor.style.width = "";
				cursor.style.height = "";
			}
		});
	}

	// Handle regular links (grow cursor slightly)
	const links = document.querySelectorAll("a:not(.custom-cursor-trigger)");
	for (const link of links) {
		link.addEventListener("mouseenter", () => {
			if (cursor && !isMorphing) {
				cursor.classList.add("cursor-grow");
			}
		});

		link.addEventListener("mouseleave", () => {
			if (cursor && !isMorphing) {
				cursor.classList.remove("cursor-grow");
			}
		});
	}
}

// Run on initial load and after each view transition navigation
initCursor();
document.addEventListener("astro:after-swap", initCursor);

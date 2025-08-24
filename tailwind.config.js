import animations from "./dist";

export default {
	// prefix: 'tw-',
	content: ["./docs/.vitepress/theme/*.vue"],
	safelist: [{ pattern: /animate-.*/ }],
	plugins: [animations],
};

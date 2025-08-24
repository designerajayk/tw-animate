import plugin from "tailwindcss/plugin.js";
import plugins from "./plugins.js";
import theme from "./theme.js";

export default plugin(plugins, {
	theme,
});

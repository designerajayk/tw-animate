import type {
	CSSRuleObject,
	KeyValuePair,
	PluginCreator,
} from "tailwindcss/types/config.js";
import { animationUtils, keyframeUtils } from "./utilities.js";

const prefixed = Object.fromEntries(
	Object.entries({ ...keyframeUtils, ...animationUtils }).flatMap(
		([util, block]) => {
			if (!block) return [];

			const filtered =
				util in animationUtils
					? block // skip filtering
					: Object.fromEntries(
							Object.entries(block).filter(
								([key]) => !key.startsWith("animation"),
							),
						);

			return Object.keys(filtered).length > 0
				? [[`.animate-${util}`, filtered]]
				: [];
		},
	),
) as CSSRuleObject;

const plugins: PluginCreator = ({ addUtilities, matchUtilities, theme }) => {
	addUtilities(prefixed);

	matchUtilities(
		{
			"animate-iteration": (value) => ({
				"animation-iteration-count": value,
			}),
		},
		{
			values: theme("animationIteration") as KeyValuePair,
		},
	);

	matchUtilities(
		{ "animate-duration": (value) => ({ animationDuration: value }) },
		{ values: theme("animationDuration") as KeyValuePair },
	);

	matchUtilities(
		{
			"animate-ease": (value) => ({
				animationTimingFunction: `cubic-bezier(${value})`,
			}),
		},
		{ values: theme("animationEase") as KeyValuePair },
	);

	matchUtilities(
		{
			"animate-steps-start": (value) => ({
				animationTimingFunction: `steps(${value},jump-start)`,
			}),
		},
		{ values: theme("animationRepeat") as KeyValuePair },
	);

	matchUtilities(
		{
			"animate-steps-end": (value) => ({
				animationTimingFunction: `steps(${value},jump-end)`,
			}),
		},
		{ values: theme("animationRepeat") as KeyValuePair },
	);

	matchUtilities(
		{
			"animate-steps-both": (value) => ({
				animationTimingFunction: `steps(${value},jump-both)`,
			}),
		},
		{ values: theme("animationRepeat") as KeyValuePair },
	);

	matchUtilities(
		{
			"animate-steps-none": (value) => ({
				animationTimingFunction: `steps(${value},jump-none)`,
			}),
		},
		{ values: theme("animationRepeat") as KeyValuePair },
	);

	matchUtilities(
		{ "animate-delay": (value) => ({ animationDelay: value }) },
		{ values: theme("animationDelay") as KeyValuePair },
	);

	matchUtilities(
		{ "animate-repeat": (value) => ({ animationIterationCount: value }) },
		{ values: theme("animationRepeat") as KeyValuePair },
	);

	matchUtilities(
		{ "animate-fill": (value) => ({ animationFillMode: value }) },
		{ values: theme("animationFill") as KeyValuePair },
	);

	matchUtilities(
		{ "animate-distance": (value) => ({ "--animate-distance": value }) },
		{ values: theme("animationDistance") as KeyValuePair },
	);
};

export default plugins;

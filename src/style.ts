// @ts-nocheck
import fs from "node:fs";
import path from "node:path";
import { transform } from "lightningcss";
import { delay, distance, duration, ease, fill, repeat } from "./defaults.ts";
import { keyframes } from "./keyframes.ts";
import { keyframeUtils } from "./utilities.ts";

const animations = Object.keys(keyframes)
	.map((k) =>
		[
			`--animate-${k}`,
			`${keyframeUtils[k]?.animationDuration ?? "1s"}
      ${keyframeUtils[k]?.animationTimingFunction ?? ""}
      both ${k};`.replace(/\s+/g, " "),
		].join(": "),
	)
	.join("\n");

const keyframesCss = Object.entries(keyframes)
	.map(([name, frames]) => {
		const frameStrings = Object.entries(frames)
			.map(([percent, props]) => {
				const propStrings = Object.entries(props)
					.map(([prop, value]) => {
						return `  ${prop}: ${value};`;
					})
					.join("\n");
				return `${percent} {\n${propStrings}\n}`;
			})
			.join("\n");
		return `@keyframes ${name} {\n${frameStrings}\n}`;
	})
	.join("\n\n");

type BuildOptions = {
	name: string;
	values: Record<string, string | number>;
	cssKey: string;
	buildValue?: (key: string) => string;
};
const buildUtility = ({ name, values, cssKey, buildValue }: BuildOptions) => {
	return Object.entries(values)
		.map(
			([key, value]) => `@utility ${name}-${key} {
    ${cssKey} : ${buildValue ? buildValue(value) : value};
}`,
		)
		.join("\n\n");
};

const utilities = [
	{
		name: "animate-duration",
		values: {
			...duration,
			none: "0s",
		},
		cssKey: "animation-duration",
	},
	{
		name: "animate-delay",
		values: {
			...delay,
			none: "0s",
		},
		cssKey: "animation-delay",
	},
	{
		name: "animate-repeat",
		values: repeat,
		cssKey: "animation-iteration-count",
	},
	{
		name: "animate-ease",
		values: ease,
		cssKey: "animation-timing-function",
		buildValue: (val: string) => `cubic-bezier(${val})`,
	},
	{
		name: "animate-fill",
		values: fill,
		cssKey: "animation-fill-mode",
	},
	{
		name: "animate-distance",
		values: distance,
		cssKey: "--animation-distance",
	},
];

const prefixed = [
	{
		values: ["none"],
		cssKey: "animation",
	},
	{
		values: [
			["faster", "0.5s"],
			["fast", "0.8s"],
			["slow", "2s"],
			["slower", "3s"],
		],
		cssKey: "animation-duration",
	},
	{
		values: ["normal", "reverse", "alternate", "alternate-reverse"],
		cssKey: "animation-direction",
	},
	{
		values: ["paused", "running"],
		cssKey: "animation-play-state",
	},
	{
		values: ["infinite"],
		cssKey: "animation-iteration-count",
	},
	{
		values: [["ease", "cubic-bezier(.25,.1,.25,1)"]],
		cssKey: "animation-timing-function",
	},
];

const css = `
@utility animate-duration-* {
    animation-duration: --value(integer)ms;
    animation-duration: --value([*]);
}

@utility animate-delay-* {
    animation-delay: --value(integer)ms;
    animation-delay: --value([*]);
}

@utility animate-repeat-* {
    animation-iteration-count: --value(integer, [integer]);
}

${utilities.map(buildUtility).join("\n\n")}

${prefixed
	.map(({ values, cssKey }) =>
		values
			.map(
				(val) => `@utility animate-${Array.isArray(val) ? val[0] : val} {
    ${cssKey} : ${Array.isArray(val) ? val[1] : val};
}`,
			)
			.join("\n\n"),
	)
	.join("\n\n")}

@theme {
  ${animations}

  ${keyframesCss}
}
`;
const { code } = transform({
	filename: "style.css",
	code: Buffer.from(css),
	minify: true,
});

const currentDir = path.dirname(new URL(import.meta.url).pathname);
fs.writeFileSync(
	path.join(currentDir, "../dist", "index.css"),
	code.toString(),
);

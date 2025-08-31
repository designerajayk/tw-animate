// @ts-nocheck
import fs from "node:fs";
import path from "node:path";
import { transform } from "lightningcss";
import { delay, distance, duration, ease, fill, repeat } from "./defaults.ts";
import { keyframes } from "./keyframes.ts";
import { animationUtils, keyframeUtils } from "./utilities.ts";

const kebabCase = (str: string) =>
    str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

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
                        return `  ${kebabCase(prop)}: ${value};`;
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

const prefixedCss = Object.entries(animationUtils).map(([name, utils]) =>
	`@utility animate-${name} {
    ${Object.entries(utils)
		.map(([key, value]) => `${kebabCase(key)}: ${value};`)
		.join("\n")}
}`,
).join('\n')


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

${prefixedCss}

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

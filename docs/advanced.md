---
title: Advanced
outline: [2, 3]
---

# Miscellaneous

## Editor Setup

You do not need any additional configuration. IntelliSense will automatically
detect the animations and utilities. Refer the
[official docs](https://tailwindcss.com/docs/editor-setup) on setting up your
editor.

## Customizing

Refer to the
[Tailwind CSS docs](https://tailwindcss.com/docs/animation#using-custom-values).
If present, any animation or keyframe customization should be applied properly.
Create an issue on our GitHub if something is not working.

## Accessibility

Use `motion-safe` and `motion-reduce` variants provided by Tailwind CSS.
`print:hidden` can also be used (for example, on elements having exit
animations) to hide them while printing.

Refer:

- [Prefers reduced motion | Handling Hover, Focus, and Other States - Tailwind CSS](https://tailwindcss.com/docs/hover-focus-and-other-states#prefers-reduced-motion)
- [Prefers reduced motion | Animation - Tailwind CSS](https://tailwindcss.com/docs/animation#prefers-reduced-motion)
- [Print styles | Handling Hover, Focus, and Other States - Tailwind CSS](https://tailwindcss.com/docs/hover-focus-and-other-states#print-styles)

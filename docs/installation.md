---
title: Installation
---

# Getting Started

First, install the plugin via npm:

```sh
npm install tw-animate
```

## Import

Second, import it alongside Tailwind CSS in your CSS file:

```css
/* tailwind css v4.x */
@import "tailwindcss";
@import "tw-animate";
```

Or, if you are using **Tailwind CSS v3.x** or the legacy JavaScript configuration file, import the plugin like this:

```js
// tailwind.config.js
module.exports = {
  // ...
  plugins: [
    require('tw-animate')
  ],
}
```

After proper config, you can use the animations of Animate.css the same way as
you use those of Tailwind CSS:

```html
<h1 class="animate-bounce animate-infinite">Bouncing Heading</h1>
```

:::info Notes

- If you're coming from classical Animate.css, please note that you need to
  reference the classes using hyphen instead of underscores (e.g.,
  `animate-bounce` instead of `animate__bounce`).

- The built-in animations (`spin`, `ping`, `pulse`, `bounce`) are prefixed by
  `tw`. So, if you want Tailwind CSS' bounce you need to write
  `animate-twBounce` instead of `animate-bounce`.

- The animations this package provides are not exactly same as that of
  Animate.css. We have done some modifications to provide you with more
  consistent and customizable animations.

:::

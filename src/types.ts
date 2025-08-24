// https://github.com/tailwindlabs/play.tailwindcss.com/tree/master/src/monaco/ *.d.ts

import type * as CSS from 'csstype'

export type CSSProperties = CSS.Properties & Record<`--${string}`, string>

export type CSSBlock = Record<string, CSSProperties | undefined>

export type Keyframes = Record<string, CSSBlock | undefined>

import { keyframes } from './keyframes.js'
import { keyframeUtils } from './utilities.js'
import { delay, distance, duration, ease, fill, repeat } from './defaults.js'

const animations = Object.fromEntries(
    Object.keys(keyframes).map((k) => [
        k,
        `${keyframeUtils[k]?.animationDuration ?? '1s'}
      ${keyframeUtils[k]?.animationTimingFunction ?? ''}
      both ${k}`.replace(/\s+/g, ' '),
    ]),
)

export default {
    extend: {
        animationDelay: delay,
        animationDuration: duration,
        animationEase: ease,
        animationRepeat: repeat,
        animationFill: fill,
        animationDistance: distance,
        animation: animations,
        keyframes,
    },
};

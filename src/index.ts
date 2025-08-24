import plugin from 'tailwindcss/plugin.js'

import theme from './theme.js'
import plugins from './plugins.js'

export default plugin(plugins, {
    theme,
})

"use strict";

const highlight = require("showdown-highlight")

/**
 * @name bloggify:init
 * @param {Object} config
 *
 *   - `theme` (String): The HighlightJS theme (default: `"default"`).
 *   - `version` (String): The HighlightJS version (default: `"11.5.0"`).
 */
module.exports = config => {
    Bloggify.adapter.options.parse.converterOptions.extensions.push(highlight)
    Bloggify.assets.add(`https://cdnjs.cloudflare.com/ajax/libs/highlight.js/${config.version}/styles/${config.theme}.min.css`)
}

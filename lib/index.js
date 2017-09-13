"use strict";

const highlight = require("showdown-highlight")

/**
 * @name bloggify:init
 * @param {Object} config
 *
 *   - `theme` (String): The HighlightJS theme (default: `"default"`).
 */
module.exports = config => {
    Bloggify.adapter.options.parse.converterOptions.extensions.push(highlight)
    Bloggify.assets.add("https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.8.0/styles/" + config.theme + ".min.css")
}

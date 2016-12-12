"use strict";

const highlight = require("showdown-highlight");

/**
 * bloggifyMarkdownHighlight
 * Highlight code blocks in the Markdown code.
 *
 * @name bloggifyMarkdownHighlight
 * @function
 * @param {Number} a Param descrpition.
 * @param {Number} b Param descrpition.
 * @return {Number} Return description.
 */
module.exports = (config, bloggify) => {
    bloggify.options.adapter.parse.converterOptions.extensions.push(highlight);
    bloggify.assets.addCSS("https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.8.0/styles/" + config.theme + ".min.css", false);
};

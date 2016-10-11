"use strict";

const ul = require("ul")
    , decamelize = require("decamelize")
    , iterateObject = require("iterate-object")
    ;

const isProduction = process.env.NODE_ENV === "production"
    , PORT = process.env.PORT || 8080
    ;

/**
 * bloggifyConfig
 * Create Bloggify configuration.
 *
 * @name bloggifyConfig
 * @function
 * @param {Object} conf An object containing the following fields:
 *
 *  - `title` (String): The site title.
 *  - `description` (String): The site description.
 *  - `port` (Number): The server port (default: `8080`). You can set this using the `PORT` environment variable.
 *  - `devDomain` (String): The dev domain (default: `http://localhost:${PORT}`).
 *  - `theme` (String): The theme name (if it's a npm package) or the path to the theme directory (it should start with `/`).
 *  - `router` (String): The router plugin name (default: `"bloggify-router"`).
 *  - `pluginManager` (String): The plugin manager name (default: "bloggify-plugin-manager")
 *  - `renderer` (String): The renderer name (default: `"bloggify-ajs-renderer"`).
 *  - `viewer` (String): The viwer name (default: `"bloggify-viewer"`).
 *  - `devConfig` (Object): An object containing the development-specific plugin configs (default: {}).
 *  - `config` (Object): An object containing the plugin configs (default: {}).
 *  - `plugins` (Array): The plugins to be loaded (default: []).
 *  - `devPlugins` (Array): The plugins to be loaded in the development mode (default: []).
 *  - `prodPlugins` (Array): The plugins to be loaded in the production mode (default: []).
 *
 * @param {Object} additional Additional fields to merge in the object.
 * @returns {Object} The Bloggify config.
 */
module.exports = function bloggifyConfig (conf, additional) {

    conf = ul.merge(conf, {
        title: ""
      , description: ""
      , port: PORT
      , devDomain: `http://localhost:${PORT}`
      , theme: ""
      , router: "bloggify-router"
      , pluginManager: "bloggify-plugin-manager"
      , renderer: "bloggify-ajs-renderer"
      , viewer: "bloggify-viewer"
      , devConfig: {}
      , config: {}
      , plugins: []
      , devPlugins: []
      , prodPlugins: []
    });

    let themePath = conf.theme.startsWith("/") ? conf.theme : `node_modules/${conf.theme}`
      , corePlugins = [
            conf.pluginManager
          , conf.router
          , conf.renderer
          , conf.viewer
        ]
      , pluginList = []
      , pluginConfigs = {}
      ;

    pluginList = pluginList.concat(isProduction ? conf.devPlugins : conf.devPlugins).concat(conf.plugins);
    pluginConfigs[conf.pluginManager] = pluginList;

    iterateObject(conf.config, (pConfig, pName) => {
        pluginConfigs[decamelize(pName, "-")] = pConfig;
    });

    if (!isProduction) {
        iterateObject(conf.devConfig, (pConfig, pName) => {
            pName = decamelize(pName, "-");
            pluginConfigs[pName] = ul.deepMerge(pConfig, pluginConfigs[pName]);
        });
    }

    let ret = ul.deepMerge({
        metadata: {
            siteTitle: conf.title
          , description: conf.description
          , domain: isProduction ? conf.domain : conf.devDomain
          , twitter: "Bloggify"
        }
      , corePlugins: corePlugins
      , server: {
            port: PORT
        }
      , theme: {
            path: themePath
        }
      , pluginConfigs: pluginConfigs
    }, additional);

    return ret;
};

module.exports.isProduction = isProduction;

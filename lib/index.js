"use strict";

const ul = require("ul")
    , decamelize = require("decamelize")
    , iterateObject = require("iterate-object")
    , dotenv = require("dotenv")
    ;

dotenv.config()

const isProduction = process.env.NODE_ENV === "production"
    , PORT = process.env.PORT || 8080
    ;

/**
 * bloggifyConfig
 * Create Bloggify configuration.
 *
 * #### The `.env` file
 * By creating an `.env` file in the root of the project you can set environment variables in your Bloggify application.
 * We highly recommend to *not* commit this file because in general it is going to contain sensible data (such as api keys etc).
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
 *  - `corePlugins` (Array): The plugins to be loaded before loading the router and the renderer.
 *  - `devPlugins` (Array): The plugins to be loaded in the development mode (default: []).
 *  - `prodPlugins` (Array): The plugins to be loaded in the production mode (default: []).
 *  - `sessionStore` (String): An optional session store used for sessions (e.g. `"connect-mongo"`).
 *  - `sessionOptions` (Object): An optional object containing the session options.
 *  - `cmsMethods` (Boolean): If `false`, it will not load the Bloggify CMS-related methods.
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
      , theme: "/theme"
      , router: "bloggify-router"
      , pluginManager: "bloggify-plugin-manager"
      , renderer: "bloggify-ajs-renderer"
      , viewer: "bloggify-viewer"
      , devConfig: {}
      , config: {}
      , plugins: []
      , devPlugins: []
      , prodPlugins: []
      , corePlugins: []
      , sessionStore: undefined
      , sessionOptions: undefined
      , cmsMethods: true
    });

    let themePath = conf.theme.startsWith("/") ? conf.theme : `node_modules/${conf.theme}`
      , corePlugins = conf.corePlugins.concat([
            conf.router
          , conf.pluginManager
        ])
      , pluginList = [
            conf.renderer
          , conf.viewer
        ]
      , pluginConfigs = {}
      ;

    pluginList = pluginList.concat(isProduction ? conf.prodPlugins : conf.devPlugins).concat(conf.plugins).filter(Boolean);
    pluginConfigs[conf.pluginManager] = { plugins: pluginList };

    iterateObject(conf.config, (pConfig, pName) => {
        pluginConfigs[decamelize(pName, "-")] = pConfig;
    });

    if (!isProduction) {
        iterateObject(conf.devConfig, (pConfig, pName) => {
            pName = decamelize(pName, "-");
            pluginConfigs[pName] = ul.deepMerge(pConfig, pluginConfigs[pName]);
        });
    }

    const sessionOpts = conf.sessionStore ? {
        store: conf.sessionStore
      , storeOptions: conf.sessionOptions
    } : undefined;

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
          , session: sessionOpts
        }
      , theme: {
            path: themePath
        }
      , pluginConfigs: pluginConfigs
      , cms_methods: conf.cmsMethods
    }, additional);

    return ret;
};

module.exports.isProduction = isProduction;

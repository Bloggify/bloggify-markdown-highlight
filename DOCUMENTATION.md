## Documentation

You can see below the API reference of this module.

### `bloggifyConfig(conf, additional)`
Create Bloggify configuration.

#### The `.env` file
By creating an `.env` file in the root of the project you can set environment variables in your Bloggify application.
We highly recommend to *not* commit this file because in general it is going to contain sensible data (such as api keys etc).

#### Params
- **Object** `conf`: An object containing the following fields:
 - `title` (String): The site title.
 - `description` (String): The site description.
 - `port` (Number): The server port (default: `8080`). You can set this using the `PORT` environment variable.
 - `devDomain` (String): The dev domain (default: `http://localhost:${PORT}`).
 - `theme` (String): The theme name (if it's a npm package) or the path to the theme directory (it should start with `/`).
 - `router` (String): The router plugin name (default: `"bloggify-router"`).
 - `pluginManager` (String): The plugin manager name (default: "bloggify-plugin-manager")
 - `renderer` (String): The renderer name (default: `"bloggify-ajs-renderer"`).
 - `viewer` (String): The viwer name (default: `"bloggify-viewer"`).
 - `devConfig` (Object): An object containing the development-specific plugin configs (default: {}).
 - `config` (Object): An object containing the plugin configs (default: {}).
 - `plugins` (Array): The plugins to be loaded (default: []).
 - `corePlugins` (Array): The plugins to be loaded before loading the router and the renderer.
 - `devPlugins` (Array): The plugins to be loaded in the development mode (default: []).
 - `prodPlugins` (Array): The plugins to be loaded in the production mode (default: []).
 - `sessionStore` (String): An optional session store used for sessions (e.g. `"connect-mongo"`).
 - `sessionOptions` (Object): An optional object containing the session options.
 - `cmsMethods` (Boolean): If `false`, it will not load the Bloggify CMS-related methods.
- **Object** `additional`: Additional fields to merge in the object.

#### Return
- **Object** The Bloggify config.


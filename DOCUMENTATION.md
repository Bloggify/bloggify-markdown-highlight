## Documentation

You can see below the API reference of this module.

### `bloggifyConfig(conf, additional)`
Create Bloggify configuration.

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
- **Object** `additional`: Additional fields to merge in the object.

#### Return
- **Object** The Bloggify config.


"use strict";

const bloggifyConfig = require("../lib");

console.log(bloggifyConfig.isProduction);
// => false

console.log(bloggifyConfig({
    title: "Bloggify"
  , prodPlugins: [
      "bloggify-analytics"
    ]
  , devPlugins: [
      "debug"
    ]
  , plugins: [
      "github-login"
    ]
  , description: "We make publishing easy."
  , domain: "https://example.com"
  , theme: "bloggify-theme-light"
  , devConfig: {
        ajsRenderer: {
            cache: false
        }
      , githubLogin: {
            secret: "foo"
          , clientId: "bar"
        }
    }
  , config: {
        githubLogin: {
            secret: "real foo"
          , clientId: "real bar"
        }
    }
}, {
    metadata: {
        twitter: "Bloggify"
    }
}));
// { metadata:
//    { twitter: 'Bloggify',
//      siteTitle: 'Bloggify',
//      description: 'We make publishing easy.',
//      domain: 'http://localhost:8080' },
//   corePlugins:
//    [ 'bloggify-plugin-manager',
//      'bloggify-router',
//      'bloggify-ajs-renderer',
//      'bloggify-viewer' ],
//   server: { port: 8080 },
//   theme: { path: 'node_modules/bloggify-theme-light' },
//   pluginConfigs:
//    { 'bloggify-plugin-manager': [ 'debug', 'github-login' ],
//      'github-login': { secret: 'foo', clientId: 'bar' },
//      'ajs-renderer': { cache: false } } }

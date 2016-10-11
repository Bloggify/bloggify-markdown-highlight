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

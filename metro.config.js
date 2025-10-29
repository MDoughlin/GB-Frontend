const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.resolver.sourceExts = config.resolver.sourceExts.filter(
  (ext) => ext !== "flow"
);

// Add custom entry file to load polyfills first
config.server = {
  ...config.server,
  enhanceMiddleware: (middleware) => {
    return (req, res, next) => {
      if (req.url === '/polyfill-entry.bundle') {
        res.end('/* Polyfills loaded */');
      } else {
        middleware(req, res, next);
      }
    };
  }
};

module.exports = config;

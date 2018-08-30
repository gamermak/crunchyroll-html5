const common = require('./webextension.background.config.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const { optimizeForProduction } = require('../build/webpack-prod.js');

optimizeForProduction(common);

common.plugins = [
  new UglifyJSPlugin()
];

module.exports = common;
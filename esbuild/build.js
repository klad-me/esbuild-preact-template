const ESBuild = require('esbuild')
const path = require('path')
const config = require('./config.js')

ESBuild.build(config);

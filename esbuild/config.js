const ESBuild = require('esbuild');
const postcssPlugin = require("esbuild-plugin-postcss2");
const path = require('path');

const MODE = process.env.MODE || 'dev';
const isDev = MODE == 'dev';
const isProd = MODE == 'prod';

module.exports = {
	outdir: path.resolve(__dirname, '..', 'build'),
	entryPoints: [ path.resolve(__dirname, '..', 'src', 'AppMain') ],
	entryNames: 'bundle',
	allowOverwrite: true,
	bundle: true,
	minify: isProd,
	sourcemap: isDev,
	loader: {
		'.ttf': 'dataurl',
		'.mp3': 'file',
	},
	charset: 'utf8',
	define: {
		'DEBUG': isDev,
	},
	tsconfig: path.resolve(__dirname, '..', 'tsconfig.json'),
	plugins: [
		postcssPlugin.default({
			...postcssPlugin.defaultOptions,
			modules: {
				generateScopedName: '[local]_[hash:base64:6]',
				localsConvention: 'camelCaseOnly',
			},
		}),
	],
	target: 'es2016',
}

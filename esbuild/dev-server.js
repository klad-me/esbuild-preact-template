const ESBuild = require('esbuild')
const path = require('path')
const config = require('./config.js')
const http = require('http');
const https = require('https');
const fs = require('fs');

const httpPort = 3000;
const httpsPort = 3003;

console.log("key:", );

const httpsOptions = {
	key: fs.readFileSync(path.resolve(__dirname, 'key.pem')),
	cert: fs.readFileSync(path.resolve(__dirname, 'cert.pem'))
};

ESBuild.serve({
	servedir: config.outdir,
	port: httpPort,
}, config)
.then( ({host, port}) => {
	console.log("http server started @ http://"+host+":"+port)
	
	https.createServer(httpsOptions, function (req, res) {
		const options = {
			hostname: host,
			port: port,
			path: req.url,
			method: req.method,
			headers: req.headers,
		};
		
		// Forward each incoming request to esbuild
		const proxyReq = http.request(options, proxyRes => {
			res.writeHead(proxyRes.statusCode, proxyRes.headers);
			proxyRes.pipe(res, { end: true });
		});
		
		// Forward the body of the request to esbuild
		req.pipe(proxyReq, { end: true });
	}).listen(httpsPort);
	
	console.log("https server started @ https://"+host+":"+httpsPort);
})
.catch( (e) => {
	console.error(e);
});

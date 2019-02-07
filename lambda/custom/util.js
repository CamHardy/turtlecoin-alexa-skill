// util.js
'use strict'

const http = require('http');
const https = require('https');

exports.httpGet = function(_host, _path, _port) {
	return new Promise(((resolve, reject) => {
	var options = {
		host: _host,
		port: _port || 80,
		path: _path,
		method: 'GET'
	};

	let req = http.request(options, (res) => {
		res.setEncoding('utf8');
		let returnData = '';

		res.on('data', (chunk) => {
		returnData += chunk;
		});

		res.on('end', () => {
		resolve(returnData);
		});

		res.on('error', (error) => {
		reject(error);
		});
	});
	req.on('socket', (sock) => {
		sock.setTimeout(7000);
		sock.on('timeout', () => {
		req.abort();
		});
	});

	req.on('error', (error) => {
		reject(error);
	});
	req.end();
	}));
}

exports.httpsGet = function(_host, _path, _port) {
	return new Promise(((resolve, reject) => {
	var options = {
		host: _host,
		port: _port || 443,
		path: _path,
		method: 'GET'
	};

	let req = https.request(options, (res) => {
		res.setEncoding('utf8');
		let returnData = '';

		res.on('data', (chunk) => {
		returnData += chunk;
		});

		res.on('end', () => {
		resolve(returnData);
		});

		res.on('error', (error) => {
		reject(error);
		});
	});
	req.on('socket', (sock) => {
		sock.setTimeout(7000);
		sock.on('timeout', () => {
		req.abort();
		});
	});

	req.on('error', (error) => {
		reject(error);
	});
	req.end();
	}));
}
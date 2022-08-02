#!/usr/bin/env node
"use strict";
/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Module dependencies.
 */
var app_1 = __importDefault(require("@src/app"));
var debug_1 = __importDefault(require("debug"));
var http_1 = __importDefault(require("http"));
var debug = (0, debug_1.default)('blog:server');
/**
 * Get port from environment and store in Express.
 */
var port = normalizePort(process.env.PORT || '3000');
app_1.default.set('port', port);
/**
 * Create HTTP server.
 */
var server = http_1.default.createServer(app_1.default);
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    var normalizedPort = parseInt(val, 10);
    if (Number.isNaN(normalizedPort)) {
        // named pipe
        return val;
    }
    if (normalizedPort >= 0) {
        // port number
        return normalizedPort;
    }
    return false;
}
/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    var bind = typeof port === 'string'
        ? "Pipe ".concat(port)
        : "Port ".concat(port);
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error("".concat(bind, " + ' requires elevated privileges"));
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error("".concat(bind, " is already in use"));
            process.exit(1);
            break;
        default:
            throw error;
    }
}
/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? "pipe ".concat(addr)
        : "port ".concat(addr.port);
    debug("Listening on ".concat(bind));
}
//# sourceMappingURL=www.js.map
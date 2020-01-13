"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    port: 8080,
    apiPrefix: '/api',
    databaseURL: process.env.databaseURL,
    jwt: {
        secret: process.env.jwtSecret,
        expiresIn: '12h'
    }
};

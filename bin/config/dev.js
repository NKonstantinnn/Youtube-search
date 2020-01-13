"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    port: 8080,
    apiPrefix: '/api',
    databaseURL: 'mongodb://localhost:27017/youtubesearchdb',
    jwt: {
        secret: 'jwtSecret',
        expiresIn: '1h'
    }
};

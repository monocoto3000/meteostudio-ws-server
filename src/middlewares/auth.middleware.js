"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketioAuthMiddleware = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var secretJWT = 'CMD.213008';
var verify = jsonwebtoken_1.default.verify;
var verifyJWT = function (socket, next) {
    try {
        var token = socket.handshake.auth.token;
        /**
        En el cliente:
        const socket = io("http://localhost:3000", {
            auth: {
                token: "tokenGeneradoEnLogin"
            }
        });
        */
        verify(token, secretJWT, function (err, decode) {
            if (err) {
                next(err);
            }
            socket.user_id = decode;
            next();
        });
    }
    catch (error) {
        next(error);
    }
};
exports.socketioAuthMiddleware = verifyJWT;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var socket_controller_1 = require("../controllers/socket.controller");
var router = express.Router();
router.get('/rtdata', socket_controller_1.rtdataController.handleRequest);
router.get('/averages', socket_controller_1.averagesController.handleRequest);
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const origin_1 = __importDefault(require("./origin"));
const chronology_1 = __importDefault(require("./chronology"));
exports.default = {
    Origin: origin_1.default,
    Chronology: chronology_1.default
};

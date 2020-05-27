"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const psl_1 = __importDefault(require("psl"));
/**
 * The value and isolated components of a singular from/to header field value (i.e. email address).
 *
 * e.g. `Jaclyn <jaclyn@mx.cull.email>` would be represented as:
 * ```
 *  {
 *    name:    "Jaclyn",
 *    address: "jaclyn@mx.cull.email"
 *    domain:  "cull.email"
 *  }
 * ```
 */
class Identity {
    constructor(address) {
        this.name = address.name;
        this.address = `${address.mailbox}@${address.host}`;
        let parsed = psl_1.default.parse(address.host);
        this.domain = parsed.domain;
    }
    toString() {
        return this.name ? `${this.name} <${this.address}>` : `<${this.address}>`;
    }
}
exports.default = Identity;

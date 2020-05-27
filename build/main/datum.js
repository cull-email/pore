"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const identity_1 = __importDefault(require("./identity"));
/**
 * Analytical primative translated from email metadata.
 */
class Datum {
    /**
     * Datum constructor
     *
     * @param envelope original envelope to transform
     * @todo investigate reliance on envelope date field
     * @todo verify date format to guarantee for parsing reliability
     */
    constructor(client, mailbox, envelope) {
        this.client = client;
        this.mailbox = mailbox;
        this.envelope = envelope;
        this.moment = moment_1.default(envelope.date, 'ddd, M MMM YYYY hh:mm:ss ZZ');
        this.from = envelope.from.map(address => new identity_1.default(address));
    }
}
exports.default = Datum;

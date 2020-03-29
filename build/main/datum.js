"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const psl_1 = __importDefault(require("psl"));
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
    constructor(envelope) {
        this.envelope = envelope;
        this.moment = moment_1.default(envelope.date, 'ddd, M MMM YYYY hh:mm:ss ZZ');
        this.from = envelope.from.map(from => {
            let value = from.address;
            let email = from.address.split('@');
            let parsed = psl_1.default.parse(email[1]);
            return Object.assign(Object.assign({}, from), { value, domain: parsed.domain });
        });
    }
    get client() {
        return this.envelope.client.name;
    }
    get mailbox() {
        return this.envelope.mailbox;
    }
}
exports.default = Datum;

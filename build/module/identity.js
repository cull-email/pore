import psl from 'psl';
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
export default class Identity {
    constructor(address) {
        this.name = address.name;
        this.address = `${address.mailbox}@${address.host}`;
        let parsed = psl.parse(address.host);
        this.domain = parsed.domain;
    }
    toString() {
        return this.name ? `${this.name} <${this.address}>` : `<${this.address}>`;
    }
}

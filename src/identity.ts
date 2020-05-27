import psl from 'psl';
import { Address } from '@cull/imap';

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
  name?: string;
  address: string;
  domain: string;

  constructor(address: Address) {
    this.name = address.name;
    this.address = `${address.mailbox}@${address.host}`;
    let parsed = psl.parse(address.host) as psl.ParsedDomain;
    this.domain = parsed.domain;
  }

  toString(): string {
    return this.name ? `${this.name} <${this.address}>` : `<${this.address}>`;
  }
}

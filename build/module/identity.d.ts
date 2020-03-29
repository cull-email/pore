/**
 * The value and isolated components that make up a typical, singular from/to header field value.
 *
 * e.g. `Jaclyn <jaclyn@email.example.com>` would be represented as:
 * ```
 *  {
 *    value:   "Jaclyn <jaclyn@mail.example.com>",
 *    name:    "Jaclyn",
 *    address: "jaclyn@mail.example.com"
 *    domain:  "example.com"
 *  }
 * ```
 */
export default interface Identity {
    value: string;
    name: string;
    address: string;
    domain: string;
}

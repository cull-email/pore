import moment from 'moment';
import psl from 'psl';
/**
 * Analytical primative translated from email metadata.
 */
export default class Datum {
    /**
     * Datum constructor
     *
     * @param envelope original envelope to transform
     * @todo investigate reliance on envelope date field
     * @todo verify date format to guarantee for parsing reliability
     */
    constructor(envelope) {
        this.envelope = envelope;
        this.moment = moment(envelope.date, 'ddd, M MMM YYYY hh:mm:ss ZZ');
        this.from = envelope.from.map(from => {
            let value = from.address;
            let email = from.address.split('@');
            let parsed = psl.parse(email[1]);
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

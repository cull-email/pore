import moment from 'moment';
import Identity from './identity';
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
    constructor(client, mailbox, envelope) {
        this.client = client;
        this.mailbox = mailbox;
        this.envelope = envelope;
        this.moment = moment(envelope.date, 'ddd, M MMM YYYY hh:mm:ss ZZ');
        this.from = envelope.from.map(address => new Identity(address));
    }
}

import { Moment } from 'moment';
import { Envelope } from '@cull/imap';
import Identity from './identity';
/**
 * Analytical primative translated from email metadata.
 */
export default class Datum {
    /**
     * Originating email envelope
     */
    envelope: Envelope;
    /**
     * A datetime object representing when the message was received
     */
    moment: Moment;
    /**
     * From
     */
    from: Identity[];
    /**
     * Datum constructor
     *
     * @param envelope original envelope to transform
     * @todo investigate reliance on envelope date field
     * @todo verify date format to guarantee for parsing reliability
     */
    constructor(envelope: Envelope);
    get client(): string;
    get mailbox(): string;
}

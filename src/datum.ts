import moment, { Moment } from 'moment';
import Client, { Envelope, Mailbox } from '@cull/imap';

import Identity from './identity';

/**
 * Analytical primative translated from email metadata.
 */
export default class Datum {
  /**
   * Originating IMAP client
   */
  client: Client;
  /**
   * Originating Mailbox
   */
  mailbox: Mailbox;
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
  constructor(client: Client, mailbox: Mailbox, envelope: Envelope) {
    this.client = client;
    this.mailbox = mailbox;
    this.envelope = envelope;
    this.moment = moment(envelope.date, 'ddd, M MMM YYYY hh:mm:ss ZZ');
    this.from = envelope.from.map(address => new Identity(address));
  }
}

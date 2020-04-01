import moment, { Moment } from 'moment';
import psl from 'psl';
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
  constructor(envelope: Envelope) {
    this.envelope = envelope;
    this.moment = moment(envelope.date, 'ddd, M MMM YYYY hh:mm:ss ZZ');
    this.from = envelope.from.map(from => {
      let value = from.address;
      let email = from.address.split('@');
      let parsed = psl.parse(email[1]) as psl.ParsedDomain;
      return { ...from, value, domain: parsed.domain as string };
    });
  }

  get client(): string {
    return this.envelope.client.name;
  }

  get mailbox(): string {
    return this.envelope.mailbox;
  }
}

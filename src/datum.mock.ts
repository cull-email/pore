import Datum from './datum';
import Client, { Mailbox, Envelope, Address } from '@cull/imap';

export default (): Datum => {
  let client = new Client({
    id: 'mock',
    host: 'cull.email',
    user: '',
    pass: ''
  });
  let mailbox: Mailbox = {
    name: 'inbox',
    delimiter: '/',
    attributes: []
  };
  let envelope = new Envelope();
  envelope.date = 'Sat, 15 February 2020 01:49:00 +0000';
  envelope.subject = 'Subject';
  envelope.from = [new Address('cull.email', 'jon', 'Jon')];
  envelope.to = [new Address('cull.email', 'jaclyn', 'Jaclyn')];
  return new Datum(client, mailbox, envelope);
};

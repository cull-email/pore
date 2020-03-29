import Datum from '../src/datum';
import Client from 'cull-email-imap';

let client = new Client({
  host: 'cull.email',
  user: '',
  pass: ''
});

export default (): Datum => {
  let envelope = {
    client,
    mailbox: 'INBOX',
    date: 'Sat, 15 February 2020 01:49:00 +0000',
    subject: 'Subject',
    from: [{ name: 'Jaclyn', address: 'jaclyn@mail.example.com' }],
    to: [{ name: 'Jon', address: 'jon@mail.example.com' }],
  };
  return new Datum(envelope);
}

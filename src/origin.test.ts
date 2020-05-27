import test from 'ava';
import Origin from '../src/origin';
import Datum from './datum.mock';

test('Origin may contain distinct senders', t => {
  let data = [Datum()];
  let o = new Origin(data);
  let senders = [...o.senders];
  t.is(senders.length, 1);
  t.is(senders[0], data[0].from[0].toString());
});
test('Origin may contain distinct addresses', t => {
  let data = [Datum()];
  let o = new Origin(data);
  let addresses = [...o.addresses];
  t.is(addresses.length, 1);
  t.is(addresses[0], data[0].from[0].address);
});

test('Origin may contain distinct domains', t => {
  let data = [Datum()];
  let o = new Origin(data);
  let domains = [...o.domains];
  t.is(domains.length, 1);
  t.is(domains[0], data[0].from[0].domain);
});

test('Origin generates nodes and links connecting senders, addresses and domains', t => {
  let data = [Datum()];
  let o = new Origin(data);
  let sankey = o.sankey();
  let expected = [
    { kind: 'sender', label: 'Jon <jon@cull.email>', id: 'sender__Jon <jon@cull.email>' },
    { kind: 'address', label: 'jon@cull.email', id: 'address__jon@cull.email' },
    { kind: 'domain', label: 'cull.email', id: 'domain__cull.email' }
  ];
  let nodes = [...sankey.nodes.values()];
  t.deepEqual(nodes, expected);
  t.is(nodes.length, 3);
  t.is(sankey.links.length, 2);
  t.is(sankey.links[0].data.length, 1);

  o.data = data.concat([Datum()]);
  sankey = o.sankey();

  nodes = [...sankey.nodes.values()];
  t.deepEqual(nodes, expected);
  t.is(nodes.length, 3);
  t.is(sankey.links.length, 2);
  t.is(sankey.links[0].data.length, 2);
});

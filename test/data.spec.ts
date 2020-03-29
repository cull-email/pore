import test from 'ava';

import Data from '../src/data';
import mockDatum from './datum';

test('Data can be empty', t => {
  let d = new Data();
  t.is(d.data.length, 0);
});

test('Data can be initialized', t => {
  let d = new Data([mockDatum()]);
  t.is(d.data.length, 1);
});

test('Data can be explicitly set', t => {
  let d = new Data();
  t.is(d.data.length, 0);
  d.data = [mockDatum()];
  t.is(d.data.length, 1);
});

test('Data can be filtered', t => {
  let data = [mockDatum()];
  let d = new Data(data);
  let filtered = d.filter();
  t.deepEqual(d.data, filtered);
  filtered = d.filter([(datum => datum.from[0].name === data[0].from[0].name)]);
  t.deepEqual(d.data, filtered);
  filtered = d.filter([() => false]);
  t.is(filtered.length, 0);
  t.is(d.data.length, 0);
});

import test from 'ava';
import Chronology from '../src/chronology';
import Datum from './datum.mock';

test('Chronology can group data by date', t => {
  let data = [Datum()];
  let c = new Chronology(data);
  let date = data[0].moment.format('YYYY-MM-DD');
  t.is([...c.byDate.keys()].length, 1);
  let retrieved = c.byDate.get(date);
  t.is(retrieved!.length, 1);
  t.deepEqual(retrieved![0], data[0]);
});
test('Chronology can group data by hour', t => {
  let data = [Datum()];
  let c = new Chronology(data);
  let keys = [...c.byHour.keys()];
  t.is(keys.length, 24);
  let hour = data[0].moment.hour();
  let retrieved = c.byHour.get(hour);
  t.is(retrieved!.length, 1);
  t.deepEqual(retrieved![0], data[0]);
});

test('Chronology can group data by weekday', t => {
  let data = [Datum()];
  let c = new Chronology(data);
  let keys = [...c.byWeekday.keys()];
  t.is(keys.length, 7);
  let weekday = data[0].moment.isoWeekday() - 1;
  let retrieved = c.byWeekday.get(weekday);
  t.is(retrieved!.length, 1);
  t.deepEqual(retrieved![0], data[0]);
});

test('Chronology can group and nest data by hour for weekdays', t => {
  let data = [Datum()];
  let c = new Chronology(data);
  let hour = data[0].moment.hour();
  let weekday = data[0].moment.isoWeekday() - 1;
  t.is([...c.byHourByWeekday.keys()].length, 7);
  let hours = c.byHourByWeekday.get(weekday);
  t.is([...hours!.keys()].length, 24);
  let retrieved = hours!.get(hour);
  t.is(retrieved!.length, 1);
  t.deepEqual(retrieved![0], data[0]);
});

import moment, { Moment } from 'moment';

import Datum from './datum';
import Data from './data';

export const dateKeyFormat: string = 'YYYY-MM-DD';

/**
 * Datum collection analyzing the chronology of email.
 */
export default class Chronology extends Data {
  /**
   * The minimum and maximum date of the data
   *
   * [min, max]
   */
  extent!: [Moment, Moment];
  /**
   * Data grouped by date
   *
   * Keyed by date as `dateKeyFormat` string value
   */
  byDate!: Map<string, Datum[]>;
  /**
   * Data grouped by hour.
   *
   * Keyed by hour `0-23`
   */
  byHour!: Map<number, Datum[]>;
  /**
   * Data grouped by day of the week.
   *
   * Keyed for Mon-Sun as `0-6`
   * @link https://en.wikipedia.org/wiki/ISO_week_date
   */
  byWeekday!: Map<number, Datum[]>;
  /**
   * Volume of messages received by hour, by day of week.
   *
   * Keyed first by day of week, Mon-Sun as `0-6`, then hour `0-23`
   */
  byHourByWeekday!: Map<number, Map<number, Datum[]>>;

  protected compute(): void {
    super.compute();

    let timestamps = this.data.map(d => d.moment.unix());
    let min = Math.min(...timestamps);
    let max = Math.max(...timestamps);
    this.extent = [moment.unix(min), moment.unix(max)];

    this.byDate = chronologyByDate(this.extent);
    this.byHour = chronologyByHour();
    this.byWeekday = chronologyByWeekday();
    this.byHourByWeekday = chronologyByHourByWeekday();

    this.data.forEach(d => {
      let key = d.moment.format(dateKeyFormat);
      let data = this.byDate?.get(key) ?? [];
      this.byDate.set(key, data.concat(d));

      let hour = d.moment.hour();
      this.byHour.get(hour)?.push(d);

      let weekday = d.moment.isoWeekday() - 1;
      this.byWeekday.get(weekday)?.push(d);

      this.byHourByWeekday
        .get(weekday)
        ?.get(hour)
        ?.push(d);
    });
  }
}

export let chronologyByDate = (extent: [Moment, Moment]): Map<string, Datum[]> => {
  let m = new Map();
  let days = extent[1].diff(moment[0], 'days');
  for (let i = 0; i < days; i++) {
    let key = extent[0]
      .clone()
      .add(i, 'days')
      .format(dateKeyFormat);
    m.set(key, []);
  }
  return m;
};

export let chronologyByHour = (): Map<number, Datum[]> => {
  let m = new Map();
  for (let i = 0; i < 24; i++) {
    m.set(i, []);
  }
  return m;
};

export let chronologyByWeekday = (): Map<number, Datum[]> => {
  let m = new Map();
  for (let i = 0; i < 7; i++) {
    m.set(i, []);
  }
  return m;
};

export let chronologyByHourByWeekday = (): Map<number, Map<number, Datum[]>> => {
  let m = new Map();
  for (let i = 0; i < 7; i++) {
    m.set(i, chronologyByHour());
  }
  return m;
};

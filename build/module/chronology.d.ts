import moment, { Moment } from 'moment';
import Datum from './datum';
import Data from './data';
export declare const dateKeyFormat: string;
/**
 * Datum collection analyzing the chronology of email.
 */
export default class Chronology extends Data {
    /**
     * The minimum and maximum date of the data
     *
     * [min, max]
     */
    extent: [Moment, Moment];
    /**
     * Data grouped by date
     *
     * Keyed by date as `dateKeyFormat` string value
     */
    byDate: Map<string, Datum[]>;
    /**
     * Data grouped by hour.
     *
     * Keyed by hour `0-23`
     */
    byHour: Map<number, Datum[]>;
    /**
     * Data grouped by day of the week.
     *
     * Keyed for Mon-Sun as `0-6`
     * @link https://en.wikipedia.org/wiki/ISO_week_date
     */
    byWeekday: Map<number, Datum[]>;
    /**
     * Volume of messages received by hour, by day of week.
     *
     * Keyed first by day of week, Mon-Sun as `0-6`, then hour `0-23`
     */
    byHourByWeekday: Map<number, Map<number, Datum[]>>;
    protected compute(): void;
}
export declare let chronologyByDate: (extent: [moment.Moment, moment.Moment]) => Map<string, Datum[]>;
export declare let chronologyByHour: () => Map<number, Datum[]>;
export declare let chronologyByWeekday: () => Map<number, Datum[]>;
export declare let chronologyByHourByWeekday: () => Map<number, Map<number, Datum[]>>;

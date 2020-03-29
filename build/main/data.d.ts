import Datum from './datum';
/**
 * Filter to be applied to a `Datum` collection (e.g. `Data`) via `Array.filter`.
 *
 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
 */
export declare type Filter = (d: Datum) => boolean;
/**
 * Filterable `Datum` collection
 */
export default class Data {
    /**
     * complete dataset
     */
    protected _data: Datum[];
    /**
     * subset of data filtered
     */
    protected _filtered: Datum[];
    /**
     * A `Filter` collection to be applied to data.
     */
    filters: Filter[];
    constructor(data?: Datum[]);
    /**
     * Set full data collection; reset filtration.
     */
    set data(data: Datum[]);
    /**
     * Get data post-filtration.
     */
    get data(): Datum[];
    /**
     * Filter full dataset and recompute dependent properties.
     *
     * @param filters zero or more Filters to apply to each Datum in the full dataset
     */
    filter(filters?: Filter[]): Datum[];
    /**
     * Compute properties dependent on filtered data.
     */
    protected compute(): void;
}

import Datum from './datum';

/**
 * Filter to be applied to a `Datum` collection (e.g. `Data`) via `Array.filter`.
 *
 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
 */
export type Filter = (d: Datum) => boolean;

/**
 * Filterable `Datum` collection
 */
export default class Data {
  /**
   * complete dataset
   */
  protected _data: Datum[] = [];
  /**
   * subset of data filtered
   */
  protected _filtered: Datum[] = [];
  /**
   * A `Filter` collection to be applied to data.
   */
  filters: Filter[] = [];

  constructor(data: Datum[] = []) {
    this.data = data;
  }

  /**
   * Set full data collection; reset filtration.
   */
  set data(data: Datum[]) {
    this._data = data;
    this.filter();
  }

  /**
   * Get data post-filtration.
   */
  get data(): Datum[] {
    return this._filtered;
  }

  /**
   * Filter full dataset and recompute dependent properties.
   *
   * @param filters zero or more Filters to apply to each Datum in the full dataset
   */
  filter(filters: Filter[] = []): Datum[] {
    this.filters = filters;
    this._filtered =
      filters.length > 0 ? this._data.filter(d => filters.every(filter => filter(d))) : this._data;
    this.compute();
    return this.data;
  }

  /**
   * Compute properties dependent on filtered data.
   */
  protected compute(): void {
    //
  }
}

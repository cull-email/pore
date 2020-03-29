"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Filterable `Datum` collection
 */
class Data {
    constructor(data = []) {
        /**
         * complete dataset
         */
        this._data = [];
        /**
         * subset of data filtered
         */
        this._filtered = [];
        /**
         * A `Filter` collection to be applied to data.
         */
        this.filters = [];
        this.data = data;
    }
    /**
     * Set full data collection; reset filtration.
     */
    set data(data) {
        this._data = data;
        this.filter();
    }
    /**
     * Get data post-filtration.
     */
    get data() {
        return this._filtered;
    }
    /**
     * Filter full dataset and recompute dependent properties.
     *
     * @param filters zero or more Filters to apply to each Datum in the full dataset
     */
    filter(filters = []) {
        this.filters = filters;
        this._filtered =
            filters.length > 0 ? this._data.filter(d => filters.every(filter => filter(d))) : this._data;
        this.compute();
        return this.data;
    }
    /**
     * Compute properties dependent on filtered data.
     */
    compute() {
        //
    }
}
exports.default = Data;

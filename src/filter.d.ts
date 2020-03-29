import Datum from './datum';

/**
 * Data filters typically applied to a Datum collection via array filter.
 *
 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
 */
export type Filter = (d: Datum) => boolean;
export default Filter;

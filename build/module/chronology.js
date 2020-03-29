import moment from 'moment';
import Data from './data';
export const dateKeyFormat = 'YYYY-MM-DD';
/**
 * Datum collection analyzing the chronology of email.
 */
export default class Chronology extends Data {
    compute() {
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
            var _a, _b, _c, _d, _e, _f;
            let key = d.moment.format(dateKeyFormat);
            let data = (_b = (_a = this.byDate) === null || _a === void 0 ? void 0 : _a.get(key)) !== null && _b !== void 0 ? _b : [];
            this.byDate.set(key, data.concat(d));
            let hour = d.moment.hour();
            (_c = this.byHour.get(hour)) === null || _c === void 0 ? void 0 : _c.push(d);
            let weekday = d.moment.isoWeekday() - 1;
            (_d = this.byWeekday.get(weekday)) === null || _d === void 0 ? void 0 : _d.push(d);
            (_f = (_e = this.byHourByWeekday
                .get(weekday)) === null || _e === void 0 ? void 0 : _e.get(hour)) === null || _f === void 0 ? void 0 : _f.push(d);
        });
    }
}
export let chronologyByDate = (extent) => {
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
export let chronologyByHour = () => {
    let m = new Map();
    for (let i = 0; i < 24; i++) {
        m.set(i, []);
    }
    return m;
};
export let chronologyByWeekday = () => {
    let m = new Map();
    for (let i = 0; i < 7; i++) {
        m.set(i, []);
    }
    return m;
};
export let chronologyByHourByWeekday = () => {
    let m = new Map();
    for (let i = 0; i < 7; i++) {
        m.set(i, chronologyByHour());
    }
    return m;
};

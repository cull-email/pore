"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const data_1 = __importDefault(require("./data"));
exports.dateKeyFormat = 'YYYY-MM-DD';
/**
 * Datum collection analyzing the chronology of email.
 */
class Chronology extends data_1.default {
    compute() {
        super.compute();
        let timestamps = this.data.map(d => d.moment.unix());
        let min = Math.min(...timestamps);
        let max = Math.max(...timestamps);
        this.extent = [moment_1.default.unix(min), moment_1.default.unix(max)];
        this.byDate = exports.chronologyByDate(this.extent);
        this.byHour = exports.chronologyByHour();
        this.byWeekday = exports.chronologyByWeekday();
        this.byHourByWeekday = exports.chronologyByHourByWeekday();
        this.data.forEach(d => {
            var _a, _b, _c, _d, _e, _f;
            let key = d.moment.format(exports.dateKeyFormat);
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
exports.default = Chronology;
exports.chronologyByDate = (extent) => {
    let m = new Map();
    let days = extent[1].diff(moment_1.default[0], 'days');
    for (let i = 0; i < days; i++) {
        let key = extent[0]
            .clone()
            .add(i, 'days')
            .format(exports.dateKeyFormat);
        m.set(key, []);
    }
    return m;
};
exports.chronologyByHour = () => {
    let m = new Map();
    for (let i = 0; i < 24; i++) {
        m.set(i, []);
    }
    return m;
};
exports.chronologyByWeekday = () => {
    let m = new Map();
    for (let i = 0; i < 7; i++) {
        m.set(i, []);
    }
    return m;
};
exports.chronologyByHourByWeekday = () => {
    let m = new Map();
    for (let i = 0; i < 7; i++) {
        m.set(i, exports.chronologyByHour());
    }
    return m;
};

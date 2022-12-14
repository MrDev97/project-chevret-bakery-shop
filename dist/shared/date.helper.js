"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayToDate = exports.dateToArray = void 0;
const dateToArray = (date) => {
    return [
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
    ];
};
exports.dateToArray = dateToArray;
const arrayToDate = (array) => {
    if (!Array.isArray(array) || array.some((i) => typeof i !== 'number'))
        return new Date(array.value.join());
};
exports.arrayToDate = arrayToDate;
//# sourceMappingURL=date.helper.js.map
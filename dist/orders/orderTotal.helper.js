"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sumOrderedProductsTotal = void 0;
const sumOrderedProductsTotal = (arr) => {
    let totalPrice = 0;
    arr.forEach((element) => {
        totalPrice += element.price;
    });
    return totalPrice;
};
exports.sumOrderedProductsTotal = sumOrderedProductsTotal;
//# sourceMappingURL=orderTotal.helper.js.map
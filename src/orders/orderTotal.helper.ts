export const sumOrderedProductsTotal = (arr: any): number => {
  let totalPrice = 0;

  arr.forEach((element) => {
    totalPrice += element.price;
  });

  return totalPrice;
};

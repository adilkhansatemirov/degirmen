export function countDiscount(order) {
  let totalWithService = order.total + service(order);
  return Math.round((totalWithService * order.discount) / 100);
}

export function service(order) {
  if (order.takeaway) {
    return 0;
  }
  return Math.round((order.total * 10) / 100);
}

export function toPay(order) {
  if (order.type == 'Кафе') {
    return order.total + service(order) - countDiscount(order);
  } else {
    return order.total + 300;
  }
}

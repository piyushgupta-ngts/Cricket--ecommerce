module.exports = function calculateCart(cart) {
  let subtotal = 0;
  let discountTotal = 0;
  let itemCount = 0;

  cart.items.forEach(item => {
    const price = item.price;
    const qty = item.qty;
    const discount = item.discount;

    const itemTotal = price * qty;
    const itemDiscount = (itemTotal * discount) / 100;

    subtotal += itemTotal;
    discountTotal += itemDiscount;
    itemCount += qty;
  });

  cart.subtotal = subtotal;
  cart.discountTotal = discountTotal;

  // TAX CALCULATION
  const taxableAmount  = subtotal - discountTotal;
  const taxAmount = (taxableAmount * cart.taxRate) / 100;

  cart.taxAmount=taxAmount
  cart.grandTotal = taxableAmount + taxAmount;


  cart.itemCount = itemCount;

  return cart;
};

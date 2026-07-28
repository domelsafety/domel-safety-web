export type InvoiceLineItem = {
  description: string;
  quantity: number;
  unit_price: number;
};

export function formatTZS(amount: number) {
  return (
    "TZS " +
    Math.round(amount)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  );
}

export function computeTotals(
  items: InvoiceLineItem[],
  applyVat: boolean,
  vatRate: number
) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.unit_price,
    0
  );
  const vatAmount = applyVat ? (subtotal * vatRate) / 100 : 0;
  const total = subtotal + vatAmount;
  return { subtotal, vatAmount, total };
}

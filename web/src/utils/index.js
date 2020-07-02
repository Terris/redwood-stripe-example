export const currency = (amount) => {
  amount = amount / 100
  return `$${amount.toFixed(2)}`
}

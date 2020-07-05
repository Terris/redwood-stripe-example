export const currency = (amount) => {
  amount = amount / 100
  return `$${amount.toFixed(2)}`
}

// token
// returns a random string of length
export const token = (length) =>
  [...Array(length)].map(() => (~~(Math.random() * 36)).toString(36)).join('')

export const currency = (amount) => {
  amount = amount / 100
  return `$${amount.toFixed(2)}`
}

// token
// returns a random string of length
export const token = (length) =>
  [...Array(length)].map(() => (~~(Math.random() * 36)).toString(36)).join('')

// recursive function to delete
export const siftObject = (obj, key) => {
  if (obj) {
    delete obj[key]
    for (let item in obj) {
      if (typeof obj[item] === 'object') {
        siftObject(obj[item], key)
      }
    }
  }
  return obj
}

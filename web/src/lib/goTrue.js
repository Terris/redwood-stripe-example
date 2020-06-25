import GoTrue from 'gotrue-js'

export const goTrue = new GoTrue({
  APIUrl: 'https://redwood-stripe-example.netlify.app/.netlify/identity',
  setCookie: true,
})

import GoTrue from 'gotrue-js'

export const goTrue = new GoTrue({
  APIUrl: 'https://redwood-gotrue-example.netlify.app/.netlify/identity',
  setCookie: true,
})

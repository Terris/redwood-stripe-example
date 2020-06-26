### Setup

Add your local database and Stripe configs to `.env` (see `.env.template`).

```terminal
yarn install
yarn redwood db up
yarn redwood dev
```

### Notes

- The stripehook Function recieves Stripe Webhook events.
- The user and customer api illustrate how we can "stitch" together a single graphql api together from different data sources.
  - Authentication is derived from Netlify/GoTrue
  - A database user record is created when the user successfully signs up.
  - And a Stripe customer is created via the Stripe api.
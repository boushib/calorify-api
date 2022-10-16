# Calorify

This is the backend API for _Calorify_ a simple application to track your calory intakes.

## Dependencies

- Node.js
- TypeScript
- PostgreSQL

## Dev Environment

### Environment variables

Create a `.env` file in your frontend root directly and include this environment variables.

```text
PORT=
DATABASE_URL=
DB_USER=
DB_HOST=
DB_PASSWORD=
DB_NAME=
DB_PORT=
```

### Run the app

Run the app in development mode. (Make sure your PostgreSQL instance is up and running)

```text
yarn dev
```

Builds the app for production

```text
yarn build
```

Run the application in production

```text
yarn start
```

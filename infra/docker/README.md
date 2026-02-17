# Local Database (Postgres)

This folder defines local infrastructure for development.

## Start Postgres

```bash
pnpm db:up
```

## Stop Postgres

```bash
pnpm db:down
```

## View logs

```bash
pnpm db:logs
```

The default connection string is:

`postgresql://postgres:postgres@localhost:5432/mobile_starter`

Use this value for `DATABASE_URL` (see `apps/api/.env.example`).

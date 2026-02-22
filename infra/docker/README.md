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

## Destroy Postgres data (destructive)

```bash
pnpm db:destroy
```

This removes the Postgres container and volume. All local DB data is deleted.

## Reset Postgres to a clean state

```bash
pnpm db:reset
```

This is equivalent to destroy + up. After reset, run migrations again.

## View logs

```bash
pnpm db:logs
```

The default connection string is:

`postgresql://postgres:postgres@localhost:5432/mobile_starter`

Use this value for `DATABASE_URL` (see `apps/api/.env.example`).

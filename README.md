# Mobile Starter

TypeScript monorepo starter for Expo mobile + Hono API.

## Database workflow

1. Start local Postgres:
   - `pnpm db:up`
2. Copy API envs:
   - `cp apps/api/.env.example apps/api/.env`
3. Generate migrations after schema changes:
   - `DATABASE_URL=postgresql://postgres:postgres@localhost:5432/mobile_starter pnpm db:generate`
4. Apply migrations:
   - `DATABASE_URL=postgresql://postgres:postgres@localhost:5432/mobile_starter pnpm db:migrate`
5. Seed demo data:
   - `DATABASE_URL=postgresql://postgres:postgres@localhost:5432/mobile_starter pnpm db:seed`
6. Open schema browser:
   - `DATABASE_URL=postgresql://postgres:postgres@localhost:5432/mobile_starter pnpm db:studio`

## Reset local database

- Reset to clean local state (deletes data): `pnpm db:reset`
- Remove container and volume only: `pnpm db:destroy`
- After reset/destroy+up, re-run migrations:
  - `DATABASE_URL=postgresql://postgres:postgres@localhost:5432/mobile_starter pnpm db:migrate`

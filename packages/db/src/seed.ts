import { db, pool, usersTable } from "./index.js";

async function seed() {
  await db
    .insert(usersTable)
    .values([
      {
        id: "user_demo_1",
        email: "demo@example.com",
        emailVerified: true,
      },
      {
        id: "user_demo_2",
        email: "hello@example.com",
        emailVerified: false,
      },
    ])
    .onConflictDoNothing();
}

seed()
  .then(async () => {
    console.log("Database seed completed.");
    await pool.end();
  })
  .catch(async (error) => {
    console.error("Database seed failed.", error);
    await pool.end();
    process.exit(1);
  });

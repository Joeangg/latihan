import { Elysia, t } from "elysia";
import { db } from "./db";
import { users } from "./db/schema";
import "dotenv/config";

const port = Number(process.env.PORT) || 3000;

const app = new Elysia()
  .get("/", () => ({
    status: "ok",
    message: "Elysia + Bun + Drizzle + MySQL API is running!",
    timestamp: new Date().toISOString(),
  }))
  .group("/api", (app) =>
    app
      .get("/health", () => ({ status: "healthy" }))
      .get("/users", async () => {
        try {
          const allUsers = await db.select().from(users);
          return { success: true, data: allUsers };
        } catch (error: any) {
          return { success: false, message: error.message };
        }
      })
      .post(
        "/users",
        async ({ body, set }) => {
          try {
            await db.insert(users).values({
              name: body.name,
              email: body.email,
            });
            set.status = 201;
            return { success: true, message: "User created" };
          } catch (error: any) {
            set.status = 500;
            return { success: false, message: error.message };
          }
        },
        {
          body: t.Object({
            name: t.String(),
            email: t.String({ format: "email" }),
          }),
        }
      )
  )
  .listen(port);

console.log(`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`);

export type App = typeof app;

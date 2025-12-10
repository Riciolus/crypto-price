/*
Why this structure?

Singleton pattern: ensures only ONE Redis connection is created for the whole server.
Prevents connection storms: Next.js can re-run server code, so without a singleton you’d accidentally open many Redis connections.
Consistent URL: local Redis container exposes port 6379.
*/

import { createClient } from "@redis/client";

let client: ReturnType<typeof createClient> | null = null;

export function getRedisClient() {
  if (!client) {
    client = createClient({ url: "redis://localhost:6379" });

    client.on("error", (err) => {
      console.error("Redis Client Error:", err);
    });

    client.connect();
  }

  return client;
}

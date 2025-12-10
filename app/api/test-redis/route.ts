import { NextResponse } from "next/server";
import { getRedisClient } from "@/lib/redis";

export async function GET() {
  const redis = getRedisClient();

  // Write to Redis
  await redis.set("test:key", "Hello from Redis");

  // Read back
  const value = await redis.get("test:key");

  return NextResponse.json({
    message: "Redis connection success",
    value,
  });
}

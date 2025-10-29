import { z } from "zod";

const envSchema = z.object({
  PORT: z.string().default("5000"),
  MONGODB_URI: z.string().min(1, "MongoDB URI is required"),
  JWT_SECRET: z.string().min(1, "JWT secret is required"),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

const env = envSchema.parse(Bun.env);

export const config = {
  port: env.PORT || 5000,
  mongodbUri: env.MONGODB_URI!,
  jwtSecret: env.JWT_SECRET!,
  nodeEnv: env.NODE_ENV || "development",

  // Validate required environment variables
  validate: () => {
    const required = ["MONGODB_URI", "JWT_SECRET"];
    required.forEach((key) => {
      if (!Bun.env[key]) {
        throw new Error(`Missing required environment variable: ${key}`);
      }
    });
  },
};

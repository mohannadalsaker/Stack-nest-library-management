import { z } from "zod";

const envSchema = z.object({
  VITE_BASE_URL: z.string(),
});

const env = envSchema.parse(import.meta.env);

export const config = {
  VITE_BASE_URL: env.VITE_BASE_URL,

  // Validate required environment variables
  validate: () => {
    const required = ["VITE_BASE_URL"];
    required.forEach((key) => {
      if (!import.meta.env[key]) {
        throw new Error(`Missing required environment variable: ${key}`);
      }
    });
  },
};

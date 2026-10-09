import { config } from 'dotenv';
import { z } from 'zod';

config();

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  
  // Database
  DB_URI: z.string().min(1, 'DB_URI is required'),
  DB_NAME: z.string().min(1, 'DB_NAME is required'),
  
  // Client URL
  CLIENT_URL: z.string('CLIENT_URL must be a valid URL'),
  
  // JWT
  ACCESS_TOKEN_EXPIRE_IN: z.string().default('15m'),
  REFRESH_TOKEN_EXPIRE_IN: z.string().default('7d'),
  JWT_ACCESS_SECRET: z.string().min(1, 'JWT_ACCESS_SECRET is required'),
  JWT_REFRESH_SECRET: z.string().min(1, 'JWT_REFRESH_SECRET is required'),
});

// Safely parse process.env with pretty error logging on missing variables
const parseEnv = () => {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error('❌ Invalid or missing environment variables:');
    console.error(JSON.stringify(result.error.flatten().fieldErrors, null, 2));
    process.exit(1);
  }

  return result.data;
};

const ENV = parseEnv();
export type Env = z.infer<typeof envSchema>;
export default ENV;
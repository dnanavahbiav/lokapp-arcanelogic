import dotenv from 'dotenv';
import path from 'path';

// Load .env from server/ root (one level up from src/config/)
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const config = {
    port: parseInt(process.env.PORT || '5000', 10),
    nodeEnv: process.env.NODE_ENV || 'development',
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',

    // Database
    databaseUrl: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/lokapp',

    // JWT
    jwtSecret: process.env.JWT_SECRET || 'lokapp-dev-secret-change-in-production',
    jwtExpiry: process.env.JWT_EXPIRY || '7d',
};

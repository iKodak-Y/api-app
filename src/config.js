import { config } from "dotenv";
config();

export const DB_HOST = process.env.BD_HOST || "localhost";
export const DB_DATABASE = process.env.BD_DATABASE || "base2025";
export const DB_USER = process.env.BD_USER || "root";
export const DB_PASSWORD = process.env.BD_PASSWORD || "admin";
export const DB_PORT = process.env.BD_PORT || 3306;
export const PORT = process.env.PORT || 3000;

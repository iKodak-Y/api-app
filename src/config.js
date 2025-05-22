import { config } from "dotenv";
config();

export const DB_HOST = process.env.BD_HOST || "mysql.railway.internal";
export const DB_DATABASE = process.env.BD_DATABASE || "railway";
export const DB_USER = process.env.BD_USER || "root";
export const DB_PASSWORD = process.env.BD_PASSWORD || "iaVXlcIoysGlOSiZPwHTSGLixHHeLpUf";
export const DB_PORT = process.env.BD_PORT || 3306;
export const PORT = process.env.PORT || 3000;

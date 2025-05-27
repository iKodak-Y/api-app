import jwt from "jsonwebtoken";
import { conmysql } from "./bd.js";

const SECRET_KEY = process.env.SECRET_KEY || ".KodakaYagual+";

export const generarToken = (usuario) => {
  return jwt.sign(
    { id: usuario.usr_id, usuario: usuario.usr_usuario },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
};

export const verificarToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token)
    return res.status(401).json({ message: "No se proporcionó token" });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Token inválido" });
    req.user = decoded;
    next();
  });
};

export const login = async (req, res) => {
  try {
    console.log("Intento de login recibido.");
    console.log("Origen de la solicitud:", req.headers.origin); // Muy importante
    console.log("Headers completos:", JSON.stringify(req.headers, null, 2));
    console.log("Cuerpo de la solicitud (body):", req.body);

    // Verificar que los datos no estén vacíos
    if (!req.body || !req.body.usr_usuario || !req.body.usr_clave) {
      return res.status(400).json({ message: "Datos incompletos" });
    }

    const { usr_usuario, usr_clave } = req.body;

    // Primero, buscamos solo por usuario para verificar si existe
    const [checkUser] = await conmysql.query(
      "SELECT * FROM usuarios WHERE usr_usuario = ?",
      [usr_usuario]
    );

    console.log("Usuarios encontrados:", checkUser.length);

    if (checkUser.length === 0) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    // Luego verificamos la contraseña
    const [result] = await conmysql.query(
      "SELECT * FROM usuarios WHERE usr_usuario = ? AND usr_clave = ?",
      [usr_usuario, usr_clave]
    );

    console.log("Autenticación exitosa:", result.length > 0);

    if (result.length === 0)
      return res.status(401).json({ message: "Contraseña incorrecta" });

    const token = generarToken(result[0]);
    res.json({ token });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

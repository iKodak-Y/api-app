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
  const authHeader = req.headers["authorization"];
  console.log("Authorization header:", authHeader);

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "No se proporcionó header de autorización" });
  }

  const token = authHeader.split(" ")[1];
  console.log("Token extraído:", token);

  if (!token) {
    return res
      .status(401)
      .json({ message: "No se proporcionó token en el formato correcto" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error("Error verificando token:", err);
      return res
        .status(401)
        .json({ message: "Token inválido", error: err.message });
    }
    console.log("Token verificado correctamente:", decoded);
    req.user = decoded;
    next();
  });
};

// Middleware opcional - permite acceso sin token
export const verificarTokenOpcional = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    console.log("Sin token - acceso como usuario anónimo");
    return next();
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    console.log("Header mal formateado - acceso como usuario anónimo");
    return next();
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log("Token inválido - acceso como usuario anónimo");
      return next();
    }
    req.user = decoded;
    next();
  });
};

export const login = async (req, res) => {
  try {
    console.log("Datos recibidos:", req.body);

    if (!req.body || !req.body.usr_usuario || !req.body.usr_clave) {
      return res.status(400).json({ message: "Datos incompletos" });
    }

    const { usr_usuario, usr_clave } = req.body;

    const [checkUser] = await conmysql.query(
      "SELECT * FROM usuarios WHERE usr_usuario = ?",
      [usr_usuario]
    );

    console.log("Usuarios encontrados:", checkUser.length);

    if (checkUser.length === 0) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    const [result] = await conmysql.query(
      "SELECT * FROM usuarios WHERE usr_usuario = ? AND usr_clave = ?",
      [usr_usuario, usr_clave]
    );

    console.log("Autenticación exitosa:", result.length > 0);

    if (result.length === 0) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = generarToken(result[0]);
    console.log("Token generado:", token);
    res.json({ token });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

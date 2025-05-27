import express from "express";
import { fileURLToPath } from "url";
import cors from "cors";
//para subir imagenes
import path from "path";

//rutas
import clientesRoutes from "./routes/clientes.routes.js";
import pedidosRoutes from "./routes/pedidos.routes.js";
import pedidosdetalleRoutes from "./routes/pedidosdetalle.routes.js";
import productoRoutes from "./routes/productos.routes.js";
import usuariosRoutes from "./routes/usuarios.routes.js";

//definir los modulos de entrada
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const cors = require('cors');
const allowedOrigins = [
  'capacitor://localhost',
  'ionic://localhost', // Otro posible scheme para Ionic
  'http://localhost',
  'http://localhost:8100', // Para ionic serve con live reload
  'https://api-app-x596.onrender.com' // Si tu frontend PWA se sirve desde el mismo dominio o quieres permitirlo
  // Añade aquí el dominio de tu app web desplegada si es diferente
];

//definir los permisos de CORS - CORREGIDO
/*const corsOptions = {
  origin: '*' /* ["http://localhost:8100", "http://192.168.1.12:8100"], // Permite tu aplicación Ionic
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], // Añadido OPTIONS para preflight
  allowedHeaders: ["Content-Type", "Authorization"], // Añadido Authorization para tu JWT
  //credentials: true, // Permite credenciales
  maxAge: 86400, // Caché de preflight por 24 horas}; */

const corsOptions = {
  origin: (origin, callback) => {
    // Permitir solicitudes sin 'origin' (como Postman o apps móviles si no envían Origin)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`El origen ${origin} no está permitido por CORS`));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'], // Asegúrate de incluir todos los métodos que usas
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'], // Añade cualquier cabecera personalizada que uses
  credentials: true // Si planeas usar cookies o sesiones a través de dominios (requiere Access-Control-Allow-Origin no sea '*')
                  // Si pones credentials: true, el origin no puede ser '*' tiene que ser específico.
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json()); //interpreta objetos json
app.use(express.urlencoded({ extended: true })); //se añade para poder reseptar formularios
app.use("/uploads", express.static(path.join(__dirname, "../uploads"))); //direccion donde se guarda

// indicar que rutas voy a usar
app.use("/api", clientesRoutes);
app.use("/api", pedidosRoutes);
app.use("/api", pedidosdetalleRoutes);
app.use("/api", productoRoutes);
app.use("/api", usuariosRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    message: "Endpoint not found",
  });
});

app.use((err, req, res, next) => {
  if (err.message.includes('no está permitido por CORS')) {
    console.error('Error de CORS:', err.message);
    return res.status(403).json({ message: err.message });
  }
  next(err);
});

export default app; // exportar la app para usarla en otro lado

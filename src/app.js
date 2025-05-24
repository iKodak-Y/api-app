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

//definir los permisos de CORS - CORREGIDO
const corsOptions = {
  origin: [
    "http://localhost:8100",
    "http://192.168.1.12:8100",
    "http://localhost", // <--- AÑADE ESTA LÍNEA
    "capacitor://localhost", // <--- AÑADE ESTA LÍNEA (común para Capacitor en Android/iOS)
    // También podrías considerar "ionic://localhost" si usas Ionic-native en algunos casos
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  //credentials: true,
  maxAge: 86400,
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

export default app; // exportar la app para usarla en otro lado

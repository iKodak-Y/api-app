import { Router } from "express";
import {
  getClientes,
  getCliente,
  postCliente,
  putCliente,
  patchCliente,
  deleteCliente,
} from "../controllers/clientes.controllers.js";
import { verificarToken } from "../auth.js";

const router = Router();

// Aplicar verificarToken a las rutas que necesiten autenticación
router.get("/cliente", verificarToken, getClientes);
router.get("/cliente/:id", verificarToken, getCliente);
router.post("/cliente", verificarToken, postCliente);
router.put("/cliente/:id", verificarToken, putCliente);
router.patch("/cliente/:id", verificarToken, patchCliente);
router.delete("/cliente/:id", verificarToken, deleteCliente);

export default router;
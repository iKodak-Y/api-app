import { Router } from "express";
import {
  getClientes,
  getCliente,
  postCliente,
  putCliente,
  patchCliente,
  deleteCliente,
} from "../controllers/clientes.controllers.js";

const router = Router();

router.get("/cliente", getClientes);
router.get("/cliente/:id", getCliente);
router.post("/cliente", postCliente);
router.put("/cliente/:id", putCliente);
router.patch("/cliente/:id", patchCliente);
router.delete("/cliente/:id", deleteCliente);

export default router;

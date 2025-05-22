import { Router } from "express";
import { getUsuarios, getUsuariosID, postUsuario, putUsuario, patchUsuario, deleteUsuario } from "../controllers/usuarios.controllers.js";
import { verificarToken, login } from '../auth.js';

const router = Router();

router.post("/login", login);
router.get("/usuarios", getUsuarios);
router.get("/usuarios/:id", getUsuariosID);
router.post("/usuarios", postUsuario);
router.put("/usuarios/:id", putUsuario);
router.patch("/usuarios/:id", patchUsuario);
router.delete("/usuarios/:id", deleteUsuario);

export default router;
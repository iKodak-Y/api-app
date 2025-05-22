import { Router } from "express";
import {
  getPedidos,
  getPedidosID,
  postPedidos,
  putPedido,
  patchPedido,
  deletePedido,
} from "../controllers/pedidos.controllers.js";

const router = Router();

router.get("/pedidos", getPedidos);
router.get("/pedidos/:id", getPedidosID);
router.post("/pedidos", postPedidos);
router.put("/pedidos/:id", putPedido);
router.patch("/pedidos/:id", patchPedido);
router.delete("/pedidos/:id", deletePedido);

export default router;

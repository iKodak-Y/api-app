import { Router } from 'express';
import { getPedidosDetalles, getPedidosdetalleID, postPedidosdetalle, putPedidosdetalle, patchPedidosdetalle, deletePedidosdetalleID } from '../controllers/pedidosdetalle.controllers.js';

const router = Router();

router.get("/pedidosdetalle", getPedidosDetalles);
router.get("/pedidosdetalle/:id", getPedidosdetalleID);
router.post("/pedidosdetalle", postPedidosdetalle);
router.put("/pedidosdetalle/:id", putPedidosdetalle);
router.patch("/pedidosdetalle/:id", patchPedidosdetalle);
router.delete("/pedidosdetalle/:id", deletePedidosdetalleID);

export default router;
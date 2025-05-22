import { Router } from "express";
import multer from "multer";
import {
  getProductos,
  getProductosID,
  postProducto,
  putProductos,
  patchProductos,
  deleteProducto,
} from "../controllers/productos.controllers.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const router = Router();

router.get("/productos", getProductos);
router.get("/productos/:id", getProductosID);
router.post("/productos", upload.single("prod_imagen"), postProducto);
router.put("/productos/:id", upload.single("prod_imagen"), putProductos);
router.patch("/productos/:id", upload.single("prod_imagen"), patchProductos);
router.delete("/productos/:id", deleteProducto);

export default router;

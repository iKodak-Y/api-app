import { conmysql } from "../bd.js";

export const getPedidosDetalles = async (req, res) => {
  try {
    const [result] = await conmysql.query("select * from pedidos_detalle");
    res.json({ cant: result.length, data: result });
  } catch (error) {
    return res.status(500).json({ message: " error en el servidor" });
  }
};

export const getPedidosdetalleID = async (req, res) => {
  try {
    const [result] = await conmysql.query(
      "select * from pedidos_detalle where det_id=?",
      [req.params.id]
    );
    if (result.length <= 0)
      return res.status(400).json({
        det_id: 0,
        message: "Pedidodetalle no encontrado",
      });
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: " error en el servidor" });
  }
};

export const postPedidosdetalle = async (req, res) => {
  try {
    const { prod_id, ped_id, det_cantidad, det_precio } = req.body;
    // Asegurarse de que los valores sean del tipo correcto
    const detalleData = {
      prod_id: parseInt(prod_id),
      ped_id: parseInt(ped_id),
      det_cantidad: parseInt(det_cantidad),
      det_precio: parseFloat(det_precio),
    };

    const [result] = await conmysql.query(
      "INSERT INTO pedidos_detalle(prod_id, ped_id, det_cantidad, det_precio) VALUES (?,?,?,?)",
      [
        detalleData.prod_id,
        detalleData.ped_id,
        detalleData.det_cantidad,
        detalleData.det_precio,
      ]
    );
    res.json({
      id: result.insertId,
      message: "Detalle de pedido creado exitosamente",
    });
  } catch (error) {
    console.error("Error al crear detalle de pedido:", error);
    return res.status(500).json({
      message: "Error al crear el detalle del pedido: " + error.message,
    });
  }
};

export const putPedidosdetalle = async (req, res) => {
  try {
    const { id } = req.params;
    const { prod_id, ped_id, det_cantidad, det_precio } = req.body;
    const [result] = await conmysql.query(
      "UPDATE pedidos_detalle SET prod_id=?,ped_id=?,det_cantidad=?,det_precio=? WHERE det_id=?",
      [prod_id, ped_id, det_cantidad, det_precio, id]
    );
    if (result.length <= 0)
      return res.status(404).json({
        message: "Pedidodetalle no encontrado",
      });
    const [row] = await conmysql.query(
      "select * from pedidos_detalle where det_id=?",
      [id]
    );
    res.json(row[0]);
  } catch (error) {
    return res.status(500).json({ message: " error en el servidor" });
  }
};

export const patchPedidosdetalle = async (req, res) => {
  try {
    const { id } = req.params;
    const { prod_id, ped_id, det_cantidad, det_precio } = req.body;
    const [result] = await conmysql.query(
      "UPDATE pedidos_detalle SET prod_id=IFNULL(?,prod_id),ped_id=IFNULL(?,ped_id),det_cantidad=IFNULL(?,det_cantidad),det_precio=IFNULL(?,det_precio) WHERE det_id=?",
      [prod_id, ped_id, det_cantidad, det_precio, id]
    );
    if (result.length <= 0)
      return res.status(404).json({
        message: "Pedidodetalle no encontrado",
      });
    const [row] = await conmysql.query(
      "select * from pedidos_detalle where det_id=?",
      [id]
    );
    res.json(row[0]);
  } catch (error) {
    return res.status(500).json({ message: " error en el servidor" });
  }
};

export const deletePedidosdetalleID = async (req, res) => {
  try {
    const [result] = await conmysql.query(
      "delete from pedidos_detalle where det_id=?",
      [req.params.id]
    );
    if (result.length <= 0)
      return res.status(400).json({
        message: "Pedidodetalle no encontrado",
      });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: " error en el servidor" });
  }
};

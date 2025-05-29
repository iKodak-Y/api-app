import { conmysql } from "../bd.js";

export const getPedidos = async (req, res) => {
  try {
    const [result] = await conmysql.query("select * from pedidos");
    res.json({ cant: result.length, data: result });
  } catch (error) {
    return res.status(500).json({ message: " error en el servidor" });
  }
};

export const getPedidosID = async (req, res) => {
  try {
    const [result] = await conmysql.query(
      "select * from pedidos where ped_id=?",
      [req.params.id]
    );
    if (result.length <= 0)
      return res.status(400).json({
        ped_id: 0,
        message: "Pedido no encontrado",
      });
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: " error en el servidor" });
  }
};

export const postPedidos = async (req, res) => {
  try {
    const { cli_id, ped_fecha, usr_id, ped_estado } = req.body;
    // Asegurarse de que los valores sean del tipo correcto
    const pedidoData = {
      cli_id: parseInt(cli_id),
      ped_fecha,
      usr_id: parseInt(usr_id),
      ped_estado: parseInt(ped_estado),
    };

    const [result] = await conmysql.query(
      "INSERT INTO pedidos(cli_id, ped_fecha, usr_id, ped_estado) VALUES (?,?,?,?)",
      [
        pedidoData.cli_id,
        pedidoData.ped_fecha,
        pedidoData.usr_id,
        pedidoData.ped_estado,
      ]
    );
    res.json({
      id: result.insertId,
      message: "Pedido creado exitosamente",
    });
  } catch (error) {
    console.error("Error al crear pedido:", error);
    return res.status(500).json({
      message: "Error al crear el pedido: " + error.message,
    });
  }
};

export const putPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const { cli_id, ped_fecha, usr_id, ped_estado } = req.body;
    const [result] = await conmysql.query(
      "UPDATE pedidos SET cli_id=?,ped_fecha=?,usr_id=?,ped_estado=? WHERE ped_id=?",
      [cli_id, ped_fecha, usr_id, ped_estado, id]
    );
    if (result.length <= 0)
      return res.status(404).json({
        message: "Pedido no encontrado",
      });
    const [row] = await conmysql.query("select * from pedidos where ped_id=?", [
      id,
    ]);
    res.json(row[0]);
  } catch (error) {
    return res.status(500).json({ message: " error en el servidor" });
  }
};

export const patchPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const { cli_id, ped_fecha, usr_id, ped_estado } = req.body;
    const [result] = await conmysql.query(
      "UPDATE pedidos SET cli_id=IFNULL(?,cli_id),ped_fecha=IFNULL(?,ped_fecha),usr_id=IFNULL(?,usr_id),ped_estado=IFNULL(?,ped_estado) WHERE ped_id=?",
      [cli_id, ped_fecha, usr_id, ped_estado, id]
    );
    if (result.length <= 0)
      return res.status(404).json({
        message: "Pedido no encontrado",
      });
    const [row] = await conmysql.query("select * from pedidos where ped_id=?", [
      id,
    ]);
    res.json(row[0]);
  } catch (error) {
    return res.status(500).json({ message: " error en el servidor" });
  }
};

export const deletePedido = async (req, res) => {
  try {
    const [result] = await conmysql.query(
      "delete from pedidos where ped_id=?",
      [req.params.id]
    );
    if (result.length <= 0)
      return res.status(400).json({
        message: "Pedido no encontrado",
      });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: " error en el servidor" });
  }
};

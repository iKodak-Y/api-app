import { conmysql } from "../bd.js";

export const getClientes = async (req, res) => {
  try {
    const [result] = await conmysql.query("SELECT * FROM clientes");
    res.json({ cant: result.length, data: result });
  } catch (error) {
    return res.status(500).json({
      message: "Error en el servidor",
    });
  }
};

// Obtener un cliente por ID
export const getCliente = async (req, res) => {
  try {
    // const {id} = req.params.id;
    const [result] = await conmysql.query(
      `SELECT * FROM clientes WHERE cli_id = ?`,
      [req.params.id]
    );
    if (result.length <= 0)
      return res.status(404).json({
        cli_id: 0,
        message: "No existe el cliente",
      });
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Error en el servidor",
    });
  }
};

// Funcion para insertar un cliente
export const postCliente = async (req, res) => {
  try {
    const {
      cli_identificacion,
      cli_nombre,
      cli_telefono,
      cli_correo,
      cli_direccion,
      cli_pais,
      cli_ciudad,
    } = req.body;

    const [result] = await conmysql.query(
      `INSERT INTO clientes(cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad)
       VALUES (? , ?, ?, ?, ?, ?, ?)`,
      [
        cli_identificacion,
        cli_nombre,
        cli_telefono,
        cli_correo,
        cli_direccion,
        cli_pais,
        cli_ciudad,
      ]
    );
    res.send({
      cli_id: result.insertId,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error en el servidor",
    });
  }
};

// Funcion para modificar un cliente
export const putCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      cli_identificacion,
      cli_nombre,
      cli_telefono,
      cli_correo,
      cli_direccion,
      cli_pais,
      cli_ciudad,
    } = req.body;

    const [result] = await conmysql.query(
      `UPDATE clientes set cli_identificacion = ?, cli_nombre = ?,  cli_telefono = ?, cli_correo = ?, cli_direccion = ?, cli_pais = ?, cli_ciudad = ? WHERE cli_id = ?`,
      [
        cli_identificacion,
        cli_nombre,
        cli_telefono,
        cli_correo,
        cli_direccion,
        cli_pais,
        cli_ciudad,
        id,
      ]
    );
    if (result.affectedRows <= 0)
      return res.status(404).json({
        message: "No existe el cliente",
      });
    const [row] = await conmysql.query(
      `SELECT * FROM clientes WHERE cli_id = ?`,
      [id]
    );
    res.json(row[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Error en el servidor",
    });
  }
};

// Funcion para modificar parcialmente un cliente
export const patchCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      cli_identificacion,
      cli_nombre,
      cli_telefono,
      cli_correo,
      cli_direccion,
      cli_pais,
      cli_ciudad,
      cli_estado
    } = req.body;

    const [result] = await conmysql.query(
      `UPDATE clientes set cli_identificacion = IFNULL(? , cli_identificacion), cli_nombre = IFNULL(?, cli_nombre) ,  cli_telefono = IFNULL(?, cli_telefono), cli_correo = IFNULL(?, cli_correo), cli_direccion = IFNULL(?, cli_direccion), cli_pais = IFNULL(?, cli_pais), cli_ciudad = IFNULL(?, cli_ciudad), cli_estado = IFNULL(?, cli_estado) WHERE cli_id = ?`,
      [
        cli_identificacion,
        cli_nombre,
        cli_telefono,
        cli_correo,
        cli_direccion,
        cli_pais,
        cli_ciudad,
        cli_estado,
        id,
      ]
    );
    if (result.affectedRows <= 0)
      return res.status(404).json({
        message: "No existe el cliente",
      });
    const [row] = await conmysql.query(
      `SELECT * FROM clientes WHERE cli_id = ?`,
      [id]
    );
    res.json(row[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Error en el servidor",
    });
  }
};

// Funcion para eliminar un cliente (teoria)
export const deleteCliente = async (req, res) => {
  try {
    const [result] = await conmysql.query(
      `DELETE FROM clientes WHERE cli_id = ?`,
      [req.params.id]
    );
    if (result.length <= 0)
      return res.status(404).json({
        message: "No existe el cliente",
      });
    res.sendStatus(204); // 204 No Content
  } catch (error) {
    return res.status(500).json({
      message: "Error en el servidor",
    });
  }
};

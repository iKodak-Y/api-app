import {conmysql} from '../bd.js'

export const getProductos = async (req,res)=>{
    try {
        const [result] = await conmysql.query('select * from productos')
        res.json({cant: result.length, data:result})
    } catch (error) {
        return res.status(500).json({message:" error en el servidor"})
    }
}

export const getProductosID = async (req,res)=>{
    try {
        const [result] = await conmysql.query('select * from productos where prod_id=?', [req.params.id])
        if(result.length<=0) return res.status(400).json({
            det_id : 0,
            message : "Producto no encontrado"
        })
        res.json(result[0])
    } catch (error) {
        return res.status(500).json({message:" error en el servidor"})
    }
}

export const postProducto = async (req,res)=>{
    try {
        const {prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo} = req.body
        const prod_imagen = req.file ? `/uploads/${req.file.filename}` : null;
        console.log("Datos del producto: ", req.body);
        console.log("Archivo imagen; ",req.file);
        const [result] = await conmysql.query(
            'INSERT INTO productos(prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen) VALUES (?,?,?,?,?,?)', 
            [prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen])
    } catch (error) {
        return res.status(500).json({message:error})
    }
}

export const putProductos = async (req,res)=>{
    try {
        const {id} = req.params
        const {prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo} = req.body
        const prod_imagen = req.file ? `/uploads/${req.file.filename}` : null;
        const [result] = await conmysql.query(
            'UPDATE productos SET prod_codigo=?,prod_nombre=?,prod_stock=?,prod_precio=?,prod_activo=?,prod_imagen=? WHERE prod_id =?', 
            [prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen, id])
        if(result.length<=0) return res.status(404).json({
            message : "Producto no encontrado"
        })
         const [row] = await conmysql.query('select * from productos where prod_id=?', [id])
         res.json(row[0])
    } catch (error) {
        return res.status(500).json({message:" error en el servidor"})
    }
}

export const patchProductos = async (req,res)=>{
    try {
        const {id} = req.params
        const {prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo} = req.body
        const prod_imagen = req.file ? `/uploads/${req.file.filename}` : null;
        const [result] = await conmysql.query(
            'UPDATE productos SET prod_codigo=IFNULL(?,prod_codigo),prod_nombre=IFNULL(?,prod_nombre),prod_stock=IFNULL(?,prod_stock),prod_precio=IFNULL(?,prod_precio),prod_activo=IFNULL(?,prod_activo),prod_imagen=IFNULL(?,prod_imagen) WHERE prod_id =?', 
            [prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen, id])
        if(result.length<=0) return res.status(404).json({
            message : "Producto no encontrado"
        })
         const [row] = await conmysql.query('select * from productos where prod_id=?', [id])
         res.json(row[0])
    } catch (error) {
        return res.status(500).json({message:" error en el servidor"})
    }
}

export const deleteProducto = async (req,res)=>{
    try {
        const [result] = await conmysql.query('delete from productos where prod_id=?', [req.params.id])
        if(result.length<=0) return res.status(400).json({
            message : "Producto no encontrado"
        })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({message:" error en el servidor"})
    }
}
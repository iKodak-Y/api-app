import {conmysql} from '../bd.js'

export const getUsuarios = async (req,res)=>{
    try {
        const [result] = await conmysql.query('select * from usuarios')
        res.json({cant: result.length, data:result})
    } catch (error) {
        return res.status(500).json({message:" error en el servidor"})
    }
}

export const getUsuariosID = async (req,res)=>{
    try {
        const [result] = await conmysql.query('select * from usuarios where usr_id=?', [req.params.id])
        if(result.length<=0) return res.status(400).json({
            det_id : 0,
            message : "Usuario no encontrado"
        })
        res.json(result[0])
    } catch (error) {
        return res.status(500).json({message:" error en el servidor"})
    }
}

export const postUsuario = async (req,res)=>{
    try {
        const {usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo} = req.body
        const [result] = await conmysql.query(
            'INSERT INTO usuarios(usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo) VALUES (?,?,?,?,?,?)', 
            [usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo])
        res.send({
            id: result.insertId
        })
    } catch (error) {
        return res.status(500).json({message:" error en el servidor"})
    }
}

export const putUsuario = async (req,res)=>{
    try {
        const {id} = req.params
        const {usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo} = req.body
        const [result] = await conmysql.query(
            'UPDATE usuarios SET usr_usuario=?,usr_clave=?,usr_nombre=?,usr_telefono=?,usr_correo=?,usr_activo=? WHERE usr_id =?', 
            [usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo, id])
        if(result.length<=0) return res.status(404).json({
            message : "Usuario no encontrado"
        })
         const [row] = await conmysql.query('select * from usuarios where usr_id=?', [id])
         res.json(row[0])
    } catch (error) {
        return res.status(500).json({message:" error en el servidor"})
    }
}

export const patchUsuario = async (req,res)=>{
    try {
        const {id} = req.params
        const {usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo} = req.body
        const [result] = await conmysql.query(
            'UPDATE usuarios SET usr_usuario=IFNULL(?,usr_usuario),usr_clave=IFNULL(?,usr_clave),usr_nombre=IFNULL(?,usr_nombre),usr_telefono=IFNULL(?,usr_telefono),usr_correo=IFNULL(?,usr_correo),usr_activo=IFNULL(?,usr_activo) WHERE usr_id =?', 
            [usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo, id])
        if(result.length<=0) return res.status(404).json({
            message : "Usuario no encontrado"
        })
         const [row] = await conmysql.query('select * from usuarios where usr_id=?', [id])
         res.json(row[0])
    } catch (error) {
        return res.status(500).json({message:" error en el servidor"})
    }
}

export const deleteUsuario = async (req,res)=>{
    try {
        const [result] = await conmysql.query('delete from usuarios where usr_id=?', [req.params.id])
        if(result.length<=0) return res.status(400).json({
            message : "Usuario no encontrado"
        })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({message:" error en el servidor"})
    }
}
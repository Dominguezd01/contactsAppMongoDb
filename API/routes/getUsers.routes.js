const express= require("express")
const rooter = express.Router()
const usuario = require("../models/usuario.js")

rooter.get("/", async (req, res)=>{
    const data = await usuario.find()
    if(data){
        res.json(data)
    }else{
        res.send({status:"Hay algo mal en el server"})
    }
})

rooter.post("/insertUser", async (req,res)=>{
    const datosUsuario = {
        id_al: Number(req.body.id_al),
        nombre: req.body.nombre,
        edad: Number(req.body.edad),
        id_curso: Number(req.body.id_curso)
    }
    let resultado = await usuario.find({id_al:datosUsuario.id_al})
    if(resultado.length == 0){
        usuario.collection.insertOne(datosUsuario)
    }else{
        res.send({status: "Ya hay un usuario con este ID"})
    }
})

rooter.post("/deleteUser", (req, res) =>{
    const datosUsuario = {
        id_al: Number(req.body.id_al)
    }

    usuario.collection.deleteOne({id_al: datosUsuario.id_al})
})

rooter.post("/updateUser", (req, res) =>{
    const datosUsuario = {
        id_al: Number(req.body.id_al),
        nombre: req.body.nombre,
        edad: Number(req.body.edad),
        id_curso: Number(req.body.id_curso)
    }
    let resultado = usuario.collection.updateOne({id_al: datosUsuario.id_al}, {$set:{
        nombre: datosUsuario.nombre,
        edad: datosUsuario.edad,
        id_curso: datosUsuario.id_curso
    }})
})

module.exports = rooter
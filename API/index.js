const express = require('express')
const app = express()
const mysql = require('mysql')
const bp = require('body-parser')
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

let conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    port: 3306,
    database: "ciclos"
})

conexion.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});


app.post('/', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    res.set("Content-Type", "application/json")
    añadirUsuario(req.body)
})

app.get('/', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    conexion.query("select * from alumno;", (error, results, fields) =>{
        if(error){
            return console.log("algo salio mal: "+ error)
        }
          res.send(results)  
     })
})

app.post("/delete",(req, res)=>{
    res.set('Access-Control-Allow-Origin', '*')
    deleteUser(req.body)
    res.send({status: "Correct"})
})

app.post("/update", (req, res)=>{
    res.set('Access-Control-Allow-Origin', '*')
    updateUser(req.body)
    res.send({status: "Correct"})
})
const añadirUsuario=(body)=>{
    if(body != undefined){
        let nombre = body.nombre
        let edad = body.edad
        let id_al = body.id_al
        let id_curso = body.id_curso
        //let sqlQ = `INSERT INTO alumno (id_al, nombre, edad, id_curso)`+` VALUES(${id_al}, ${nombre}, ${edad}, ${id_curso})`;
        //let nTostring = nombre.toString()
        //console.log(nTostring)
       if(queryInsertar(nombre, edad,id_al,id_curso)){
            return true
       }
    } 
}
const queryInsertar =(nombre, edad,id_al,id_curso)=>{
    let sqlQuery = `INSERT INTO alumno(id_al, nombre, id_curso, edad ) VALUES(${id_al},"${nombre}", ${id_curso}, ${edad})`
    conexion.query(sqlQuery),(error, results, fields) =>{
        if(error){
            return "error"
        }else{
            return true
        }
        //res.send(results)
     }
}
const deleteUser = (body) =>{
    let idAlumno = body.id_al
    conexion.query(`DELETE FROM alumno WHERE id_al=${idAlumno}`),(error, results, fields) =>{
        if(error){
            console.log("algo salio mal: "+ error)
        }
        res.send("Done")
     }
}

const updateUser = (body) =>{
    console.log(body)
    let sentenciaSql = 
    `UPDATE alumno SET nombre = "${body.nombre}", edad = ${body.edad}, id_curso = ${body.idCurso} WHERE id_al = ${body.id_al};`
    conexion.query(sentenciaSql, (error, results, field) =>{
        if(error){
            console.log("algo salio mal: "+ error)
        }
       
    })

}
app.listen(3001)
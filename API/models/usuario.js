const mongoosse = require("mongoose")
const {Schema} = mongoosse

const usuario = new Schema({
    id_al:{type: Number, required:true},
    nombre:{type: String, required:true},
    edad:{type: Number, required:true},
    id_curso:{type: Number, required:true}
})

module.exports = mongoosse.model("alumno", usuario)
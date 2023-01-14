
const mongoosse = require("mongoose")

const conn = mongoosse.connect("mongodb://localhost:27017/ciclos")
        .then(db => console.log("Funxiono"))

module.exports = conn;
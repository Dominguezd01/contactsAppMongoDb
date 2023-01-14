const express = require('express')
const app = express()
const morgan = require("morgan")
const conn = require("./database")

// MIDDLEWARES
app.use(express.json())

app.use(morgan('dev'))



app.use("/", require("./routes/getUsers.routes.js"))
app.use("/insertUser", require("./routes/getUsers.routes"))
app.use("/deleteUser", require("./routes/getUsers.routes"))



app.listen(3001)
const express = require("express")
let routerLogin = express.Router()
let users = require("../data/users")

// Librería externa a node para crear y abrir tokens
let jwt = require("jsonwebtoken")

routerLogin.post("/", (req, res) => {
    let email = req.body.email
    let password = req.body.password

    let user = users.find(user => user.password == password && user.email == email)

    if(user == undefined){
        return res.status(401).json({error: "Invalid email or password for the user"})
    }

    /* Se firma la informacion pasada como 1er parametro en 'sign()'
    Creamos (firmamos) el token criptográficamente con una clave (2do param) */
    let apiKey = jwt.sign({
        email:user.email,
        id: user.id,
        time:Date.now()
    }, "secret")

    res.json({apiKey : apiKey})
})


module.exports = routerLogin
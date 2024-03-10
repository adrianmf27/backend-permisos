const express = require("express")
const routerPermissions = express.Router()
let permissions = require("../data/permissions")

/* Para consultar información --> get
Para agregar información --> post */


routerPermissions.get("/", (req, res) => {
    res.json(permissions)
})

routerPermissions.post("/", (req, res) => {
    let text = req.body.text
    let userId = req.body.userId
    let lastID = permissions[permissions.length - 1].id

    permissions.push({
        id: lastID + 1, 
        text: text, 
        approbedBy: [], 
        userId: userId
    })

    /* Se devuelve un obj json con el último elemento añadido */
    res.json({id: lastID + 1}) 
})


module.exports = routerPermissions
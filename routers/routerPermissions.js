const express = require("express")
const routerPermissions = express.Router()
let permissions = require("../data/permissions")

// Librería externa a node para crear y abrir tokens
let jwt = require("jsonwebtoken")

/* Para consultar información --> get
Para agregar información --> post */

routerPermissions.get("/", (req, res) => {
    res.json(permissions)
})

routerPermissions.post("/", (req, res) => {
    let text = req.body.text
    
    if(text == undefined){
        return res.status(400).json({errors: errors})
    }

    permissions.push({
        id: lastID + 1, 
        text: text, 
        approbedBy: [], 
        userId: req.infoApiKey.id
    })

    /* Se devuelve un obj json con el último elemento añadido */
    res.json({id: lastID + 1}) 
})


/* PUT --> modificar datos ya creados */
routerPermissions.put("/:id/approbedBy", (req, res) => {
    let user = users.find( u => u.id == req.infoApiKey.id)
    
    if (user.role != "admin"){
        return res.status(401).json({error:"User not and admin"})
    }

    permissions.approbedBy.push(user.userID)
    res.json(permission)
})


routerPermissions.put("/:id", (req, res) => {
   let id = req.params.id
    
    if(id == undefined){
        return res.status(400).json({errors: "No ID found"})
    }

    let permission = permissions.find(p => p.id = permissionId.id)

    if(permission == undefined){
        return res.status(400).json({errors: "No permission with this id"})
    }

    let text = req.body.text

    if(text != undefined){
        permission.text = text
    }

    res.json(permission)
})


routerPermissions.delete("/", (req, res) => {
    let permissionId = req.params.id
    
    if(permissionId == undefined){
        return res.status(400).json({errors: "No ID found"})
    }

    let permission = permissions.find(
        p => p.id = permissionId.id && p.userID)

    if(permission == undefined){
        return res.status(400).json({errors: "No permission with this id"})
    }

    let user = users.find(u => u.id = req.infoApiKey.id)

    if(user.role == "user" && permission.userID != req.infoApiKey.id){
        return res.status(401).json({errors: "You can not delete permission you did not create"})
    }

    permissions = permissions.filter(p => p.id != permissionId)
    res.json({deleted : true})
})

module.exports = routerPermissions
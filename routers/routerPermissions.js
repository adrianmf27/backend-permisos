const express = require("express")
const routerPermissions = express.Router()
let permissions = require("../data/permissions")
let authorizers = require("../data/authorizers")
const authorizers = require("../data/authorizers")


/* Para consultar información --> get
Para agregar información --> post */


routerPermissions.get("/", (req, res) => {
    res.json(permissions)
})

routerPermissions.post("/", (req, res) => {
    let text = req.body.text
    let userId = req.body.userId
    let lastID = permissions[permissions.length - 1].id
    let errors = []

    if(text == undefined){
        errors.push("No text in the body")
    }

    if(userId == undefined){
        errors.push("No userId in the body")
    }

    if(errors.length >= 1){
        return res.status(400).json({errors: errors})
    }

    permissions.push({
        id: lastID + 1, 
        text: text, 
        approbedBy: [], 
        userId: userId
    })

    /* Se devuelve un obj json con el último elemento añadido */
    res.json({id: lastID + 1}) 
})


/* PUT --> modificar datos ya creados */
routerPermissions.put("/:id/approbedBy", (req, res) => {
    let permissionId = req.params.id
    let authorizedEmail = req.body.authorizedEmail
    let authorizedPassword = req.body.authorizedPassword

    // validation
    let authorizer = authorizers.find(a => a.authorizedEmail == authorizedEmail && 
        a.authorizedPassword == authorizedPassword)
    
    if(authorizer == undefined){
        return res.status(401).json({errors: "Not authorized"})
    }

    let permission = permissions.find( p => p.id == permissionId)
    if(permission == undefined){
        return res.status(400).json({errors: "No permissionId"})
    }

    permissions.approbedBy.push(permission.id)
    res.json(permission)
})


routerPermissions.put("/:id", (req, res) => {
    let id = req.params.id
    
    if(permissionId == undefined){
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

    let permission = permissions.find(p => p.id = permissionId.id)

    if(permission == undefined){
        return res.status(400).json({errors: "No permission with this id"})
    }

    permissions = permissions.filter(p => p.id != permissionId)

    res.json({deleted : true})
})

module.exports = routerPermissions
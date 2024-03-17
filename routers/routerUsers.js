const express = require("express")
const routerUsers = express.Router()
let users = require("../data/users")

routerUsers.get("/", (req, res) => {
    res.json(users.map(u => { return { id: u.id, email:u.email } } ))
})

routerUsers.post("/", (req, res) => {
    let text = req.body.text
    let userEmail = req.body.userEmail
    let userPassword = req.body.userPassword

    // validate candidate users
    let possibleUser = users.filter(u => u.email == userEmail && u.password == userPassword)
    if(possibleUser.length == 0){
        return res.status(401).json({errors: "Not authorized"})
    }

    let errors = []
    if(text == undefined){
        errors.push("No text in the body")
    }

    if(possibleUser[0].id == undefined){
        errors.push("No userId in the body")
    }

    if(errors.length >= 1){
        return res.status(400).json({errors: errors})
    }

    users.push({
        id: lastID + 1, 
        text: text, 
        approbedBy: [], 
        userId: possibleUser[0].id
    })

    /* Se devuelve un obj json con el último elemento añadido */
    res.json({id: lastID + 1}) 
})


module.exports = routerUsers
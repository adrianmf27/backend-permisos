let express = require("express")
let jwt = require("jsonwebtoken")

let app = express()
let port = 8081

/* Para poder recibir datos en forma json */
app.use(express.json()) 

/* Para incluir los Middlewares execution 
'next()' pasa la peticion al elemento del array en la que s eprocesa */
app.use(["/permissions"], (req, res, next) => {
    console.log("middleware execution")

    // Validamos con la apiKey
    let apiKey = req.query.apiKey

    if(apiKey == undefined){
        return res.status(401).json({error:"Api key required"})
    }

    let infoApiKey = null
 
    try {
        infoApiKey = jwt.verify(apiKey, "secret") // Desencripta la apikey
    } catch (error) {
        return res.status(401).json({error : "Invalid token"})
    }

    req.infoApiKey = infoApiKey
    next()
})


let routerPermissions = require("./routers/routerPermissions")
app.use("/permissions", routerPermissions)
let routerUsers = require("./routers/routerUsers")
app.use("/users", routerUsers)
let routerLogin = require("./routers/routerLogin")
app.use("/login", routerLogin)

app.listen(port, () => {
    console.log("Servidor activo en " + port)
})
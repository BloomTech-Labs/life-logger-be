
const express = require("express")
const configureFunc = require("./middleware/configureAPI")

const restricted = require("./middleware/Restrict");
const userRouter = require("./api/users/routes")
const taskRouter = require("./api/tasks/routes")




//Creates Server
const server = express()

//Configs **Json**Helmet**corse**Morgan***Logger**
configureFunc(server)
//Routers
server.use("/life_logger/auth/users", userRouter)
server.use("/life_logger/auth/tasks",restricted, taskRouter)




//Test route
server.get("/", (req, res) => {
    res.status(200).send("<h3>The morning dawn brings thoughts of solidarity. How can they live if we believe in what they have done. The only way for progress is too burn the establishment down \n -Devin Dias </h3>")
})


module.exports = server
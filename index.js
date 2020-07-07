const server = require("./server")
const {PORT} = require("./secrets")



server.listen(PORT, () => {
    console.log(PORT)
})
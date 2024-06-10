const express = require('express')
const app = express()
const port = 3001

app.get('/', (req, res) => {
    res.send('Jordy stop met gamen!')
})

app.listen(port, () => {
    console.log(`MovieDB app listening on port http://localhost:${port}`)
})

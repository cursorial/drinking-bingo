const path = require('path')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080

app.use('/', express.static(path.join(__dirname, '')))

app.get('/', (req, res) => res.send('Hello, World!'))
app.listen(PORT, () => console.log(`App running on port ${PORT}`))

const express = require('express')
const next = require('next')
const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const { Pool } = require('pg')
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
})

app
  .prepare()
  .then(() => {
    const server = express()

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.post('/db', async (req, res) => {
      try {
        const client = await pool.connect()
        const result = await client.query('SELECT * FROM test_table')
        res.setHeader('Content-type', 'application/json')
        res.send(JSON.stringify({
          rows: result.rows
        }))
      } catch (err) {
        res.send(JSON.stringify({
          error: err
        }))
      }
    })

    server.listen(port, (err) => {
      if (err) {
        throw err
      }
      console.log(`Running app on port: ${port}`)
    })
  }).catch((err) => {
    console.error(err.stack)
    process.exit(1)
  })

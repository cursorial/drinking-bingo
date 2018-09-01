const express = require('express')
const bodyParser = require('body-parser')
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

async function queryDatabase (query, params) {
  try {
    const client = await pool.connect()
    const result = await client.query(query, params)
    return result
  } catch (err) {
    return err
  }
}

function sendDataToClient (res, data) {
  res.setHeader('Content-type', 'application/json')
  res.send(JSON.stringify(data))
}

app
  .prepare()
  .then(() => {
    const server = express()

    server.use(bodyParser.json())

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.post('/shows_index', async (req, res) => {
      const result = await queryDatabase('SELECT * FROM show;')
      sendDataToClient(res, {
        shows: result.rows
      })
    })

    server.post('/create_show', async (req, res) => {
      let showName = req.param('showName', null)
      const result = await queryDatabase('INSERT INTO show (name) VALUES($1);', [showName])
      sendDataToClient(res, {
        success: result.rows
      })
    })

    server.post('/delete_show', async (req, res) => {
      let showId = req.param('showId', null)
      const result = await queryDatabase('DELETE FROM show WHERE id = $1', [showId])
      sendDataToClient(res, result.rows)
    })

    server.post('/update_show', async (req, res) => {
      let showId = req.param('showId', null)
      let showName = req.param('showName', null)
      const result = await queryDatabase('UPDATE show SET show_name = $2 WHERE id = $1', [showId, showName])
      sendDataToClient(res, result.rows)
    })

    server.post('/seasons_index', async (req, res) => {
      let selectedShow = req.param('show', null)
      const result = await queryDatabase('SELECT * FROM season WHERE show_id = $1', [selectedShow])
      sendDataToClient(res, {
        seasons: result.rows
      })
    })

    server.post('/create_season', async (req, res) => {
      let seasonNumber = req.param('seasonNumber', null)
      let showId = req.param('showId', null)
      const result = await queryDatabase('INSERT INTO season (season_number, show_id) VALUES($1, $2)', [seasonNumber, showId])
      sendDataToClient(res, result.rows)
    })

    server.post('/episodes_index', async (req, res) => {
      let selectedSeason = req.param('season', null)
      const result = await queryDatabase('SELECT * FROM episode WHERE season_id = $1', [selectedSeason])
      sendDataToClient(res, result.rows)
    })

    server.post('/create_episode', async (req, res) => {
      let episodeName = req.param('episodeName', null)
      let episodeNumber = req.param('episodeNumber', null)
      let seasonId = req.param('seasonId', null)
      const result = await queryDatabase('INSERT INTO episode (episode_name, episode_number, season_id) VALUES($1, $2, $3)', [episodeName, episodeNumber, seasonId])
      sendDataToClient(res, result.rows)
    })

    server.post('/items_index', async (req, res) => {
      let selectedEpisode = req.param('item', null)
      const result = await queryDatabase('SELECT * FROM item WHERE episode_id = $1', [selectedEpisode])
      sendDataToClient(res, result.rows)
    })

    server.post('/create_item', async (req, res) => {
      let event = req.param('event', null)
      let action = req.param('action', null)
      let episodeId = req.param('episodeId', null)
      const result = await queryDatabase('INSERT INTO item (event, action, episode_id) VALUES($1, $2, $3)', [event, action, episodeId])
      sendDataToClient(res, result.rows)
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

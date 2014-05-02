require 'coffee-script/register'

express = require 'express'
app = express()
bodyParser = require 'body-parser'
mongoose = require 'mongoose'

# mongo db creds
mongoose.connect 'mongodb://node4:node4@novus.modulusmongo.net:27017/oh7ydytO'
# schema for mongoose
Song = require './app/models/song'


app.use bodyParser()

port = process.env.PORT or 8080

# ROUTES

router = express.Router()

router.use (req, res, next) ->
#  This action happen when route is used. This will be for logging.
  console.log 'Something is happening'
  next()

router.get '/', (req, res) ->
  res.json
    message: 'welcome to the api'

# create a song
router.route '/songs'
  .post (req, res) ->
    song = new Song()
    song.name = req.body.name

    song.save (err) ->
      if err
        res.send err
      res.json
        message: 'Song created'

#  get all songs
  .get (req, res) ->
    Song.find (err, songs) ->
      if err
        res.send err
      res.json songs

router.route '/songs/:song_id'
  .get (req, res) ->
    Song.findById req.params.song_id, (err, song) ->
      if err
        res.send err
      res.json song

  .put (req, res) ->
    Song.findById req.params.song_id, (err, song) ->
      if err
        res.send err

      song.name = req.body.name
      song.save (err) ->
        if err
          res.send err
        res.json
          message: 'Song updated'

  .delete (req, res) ->
    Song.remove
      _id: req.params.song_id
      (err, song) ->
          if err
            res.send err
          res.json
            message: 'Deleted Song'

# all the routes will be prefixed with /api
app.use '/api', router

app.listen port
console.log 'Stuff is happening on port ' + port
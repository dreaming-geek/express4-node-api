// Generated by CoffeeScript 1.7.1
(function() {
  var Song, app, bodyParser, express, mongoose, port, router;

  require('coffee-script/register');

  express = require('express');

  app = express();

  bodyParser = require('body-parser');

  mongoose = require('mongoose');

  mongoose.connect('mongodb://node4:node4@novus.modulusmongo.net:27017/oh7ydytO');

  Song = require('./app/models/song');

  app.use(bodyParser());

  port = process.env.PORT || 8080;

  router = express.Router();

  router.use(function(req, res, next) {
    console.log('Something is happening');
    return next();
  });

  router.get('/', function(req, res) {
    return res.json({
      message: 'welcome to the api'
    });
  });

  router.route('/songs').post(function(req, res) {
    var song;
    song = new Song();
    song.name = req.body.name;
    return song.save(function(err) {
      if (err) {
        res.send(err);
      }
      return res.json({
        message: 'Song created'
      });
    });
  }).get(function(req, res) {
    return Song.find(function(err, songs) {
      if (err) {
        res.send(err);
      }
      return res.json(songs);
    });
  });

  router.route('/songs/:song_id').get(function(req, res) {
    return Song.findById(req.params.song_id, function(err, song) {
      if (err) {
        res.send(err);
      }
      return res.json(song);
    });
  }).put(function(req, res) {
    return Song.findById(req.params.song_id, function(err, song) {
      if (err) {
        res.send(err);
      }
      song.name = req.body.name;
      return song.save(function(err) {
        if (err) {
          res.send(err);
        }
        return res.json({
          message: 'Song updated'
        });
      });
    });
  })["delete"](function(req, res) {
    return Song.remove({
      _id: req.params.song_id
    }, function(err, song) {
      if (err) {
        res.send(err);
      }
      return res.json({
        message: 'Deleted Song'
      });
    });
  });

  app.use('/api', router);

  app.listen(port);

  console.log('Stuff is happening on port ' + port);

}).call(this);

//# sourceMappingURL=server.map

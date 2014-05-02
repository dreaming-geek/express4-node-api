mongoose = require 'mongoose'
Schema = mongoose.Schema

SongSchema = new Schema
  name: String

module.exports = mongoose.model 'Song', SongSchema
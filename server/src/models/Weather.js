// models/Weather.js
const mongoose = require("mongoose");

const WeatherSchema = new mongoose.Schema({
  location: { type: String, required: true },
  temperature: { type: Number, required: true },
  feels_like: { type: Number, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true }, 
  sunset: { type: Date, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Weather", WeatherSchema);

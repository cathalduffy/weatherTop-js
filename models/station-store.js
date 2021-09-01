"use strict";

const _ = require("lodash");
const JsonStore = require("./json-store");
const stationAnalytics = require("../utils/station-analytics")
const axios = require("axios");
const oneCallRequest = `https://api.openweathermap.org/data/2.5/onecall?lat=52.160858&lon=-7.152420&units=metric&appid=2c9407bebff8d23f3e0083d7eb6fa6d6`;

const stationStore = {
  store: new JsonStore("./models/station-store.json", {
    stationCollection: []
  }),
  collection: "stationCollection",

  getAllStations() {
    return this.store.findAll(this.collection);
  },

  getStation(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  getUserStations(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },

  addStation(station) {
    this.store.add(this.collection, station);
    this.store.save();
  },

  removeStation(id) {
    const station = this.getStation(id);
    this.store.remove(this.collection, station);
    this.store.save();
  },

  removeAllStations() {
    this.store.removeAll(this.collection);
    this.store.save();
  },

  addReading(id, reading) {
    const station = this.getStation(id);
    station.readings.push(reading);
    this.store.save();
  },

  removeReading(id, readingId) {
    const station = this.getStation(id);
    const readings = station.readings;
    _.remove(readings, { id: readingId });
    this.store.save();
  },

  getReading(id, readingId) {
    const station = this.store.findOneBy(this.collection, { id: id });
    const readings = station.readings.filter(reading => readings.id == readingId);
    return readings[0];
  },

  updateReading(reading, updatedReading) {
    reading.id = updatedReading.id;
    reading.code = updatedReading.code;
    reading.temperature = updatedReading.temperature;
    reading.windSpeed = updatedReading.windSpeed;
    reading.pressure = updatedReading.pressure;
    reading.windDirection = updatedReading.windDirection;
    this.store.save();
  },
   
  Station(name,latitude,longitude)
  {
    this.name = name;
    this.latitude = latitude;
    this.longitude = longitude;
  },
  
  weatherIcon() {
    return stationAnalytics.weatherIcon(this.code);
  },
  
  getLat(id, reading) {
    const station = this.getStation(id);
    const readings = station.readings;
    var lat = station.lat;
    return lat;
  },
  
  getLng(id, reading) {
    const station = this.store.findOneBy(this.collection, { id: id });
    const readings = station.readings;
    var lng = station.lng;
    return lng;
  },

};

  

module.exports = stationStore;

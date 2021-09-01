"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/station-store");
const uuid = require("uuid");
const stationAnalytics = require('../utils/station-analytics');
const axios = require("axios");
const oneCallRequest = `https://api.openweathermap.org/data/2.5/onecall?lat=52.160858&lon=-7.152420&units=metric&appid=2c9407bebff8d23f3e0083d7eb6fa6d6`

//https://api.openweathermap.org/data/2.5/weather?lat=52.1614&lon=7.1493&appid=5fec940145740f91962fcb787072f7c4

const station = {
  index(request, response) {
    const stationId = request.params.id;
    logger.debug("Station id = ", stationId);
    
    const station = stationStore.getStation(stationId);
    const latestReading = stationAnalytics.getLatestReading(station);
    
    const minTemp = stationAnalytics.getMinTemp(station);
    const maxTemp = stationAnalytics.getMaxTemp(station);
    const minWindSpeed = stationAnalytics.getMinWindSpeed(station);
    const maxWindSpeed = stationAnalytics.getMaxWindSpeed(station);
    const minPressure = stationAnalytics.getMinPressure(station);
    const maxPressure = stationAnalytics.getMaxPressure(station);
    const weatherIcon = stationAnalytics.weatherIcon(station);
    const latestWeather = stationAnalytics.latestWeather(station);
    
    station.maxTemp = stationAnalytics.getMaxTemp(station);
    station.minTemp = stationAnalytics.getMinTemp(station);
    station.maxWindSpeed = stationAnalytics.getMaxWindSpeed(station);
    station.minWindSpeed = stationAnalytics.getMinWindSpeed(station);
    station.maxPressure = stationAnalytics.getMaxPressure(station);
    station.minPressure = stationAnalytics.getMinPressure(station);
    
    
    const viewData = {
      title: "Station",
      station: stationStore.getStation(stationId),
      latestReading: latestReading,
      minTemp: minTemp,
      maxTemp: maxTemp,
      minWindSpeed: minWindSpeed,
      maxWindSpeed: maxWindSpeed,
      minPressure: minPressure,
      maxPressure: maxPressure,
      weatherIcon: weatherIcon,
      latestWeather: latestWeather,
    };
    response.render("station", viewData);
  },

  deleteReading(request, response) {
    const stationId = request.params.id;
    const readingId = request.params.readingid;
    logger.debug(`Deleting Reading ${readingId} from Station ${stationId}`);
    stationStore.removeReading(stationId, readingId);
    response.redirect("/station/" + stationId);
  },

  addReading(request, response) {
    const stationId = request.params.id;
    const station = stationStore.getStation(stationId);
    const lat = stationStore.getLat(stationId);
    const lng = stationStore.getLng(stationId);
    const latestWeather = stationAnalytics.latestWeather(station);
    const weatherIcon = stationAnalytics.weatherIcon(station);
    
    const newReading = {
      id: uuid.v1(),
      code: request.body.code,
      temperature: request.body.temperature,
      windSpeed: request.body.windSpeed,
      pressure: request.body.pressure,
      windDirection: request.body.windDirection,
      weatherIcon: weatherIcon,
      latestWeather: latestWeather,
    };
    logger.debug("New Reading = ", newReading);
    stationStore.addReading(stationId, newReading);
    response.redirect("/station/" + stationId);
  }
};

module.exports = station;

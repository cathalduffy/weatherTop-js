"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/station-store");
const uuid = require("uuid");
const stationAnalytics = require('../utils/station-analytics');
const axios = require("axios");

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
    station.weatherIcon = stationAnalytics.weatherIcon(station);
    station.latestWeather = stationAnalytics.latestWeather(station);
    
    
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
      tempGraph: stationStore.getStation(stationId).readings[stationStore.getStation(stationId).readings.length - 1], 
    };
    logger.info("about to render", stationStore.getStation(stationId));
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
    const weatherIcon = stationAnalytics.weatherIcon(station);
    const latestWeather = stationAnalytics.latestWeather(station);
    
    const newReading = {
      id: uuid.v1(),
      date: request.body.date,
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
  },
  
    async addReport(request, response) {
    logger.info("rendering new report");
    let report = {};
    
    const stationId = request.params.id;
    const station = stationStore.getStation(stationId);
    const readingId = request.params.readingid;
    const lat = stationStore.getLat(stationId);
    const lng = stationStore.getLng(stationId);
    const requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&appid=5fec940145740f91962fcb787072f7c4`;
    
    const result = await axios.get(requestUrl);
    if (result.status == 200) {
      const reading = result.data.current;
      let unix_timestamp = reading.dt;
      var date = new Date(unix_timestamp * 1000);
      report.date =
        date.getDate() +
        "/" +
        (1 + date.getMonth()) +
        "/" +
        date.getFullYear() +
        " " +
        (1 + date.getHours()) +
        ":" + 
         date.getMinutes();


      report.code = reading.weather[0].id;
      report.temperature = reading.temp;
      report.windSpeed = reading.wind_speed;
      report.pressure = reading.pressure;
      report.windDirection = reading.wind_deg;
      
      report.tempTrend = [];
      report.trendLabels = [];
      const trends = result.data.daily;
      for (let i=0; i<trends.length; i++) {
       report.tempTrend.push(trends[i].temp.day);
        const date = new Date(trends[i].dt * 1000);
        console.log(date);
        report.trendLabels.push(`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}` );
      }
    }
      const newReading = {
      id: uuid.v1(),
      date: report.date,
      code: report.code,
      temperature: report.temperature,
      windSpeed: report.windSpeed,
      windDirection: report.windDirection,
      pressure: report.pressure,
      tempTrend: report.tempTrend,
      trendLabel: report.trendLabels,  
      };
    logger.info("New Reading ", newReading);
    stationStore.addReading(stationId, newReading);
    response.redirect("/station/" + stationId);
  }
};

module.exports = station;

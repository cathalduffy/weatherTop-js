"use strict";

const accounts = require("./accounts.js");
const logger = require("../utils/logger");
const stationStore = require("../models/station-store");
const uuid = require("uuid");
const stationAnalytics = require("../utils/station-analytics");
const station = require("./station.js");
const axios = require("axios");

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    const stationId = request.params.id;
    logger.debug("Station id = ", stationId);

    const readingId = request.params.readingid;

    const getAllStations = stationStore.getAllStations();

    const stations = stationStore.getUserStations(loggedInUser.id);

    for (let i = 0; i < getAllStations.length; i++) {
      const station = getAllStations[i];
      station.maxTemp = stationAnalytics.getMaxTemp(station);
      station.minTemp = stationAnalytics.getMinTemp(station);
      station.maxWindSpeed = stationAnalytics.getMaxWindSpeed(station);
      station.minWindSpeed = stationAnalytics.getMinWindSpeed(station);
      station.maxPressure = stationAnalytics.getMaxPressure(station);
      station.minPressure = stationAnalytics.getMinPressure(station);
      station.weatherIcon = stationAnalytics.weatherIcon(station);
      station.latestWeather = stationAnalytics.latestWeather(station);
    }

    const viewData = {
      title: "Station Dashboard",
      stations: stations
    };
    logger.info("about to render", stationStore.getAllStations());
    response.render("dashboard", viewData);
  },

  deleteStation(request, response) {
    const stationId = request.params.id;
    logger.debug(`Deleting Station ${stationId}`);
    stationStore.removeStation(stationId);
    response.redirect("/dashboard");
  },

  addStation(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newStation = {
      id: uuid.v1(),
      userid: loggedInUser.id,
      name: request.body.name,
      lat: request.body.lat,
      lng: request.body.lng,
      readings: []
    };
    logger.debug("Creating a new Station", newStation);
    stationStore.addStation(newStation);
    response.redirect("/dashboard");
  }
};

module.exports = dashboard;

"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/station-store");

const reading = {
  index(request, response) {
    const stationId = request.params.id;
    const readingId = request.params.readingid;
    logger.debug(`Editing Reading ${readingId} from Station ${stationId}`);
    const viewData = {
      title: "Edit Song",
      station: stationStore.getStation(stationId),
      reading: stationStore.getReading(stationId, readingId)
    };
    response.render("reading", viewData);
  },

  update(request, response) {
    const playlistId = request.params.id;
    const songId = request.params.songid;
    const song = playlistStore.getSong(playlistId, songId)
    const newSong = {
      title: request.body.title,
      artist: request.body.artist,
      duration: Number(request.body.duration)
    };
    logger.debug(`Updating Song ${songId} from Playlist ${playlistId}`);
    playlistStore.updateSong(song, newSong);
    response.redirect("/playlist/" + playlistId);
  }
};

module.exports = song;

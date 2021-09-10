"use strict";

const stationStore = require("../models/station-store");

const stationAnalytics = {
  getLatestReading(station) {
    let latestReading = 0;
    let weatherIcon = 0;
    if (station.readings.length > 0) {
      latestReading = station.readings[station.readings.length - 1];
    }
    station.code = latestReading.code;
    station.windBft = stationAnalytics.beafourt(latestReading.windSpeed);
    station.tempF = stationAnalytics.tempF(
      Number(latestReading.temperature).toFixed(2)
    );
    station.pressure = latestReading.pressure;
    station.tempC = latestReading.temperature;
    station.windCompass = stationAnalytics.windCompass(
      latestReading.windDirection
    );
    station.windChill = stationAnalytics
      .windChill(latestReading.temperature, latestReading.windSpeed)
      .toFixed(2);

    return latestReading;
  },

  weatherIcon(station) {
    const latestReading = station.readings[station.readings.length - 1];
    const code = station.code;
    let weatherIcon = null;

    if (code == 200 && code <= 232)
      weatherIcon = "http://openweathermap.org/img/w/11d.png";
    else if (code >= 300 && code <= 321)
      weatherIcon = "http://openweathermap.org/img/w/09d.png";
    else if (code >= 500 && code <= 504)
      weatherIcon = "http://openweathermap.org/img/w/10d.png";
    else if (code >= 511)
      weatherIcon = "http://openweathermap.org/img/w/13d.png";
    else if (code >= 520 && code <= 531)
      weatherIcon = "http://openweathermap.org/img/w/09d.png";
    else if (code >= 600 && code <= 622)
      weatherIcon = "http://openweathermap.org/img/w/13d.png";
    else if (code >= 701)
      weatherIcon = "http://openweathermap.org/img/w/50d.png";
    else if (code >= 711)
      weatherIcon = "http://openweathermap.org/img/w/50d.png";
    else if (code >= 721)
      weatherIcon = "http://openweathermap.org/img/w/50d.png";
    else if (code >= 731)
      weatherIcon = "http://openweathermap.org/img/w/50d.png";
    else if (code >= 741)
      weatherIcon = "http://openweathermap.org/img/w/50d.png";
    else if (code >= 751)
      weatherIcon = "http://openweathermap.org/img/w/50d.png";
    else if (code >= 761)
      weatherIcon = "http://openweathermap.org/img/w/50d.png";
    else if (code >= 762)
      weatherIcon = "http://openweathermap.org/img/w/50d.png";
    else if (code >= 771)
      weatherIcon = "http://openweathermap.org/img/w/50d.png";
    else if (code >= 781)
      weatherIcon = "http://openweathermap.org/img/w/50d.png";
    else if (code == 800)
      weatherIcon = "http://openweathermap.org/img/w/01d.png";
    else if (code == 801)
      weatherIcon = "http://openweathermap.org/img/w/02d.png";
    else if (code == 802)
      weatherIcon = "http://openweathermap.org/img/w/03d.png";
    else if (code == 803 || code == 804)
      weatherIcon = "http://openweathermap.org/img/w/04d.png";
    else weatherIcon = "http://openweathermap.org/img/w/01n.png";

    return weatherIcon;
  },

  latestWeather(station) {
    const latestReading = station.readings[station.readings.length - 1];
    const code = station.code;
    let latestWeather = 0;

    if (code == 200 && code <= 232) latestWeather = "Thunderstorm";
    else if (code >= 300 && code <= 321) latestWeather = "Drizzle";
    else if (code >= 500 && code <= 504) latestWeather = "Rain";
    else if (code >= 511) latestWeather = "Snow";
    else if (code >= 520 && code <= 531) latestWeather = "Snow";
    else if (code >= 600 && code <= 622) latestWeather = "Mist";
    else if (code >= 701) latestWeather = "Mist";
    else if (code >= 711) latestWeather = "Smoke";
    else if (code >= 721) latestWeather = "Haze";
    else if (code >= 731) latestWeather = "Dust";
    else if (code >= 741) latestWeather = "Fog";
    else if (code >= 751) latestWeather = "Sand";
    else if (code >= 761) latestWeather = "Dust";
    else if (code >= 762) latestWeather = "Ash";
    else if (code >= 771) latestWeather = "Squall";
    else if (code >= 781) latestWeather = "Tornado";
    else if (code == 800) latestWeather = "Clear";
    else if (code == 801) latestWeather = "Clouds";
    else if (code == 802) latestWeather = "Clouds";
    else if (code == 803 || code == 804) latestWeather = "Clouds";
    else latestWeather = "Null";

    return latestWeather;
  },

  tempF(tempC) {
    return tempC * 1.8 + 32;
  },

  beafourt(windspeed) {
    if (windspeed == 0) {
      return 0;
    } else if (windspeed >= 1 && windspeed <= 6) {
      return 1;
    } else if (windspeed >= 7 && windspeed <= 11) {
      return 2;
    } else if (windspeed >= 12 && windspeed <= 19) {
      return 3;
    } else if (windspeed >= 20 && windspeed <= 29) {
      return 4;
    } else if (windspeed >= 30 && windspeed <= 39) {
      return 5;
    } else if (windspeed >= 40 && windspeed <= 50) {
      return 6;
    } else if (windspeed >= 51 && windspeed <= 62) {
      return 7;
    } else if (windspeed >= 63 && windspeed <= 75) {
      return 8;
    } else if (windspeed >= 76 && windspeed <= 87) {
      return 9;
    } else if (windspeed >= 88 && windspeed <= 102) {
      return 10;
    } else if (windspeed >= 103 && windspeed <= 117) {
      return 11;
    } else if (windspeed >= 117) {
      return 12;
    }
    return -1;
  },

  windCompass(deg) {
    if (deg > 11.25 && deg <= 33.75) {
      return "North North East";
    } else if (deg > 33.75 && deg <= 56.25) {
      return "East North East";
    } else if (deg > 56.25 && deg <= 78.75) {
      return "East";
    } else if (deg > 78.75 && deg <= 101.25) {
      return "East South East";
    } else if (deg > 101.25 && deg <= 123.75) {
      return "East South East";
    } else if (deg > 123.75 && deg <= 146.25) {
      return "South East";
    } else if (deg > 146.25 && deg <= 168.75) {
      return "South South East";
    } else if (deg > 168.75 && deg <= 191.25) {
      return "South";
    } else if (deg > 191.25 && deg <= 213.75) {
      return "South South West";
    } else if (deg > 213.75 && deg <= 236.25) {
      return "South West";
    } else if (deg > 236.25 && deg <= 258.75) {
      return "West South West";
    } else if (deg > 258.75 && deg <= 281.25) {
      return "West";
    } else if (deg > 281.25 && deg <= 303.75) {
      return "West North West";
    } else if (deg > 303.75 && deg <= 326.25) {
      return "North West";
    } else if (deg > 326.25 && deg <= 348.75) {
      return "North North West";
    } else {
      return "North";
    }
  },

  windChill(temp, windspeed) {
    return (
      13.12 +
      0.6215 * temp -
      11.37 * Math.pow(windspeed, 0.16) +
      0.3965 * temp * Math.pow(windspeed, 0.16)
    );
  },

  getMaxTemp(station) {
    let maxTemp = 0;
    if (station.readings.length > 0) {
      maxTemp = station.readings[0].temperature;
      for (let i = 1; i < station.readings.length; i++) {
        if (station.readings[i].temperature > maxTemp) {
          maxTemp = station.readings[i].temperature;
        }
      }
    }
    return maxTemp;
  },

  getMinTemp(station) {
    let minTemp = 0;
    if (station.readings.length > 0) {
      minTemp = station.readings[0].temperature;
      for (let i = 1; i < station.readings.length; i++) {
        if (station.readings[i].temperature < minTemp) {
          minTemp = station.readings[i].temperature;
        }
      }
    }
    return minTemp;
  },

  getMaxWindSpeed(station) {
    let maxWindSpeed = 0;
    if (station.readings.length > 0) {
      maxWindSpeed = station.readings[0].windSpeed;
      for (let i = 1; i < station.readings.length; i++) {
        if (station.readings[i].windSpeed > maxWindSpeed) {
          maxWindSpeed = station.readings[i].windSpeed;
        }
      }
    }
    return maxWindSpeed;
  },

  getMinWindSpeed(station) {
    let minWindSpeed = 0;
    if (station.readings.length > 0) {
      minWindSpeed = station.readings[0].windSpeed;
      for (let i = 1; i < station.readings.length; i++) {
        if (station.readings[i].windSpeed < minWindSpeed) {
          minWindSpeed = station.readings[i].windSpeed;
        }
      }
    }
    return minWindSpeed;
  },

  getMaxPressure(station) {
    let maxPressure = 0;
    if (station.readings.length > 0) {
      maxPressure = station.readings[0].pressure;
      for (let i = 1; i < station.readings.length; i++) {
        if (station.readings[i].pressure > maxPressure) {
          maxPressure = station.readings[i].pressure;
        }
      }
    }
    return maxPressure;
  },

  getMinPressure(station) {
    let minPressure = 0;
    if (station.readings.length > 0) {
      minPressure = station.readings[0].pressure;
      for (let i = 1; i < station.readings.length; i++) {
        if (station.readings[i].pressure < minPressure.pressure) {
          minPressure = station.readings[i].pressure;
        }
      }
    }
    return minPressure;
  }
};
module.exports = stationAnalytics;

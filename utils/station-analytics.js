"use strict";

const stationAnalytics = {

  
  getLatestReading(station) {
    let latestReading = null;
    let weatherIcon = null;
    if (station.readings.length > 0) {
      latestReading = station.readings[station.readings.length - 1];
    }    
    station.code = latestReading.code;
    station.windBft = stationAnalytics.beafourt(latestReading.windSpeed);
    station.tempF = stationAnalytics.tempF(latestReading.temperature);
    station.weather = stationAnalytics.codeToString(Number(latestReading.code));
    station.pressure = latestReading.pressure;
    station.tempC = latestReading.temperature
    station.windCompass = stationAnalytics.windCompass(latestReading.windDirection);
    station.windChill = stationAnalytics.windChill(latestReading.temperature, latestReading.windSpeed).toFixed(2);
    
    return latestReading;
  },
  
    

  codeToString(code) {
        switch (code) {
            case 100:
                return "Clear";

            case 200:
                return "Partial Clouds";

            case 300:
                return "Cloudy";

            case 400:
                return "Light Showers";

            case 500:
                return "Heavy Showers";

            case 600:
                return "Rain";

            case 700:
                return "Snow";

            case 800:
                return "Thunder";
        }
        return " ";
    },
      setWeatherReport(weatherReport) {
        this.weatherReport = weatherReport;
      },

    weatherIcon(code) {
        let weatherIcons = new Map();
        weatherIcons.put(100, "sun icon");
        weatherIcons.put(200, "cloud sun icon");
        weatherIcons.put(300, "cloud icon");
        weatherIcons.put(400, "cloud rain icon");
        weatherIcons.put(500, "cloud showers heavy icon");
        weatherIcons.put(600, "snowflake icon");
        weatherIcons.put(700, "snowflake icon");
        weatherIcons.put(800, "poo storm icon");

        return weatherIcons.get(code);
    },

  setWeatherIcon(weatherIcon) {
        this.weatherIcon = weatherIcon;
    },

  tempF(tempC) {
    return (tempC * 1.8) + 32;
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

  windCompass(deg) 
  {
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
    return 13.12 + 0.6215 * temp -  11.37 * (Math.pow(windspeed, 0.16)) + 0.3965 * temp * (Math.pow(windspeed, 0.16));
  },
  
  getMaxTemp(station) {
    let maxTemp = null;
    if (station.readings.length > 0) {
      maxTemp = station.readings[0];
      for (let i = 1; i < station.readings.length; i++) {
        if (station.readings[i].temperature > maxTemp.temperature) {
          maxTemp = station.readings[i];
        }
      }
    }
    return maxTemp;
  },
  
  getMinTemp(station) {
    let minTemp = null;
    if (station.readings.length > 0) {
      minTemp = station.readings[0];
      for (let i = 1; i < station.readings.length; i++) {
        if (station.readings[i].temperature < minTemp.temperature) {
          minTemp = station.readings[i];
        }
      }
    }
    return minTemp;
  },
  
  getMaxWindSpeed(station) {
    let maxWindSpeed = null;
    if (station.readings.length > 0) {
      maxWindSpeed = station.readings[0];
      for (let i = 1; i < station.readings.length; i++) {
        if (station.readings[i].windSpeed > maxWindSpeed.windSpeed) {
          maxWindSpeed = station.readings[i];
        }
      }
    }
    return maxWindSpeed;
  },
  
  getMinWindSpeed(station) {
    let minWindSpeed = null;
    if (station.readings.length > 0) {
      minWindSpeed = station.readings[0];
      for (let i = 1; i < station.readings.length; i++) {
        if (station.readings[i].windSpeed < minWindSpeed.windSpeed) {
          minWindSpeed = station.readings[i];
        }
      }
    }
    return minWindSpeed;
  },
  
  getMaxPressure(station) {
    let maxPressure = null;
    if (station.readings.length > 0) {
      maxPressure = station.readings[0];
      for (let i = 1; i < station.readings.length; i++) {
        if (station.readings[i].pressure > maxPressure.pressure) {
          maxPressure = station.readings[i];
        }
      }
    }
    return maxPressure;
  },
  
  getMinPressure(station) {
    let minPressure = null;
    if (station.readings.length > 0) {
      minPressure = station.readings[0];
      for (let i = 1; i < station.readings.length; i++) {
        if (station.readings[i].pressure < minPressure.pressure) {
          minPressure = station.readings[i];
        }
      }
    }
    return minPressure;
  },


};
module.exports = stationAnalytics;

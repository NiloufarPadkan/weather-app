const https = require("https");
const chalk = require("chalk");
/*const placeUrl =
  "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angles.json?worldview=cn&access_token=pk.eyJ1Ijoibmlsb3VmYXJwZGsiLCJhIjoiY2t0dDNkdjZhMTlsYzJ2bnF6YXo0NGo0NCJ9.WUWqa4Ie-Ay6jg2E3RElug&limit=1";
*/
const forcast = (lat, long, callbackfunction) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=8d715b3a47e71467e87f4a94de694163`;

  https
    .get(url, (resp) => {
      let data = "";

      // A chunk of data has been received.
      resp.on("data", (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on("end", () => {
        //  console.log(JSON.parse(data).main.temp);
        let weather = JSON.parse(data).weather[0];
        let temp = parseInt(JSON.parse(data).main.temp) - 273.15;
        let d =
          JSON.parse(data).name +
          chalk.yellow.inverse("\n\ntody weather : \n") +
          weather.main +
          chalk.magenta.inverse("\n\ndescription : \n") +
          weather.description +
          chalk.blue.inverse("\n\n temp: \n") +
          temp.toFixed(2);

        callbackfunction(d);
      });
    })
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });
};

module.exports = forcast;

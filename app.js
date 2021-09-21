// const request = require("request");

// const url =
//   "https://api.openweathermap.org/data/2.5/weather?q=rasht&appid=8d715b3a47e71467e87f4a94de694163";
// request({ url: url, json: true }, (error, response) => {
//   console.log(response);
// });
const https = require("https");
const chalk = require("chalk");
const { argv } = require("yargs");
const yargs = require("yargs");
let city = "rasht";
yargs.command({
  command: "city",
  describe: "check weather",
  builder: {
    check: {
      describe: "city name",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    console.log("\n weather of " + argv.check);
    city = argv.check;
    findWeather(city);
  },
});
function findWeather(myCity) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${myCity}&appid=8d715b3a47e71467e87f4a94de694163`;
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
        console.log(
          chalk.yellow.inverse("\ntody weather : \n") +
            weather.main +
            chalk.magenta.inverse("\n\ndescription : \n") +
            weather.description +
            chalk.blue.inverse("\n\n temp: \n") +
            temp.toFixed(2)
        );
      });
    })
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });
}
function findPlace() {
  const placeUrl =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angles.json?worldview=cn&access_token=pk.eyJ1Ijoibmlsb3VmYXJwZGsiLCJhIjoiY2t0dDNkdjZhMTlsYzJ2bnF6YXo0NGo0NCJ9.WUWqa4Ie-Ay6jg2E3RElug&limit=1";
  https
    .get(placeUrl, (resp) => {
      let data = "";

      // A chunk of data has been received.
      resp.on("data", (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on("end", () => {
        //  console.log(JSON.parse(data).main.temp);
        let place = JSON.parse(data);

        const latitude = place.features[0].center[0];
        const longitude = place.features[0].center[1];
        console.log(latitude, longitude);
      });
    })
    .on("error", (err) => {
      console.log("Error   : " + err.message);
    });
}
yargs.parse();
findPlace();

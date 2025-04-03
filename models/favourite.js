const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");


// i have just crretaed the home objeect which cary
// mltiple functions related to fetch all items
module.exports = class favourite {
  static addToFavourite(homeid, callback) {
    this.fetchFavourite((favourites) => {
      let flag = 0;
      favourites.map((item) => {
        if (item.id === homeid) {
          console.log(
            "the home is aldready is added in the favourites sections"
          );
          flag = 1;
        }
      });

      // getting the the data using the home id from the home id uisng the home list
      favourites.push()
    });
  }

  static fetchFavourite(callback) {
    const favouritesPath = path.join(rootDir, "data", "favourites.json");
    fs.readFile(favouritesPath, (err, data) => {
      if (!err) {
        try {
          const data1 = JSON.parse(data); // Fixed JSON parsing issue
          callback(data1); // Ensure correct data format
        } catch (parseError) {
          // if reding is correctly done but the data is not properly parsed this error is coocured
          console.log("Error parsing JSON:", parseError);
        }
      } else {
        console.log("error has coccured ", err);
      }
    });
  }
};

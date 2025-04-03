// Core Modules
const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");



// i have just crretaed the home objeect which cary
// mltiple functions related to fetch all items
module.exports = class Home {
  constructor(id, houseName, price, location, rating, photoUrl) {
    this.id = id;
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
  }
  // this is usinsg the principal of hosting
  // the fetch all is delcared beith
  
  save() {
    Home.fetchAll((registeredHomes) => {
      if (this.id) {
        const existingHomeIndex = registeredHomes.findIndex(
          (home) => home.id === this.id
        );
        if (existingHomeIndex >= 0) {
          registeredHomes[existingHomeIndex] = this;
        }
      } else {
        this.id = Math.random().toString();
        registeredHomes.push(this);
      }

      const homeDataPath = path.join(rootDir, "data", "homes.json");
      fs.writeFile(
        homeDataPath,
        JSON.stringify(registeredHomes, null, 2),
        (error) => {
          if (error) {
            console.error("Error saving home data:", error);
            throw error;
          }
        }
      );
    });
  }

  static deleteById(id, callback) {
    Home.fetchAll((registeredHomes) => {
      const updatedHomes = registeredHomes.filter((home) => home.id !== id);
      const homeDataPath = path.join(rootDir, "data", "homes.json");
      fs.writeFile(
        homeDataPath,
        JSON.stringify(updatedHomes, null, 2),
        (error) => {
          if (error) {
            console.error("Error deleting home:", error);
            throw error;
          }
          callback();
        }
      );
    });
  }

  // sare ghar files se padke a k list restun karth hai
  static fetchAll(callback) {
    const homeDataPath = path.join(rootDir, "data", "homes.json");
    fs.readFile(homeDataPath, (err, data) => {
      if (err) {
        console.error("Error reading homes data:", err);
        callback([]);
        return;
      }
      try {
        const homes = JSON.parse(data);
        callback(homes);
      } catch (err) {
        console.error("Error parsing homes data:", err);
        callback([]);
      }
    });
  }

  static findByid(id, callback) {
    // fetch all gives callback by homes
    this.fetchAll((homes) => {
      const homefound = homes.find((home) => home.id === id);
      callback(homefound);
    });
  }
};

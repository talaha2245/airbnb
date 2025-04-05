// Import required modules
const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");
const Home = require("./home");

// Define the path to the favourites.json file
const favouritesPath = path.join(rootDir, "data", "favourites.json");

// Export the Favourite class
module.exports = class Favourite {
  /**
   * Adds a home to the favourites list
   * @param {string} homeid - The ID of the home to add to favourites
   * @param {function} callback - Callback function(error, favourites)
   */
  static addToFavourite(homeid, callback) {
    // Validate home ID
    if (!homeid) {
      return callback(new Error('Home ID is required'), null);
    }

    // Read existing favorites
    fs.readFile(favouritesPath, 'utf8', (err, data) => {
      // Initialize favorites array
      let favourites = [];
      
      try {
        // Parse existing favorites or start with empty array
        favourites = err ? [] : JSON.parse(data || '[]');
        
        // Check if home is already in favorites
        if (favourites.some(fav => fav.id === homeid)) {
          return callback(null, favourites);
        }

        // Find the home in all homes
        Home.fetchAll(homes => {
          const homeToAdd = homes.find(home => home.id === homeid);
          
          if (!homeToAdd) {
            return callback(new Error('Home not found'), favourites);
          }

          // Add home to favorites
          favourites.push(homeToAdd);

          // Save updated favorites
          fs.writeFile(favouritesPath, JSON.stringify(favourites, null, 2), err => {
            if (err) {
              return callback(err, favourites);
            }
            callback(null, favourites);
          });
        });
      } catch (error) {
        callback(error, favourites);
      }
    });
  }

  /**
   * Fetches all favourite homes
   * @param {function} callback - Callback function(favourites)
   */
  static fetchFavourite(callback) {
    // Read favorites file
    fs.readFile(favouritesPath, 'utf8', (err, data) => {
      try {
        // Return parsed favorites or empty array
        const favourites = err ? [] : JSON.parse(data || '[]');
        callback(favourites);
      } catch (error) {
        // Return empty array on error
        console.error('Error reading favorites:', error);
        callback([]);
      }
    });
  }
};
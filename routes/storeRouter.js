// External Module
const express = require("express");
const storeRouter = express.Router();

// Local Module
const storeController = require("../controllers/storeController");

storeRouter.get("/", storeController.getIndex);

// takes to homes list page
storeRouter.get("/homes", storeController.getHomes);

// takes to the booking which is empty
storeRouter.get("/bookings", storeController.getBookings);

// goes to favoites page
storeRouter.get("/favourites", storeController.getFavouriteList);


//read the favorites
storeRouter.post("/favourites",storeController.addFavoritesItems)

// if we click any home in the home list 
//and gets the adress which is ranodm that is been genartaed
storeRouter.get("/home/:homeid",storeController.getHomeDeatils)

module.exports = storeRouter;

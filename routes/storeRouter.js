// External Module
const express = require("express");
const storeRouter = express.Router();

// Local Module
const storeController = require("../controllers/storeController");

storeRouter.get("/", storeController.getIndex);

// takes to homes list page
storeRouter.get("/homes", storeController.getHomes);

// takes to bookings page
storeRouter.get("/bookings", storeController.getBookings);

//read the favorites
storeRouter.get("/favourites", storeController.getFavouriteList);
storeRouter.post("/favourites", storeController.addFavoritesItems);

// home details page
storeRouter.get("/home/:homeid", storeController.getHomeDetails);

module.exports = storeRouter;

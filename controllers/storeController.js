const Favourite = require("../models/favourite");
const Home = require("../models/home");

exports.getIndex = (req, res, next) => {
  Home.fetchAll((registeredHomes) =>
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "index",
    })
  );
};

// the reder fucntion take it the the pirtucluar route
exports.addFavoritesItems = (req, res, next) => {
  // Extract the home ID from request body
  const homeid = req.body.id; // Changed from homeId to id to match form data

  // Call the Favourite model's method to add the home
  Favourite.addToFavourite(homeid, (error, favourites) => {
    if (error) {
      // Log any errors but continue to redirect
      console.error("Error adding to favorites:", error.message);
    }
    // Redirect to favorites page regardless of outcome
    res.redirect("/favourites");
  });
};

exports.getHomes = (req, res, next) => {
  // ye fetch all ku call karth avo sare homes ku files se padke list banke bechta
  // console.log("rendering homes list")
  Home.fetchAll((registeredHomes) =>
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Homes List",
      currentPage: "Home",
    })
  );
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
  });
};

// it goes to fetch all and in the call back
// all the o=homes form the jason files are retretived
exports.getFavouriteList = (req, res, next) => {
  /**
   * @param {favouriteHomes}-function which returens the favourites the list
   */
  // from the favourites it fetches the favourites
  Favourite.fetchFavourite((favouriteHomes) => {
    res.render("store/favourite-list", {
      favouriteHomes: favouriteHomes,
      pageTitle: "My Favourites",
      currentPage: "favourites",
    });
  });
};

exports.getHomeDetails = (req, res) => {
  // Get the home ID from the request parameters
  const homeid = req.params.homeid;

  Home.findByid(homeid, (home) => {
    console.log(home);
    // Redirect to homes page if the home is not found
    if (!home) {
      res.redirect("/homes");
    } else {
      res.render("store/home-detail", {
        home,
        pageTitle: "Home Details",
        currentPage: "Home",
      });
    }
  });
};

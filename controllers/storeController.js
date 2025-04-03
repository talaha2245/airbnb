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
  const homeid = req.body;
  console.log("added to the favorites",homeid);
  res.redirect("/favourites");
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
  Home.fetchAll((registeredHomes) =>
    res.render("store/favourite-list", {
      registeredHomes: registeredHomes,
      pageTitle: "My Favourites",
      currentPage: "favourites",
    })
  );
};

exports.getHomeDeatils = (req, res) => {
  // home id letha fuchion kaaa
  const homeid = req.params.homeid;

  Home.findByid(homeid, (home) => {
    console.log(home);
    // agar data nahi mila tho redirect kardo home page me
    if (!home) {
      // console.log("home not found");
      res.redirect("/homes");
    } else {
      res.render("store/home-detail", {
        // data pass kare home details page kuu
        home,
        pageTitle: "Homes deatails list",
        currentPage: "Home",
      });
    }
  });
};

const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/addHome", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
  });
};

exports.getHostHomes = (req, res, next) => {
  Home.fetchAll((registeredHomes) =>
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Homes List",
      currentPage: "host-homes",
    })
  );
};

exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, rating, photoUrl } = req.body;
  
  // Basic validation
  if (!houseName || !price || !location || !rating) {
    return res.render("host/addHome", {
      pageTitle: "Add Home to airbnb",
      currentPage: "addHome",
      error: "Please fill in all required fields",
      oldInput: { houseName, price, location, rating, photoUrl }
    });
  }

  const home = new Home(null, houseName, price, location, rating, photoUrl);
  home.save();

  res.redirect("/host/host-home-list");
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId, (home) => {
    if (!home) {
      return res.redirect("/host/host-home-list");
    }
    res.render("host/edit-home", {
      pageTitle: "Edit Home",
      currentPage: "editHome",
      home: home,
      error: null
    });
  });
};

exports.postEditHome = (req, res, next) => {
  const { homeId, houseName, price, location, rating, photoUrl } = req.body;

  // Basic validation
  if (!houseName || !price || !location || !rating) {
    return res.render("host/edit-home", {
      pageTitle: "Edit Home",
      currentPage: "editHome",
      home: { id: homeId, houseName, price, location, rating, photoUrl },
      error: "Please fill in all required fields"
    });
  }

  const home = new Home(homeId, houseName, price, location, rating, photoUrl);
  home.save();

  res.redirect("/host/host-home-list");
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.body.homeId;
  Home.deleteById(homeId, () => {
    res.redirect("/host/host-home-list");
  });
};

const Favourite = require("../models/favourite");
const Home = require("../models/home");

exports.getIndex = (req, res, next) => {
  console.log("Session: ", req.session);
  Home.find().then((registeredHomes) =>
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "index",
      isLoggedIn: req.isLoggedIn,

    })
  );
};

exports.getHomes = (req, res, next) => {
  Home.find().then((registeredHomes) =>
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Homes List",
      currentPage: "Home",
      isLoggedIn: req.isLoggedIn,

    })
  );
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
    isLoggedIn: req.isLoggedIn,

  });
};

exports.getFavouriteList = (req, res, next) => {
  Favourite.find().populate("homeId").then((favourites) => {
    const favouriteHomes = favourites.map((favourite) => favourite.homeId);
    res.render("store/favourite-list", {
      favouriteHomes: favouriteHomes,
      pageTitle: "My Favourites",
      currentPage: "favourites",
      isLoggedIn: req.isLoggedIn,

    });
  });
};

exports.postAddToFavourite = (req, res, next) => {
  const homeId = req.params.homeId;

  if (!homeId) {
    console.log("homeId is undefined");
    return res.redirect("/favourites");
  }

  Favourite.findOne({ homeId: homeId })
    .then((favourite) => {
      if (favourite) {
        console.log("Home already in favourites");
        return res.redirect("/favourites"); // ✅ Add `return` here!
      }

      const fav = new Favourite({ homeId: homeId });
      return fav.save().then(() => {
        console.log("Home added to favourites successfully " + fav);
        return res.redirect("/favourites");
      });
    })
    .catch((err) => {
      console.log("Error while adding to favourites: ", err);
      return res.redirect("/favourites");
    });
};


exports.postRemoveFromFavourite = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.findOneAndDelete({ homeId: homeId })
    .then((result) => {
      console.log("Fav removed: ", result);
    })
    .catch((err) => {
      console.log("Error while removing fav:", err);
    })
    .finally(() => {
      res.redirect("/favourites");
    });
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId)
    .then((home) => {
      if (!home) {
        console.log("Home not found");
        res.redirect("/homes");
      } else {
        res.render("store/home-detail", {
          home: home,
          pageTitle: "Home Detail",
          currentPage: "Home",
        });
      }
    })
    .catch((error) => {
      console.log("Error while fetching home details: ", error);
      res.redirect("/homes");
    });
};

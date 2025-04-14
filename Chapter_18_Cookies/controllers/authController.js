exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    currentPage: "login",
    isLoggedIn: false,
  });
};

exports.postLogin = (req, res, next) => {
  console.log(req.body);
  // res.cookie("isLoggedIn", true);
  // req.isLoggedIn = true;
  req.session.isLoggedIn = true;
  res.redirect("/");
};

exports.getLogout = (req, res, next) => {
  // res.clearCookie("isLoggedIn");
  res.cookie("isLoggedIn", false);

  res.redirect("/login");
};
exports.postLogout = (req, res, next) => {
  // res.clearCookie("isLoggedIn");
  // res.cookie("isLoggedIn", false);
  req.session.destroy((err) => {
    console.log("Session destroyed", err);
    res.redirect("/login");
  });
};
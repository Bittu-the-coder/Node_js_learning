const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    currentPage: "login",
    isLoggedIn: false,
    errors: [],
    oldInput: {
      email: "",
    },
    user: {},
  });
};

exports.postLogin = [
  check('email').normalizeEmail().isEmail()
    .withMessage("Please enter a valid email address"),
  check('password').isLength({ min: 6 }).withMessage("Password should be at least 6 characters"),

  async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).render("auth/login", {
        pageTitle: "Login",
        currentPage: "login",
        isLoggedIn: false,
        errors: ["User not found"],
        oldInput: {
          email: email,
        },
        user: {},
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).render("auth/login", {
        pageTitle: "Login",
        currentPage: "login",
        isLoggedIn: false,
        errors: ["Invalid email or password"],
        oldInput: {
          email: email,
        },
        user: {}
      });
    }
    req.session.isLoggedIn = true;
    req.session.user = user;
    await req.session.save()
    res.redirect("/");
  }];

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log("Session destroyed", err);
  });
  res.redirect("/login");
};

exports.getSignup = (req, res, next) => {
  res.render("auth/register", {
    pageTitle: "Signup",
    currentPage: "signup",
    isLoggedIn: false,
    errors: [],
    oldInput: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      userType: "guest",
    },
    user: {},
  });
};

exports.postSignup = [
  // First Name validation 
  check('firstName').trim().isLength({ min: 2 })
    .withMessage("First Name should be at least 2 characters")
    .matches(/^[a-zA-Z ]+$/)
    .withMessage("First name should contains only alphabets"),

  // Last Name validation
  check('lastName').trim().isLength({ min: 2 })
    .withMessage("Last Name should be at least 2 characters")
    .matches(/^[a-zA-Z ]+$/)
    .withMessage("Last name should contains only alphabets"),

  // Email validation
  check('email').normalizeEmail().isEmail()
    .withMessage("Please enter a valid email address"),

  // Password validation
  check('password').isLength({ min: 6 })
    .withMessage("Password should be at least 6 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)
    .withMessage("Password should contain at least one uppercase letter, one lowercase letter, one number and one special character"),

  // Confirm Password validation
  check('confirm_password').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password confirmation does not match password");
    }
    return true;
  }),

  // user type validation
  check('userType').notEmpty()
    .withMessage("Please select a user type")
    .isIn(['host', 'guest'])
    .withMessage('Please select a valid user type'),

  // check terms and conditions
  check('termsAccepted').custom((value, { req }) => {
    if (!value) {
      throw new Error("You must accept the terms and conditions");
    }
    return true;
  }),

  async (req, res, next) => {
    const {
      firstName,
      lastName,
      email,
      password,
      confirm_password,
      userType,
      termsAccepted
    } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).render("auth/register", {
        pageTitle: "Signup",
        currentPage: "signup",
        isLoggedIn: false,
        errors: errors.array().map(err => err.msg),
        oldInput: {
          firstName,
          lastName,
          email,
          password,
          confirmPassword: confirm_password,
          userType,
        },
        user: {},
      });
    }

    await bcrypt.hash(password, 12)
      .then(hashedPassword => {
        const user = new User({
          firstName,
          lastName,
          email,
          password: hashedPassword,
          userType,
        });

        // Save user to database
        user
          .save()
          .then(result => {
            console.log("User created successfully");
            req.session.isLoggedIn = true;
            req.session.user = user; // Store user in session
            return res.redirect("/");
          })
          .catch(err => {
            console.error("Error saving user to database", err);
            return res.status(422).render("auth/register", {
              pageTitle: "Signup",
              currentPage: "signup",
              isLoggedIn: false,
              errors: [err.message],
              oldInput: {
                firstName,
                lastName,
                email,
                password,
                confirmPassword: confirm_password,
                userType,
              },
              user: {},
            });
          });
      })

    // try {
    //   const user = new User({
    //     firstName,
    //     lastName,
    //     email,
    //     password,
    //     userType,
    //   });

    //   // Save user to database
    //   await user.save();

    //   console.log("User created successfully");
    //   req.session.isLoggedIn = true;
    //   req.session.user = user; // Store user in session
    //   return res.redirect("/");

    // } catch (err) {
    //   console.error("Error saving user to database", err);

    //   // Handle duplicate email error
    //   let errorMsg = err.message;
    //   if (err.code === 11000) {
    //     errorMsg = "Email is already registered";
    //   }

    //   return res.status(422).render("auth/register", {
    //     pageTitle: "Signup",
    //     currentPage: "signup",
    //     isLoggedIn: false,
    //     errors: [errorMsg],
    //     oldInput: {
    //       firstName,
    //       lastName,
    //       email,
    //       password,
    //       confirmPassword: confirm_password,
    //       userType,
    //     },
    //   });
    // }
  }
];
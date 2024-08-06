const passport = require("passport");
const local = require("passport-local");
const gitHubStrategy = require("passport-github2");
const jwt = require("passport-jwt");

const UserModel = require("../models/user.model.js");
const { createHash, isValidPassword } = require("../utils/hashbcryp.js");


const CartServices = require("../services/carts.services.js");
const cartServices = new CartServices();

const LocalStrategy = local.Strategy;

const JWTStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;
        if (email == "claudio@gmail.com") return done(null, false);
        try {
          let user = await UserModel.findOne({ email: email });
          if (user) return done(null, false);
          const newCartId = await cartServices.createCart();

          let newUser = {
            first_name,
            last_name,
            email,
            age,
            rol: "user",
            password: createHash(password),
            cart: newCartId.id,
            documents: [],
          };

          let result = await UserModel.create(newUser);
          return done(null, result);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async (email, password, done) => {
        if (email == "claudio@gmail.com" && password == "claudio1234") {
          const user = {
            _id: 1,
            email: email,
            password: password,
            first_name: "admin_name",
            last_name: "admin_last_name",
            age: 30,
            rol: "admin",
            cart: "1",
            documents: [],
          };
          return done(null, user);
        } else {
          try {
            const user = await UserModel.findOne({ email });
            if (!user) {
              console.log("User doest exist");
              return done(null, false);
            }
            if (!isValidPassword(password, user)) return done(null, false);
            return done(null, user);
          } catch (error) {
            return done(error);
          }
        }
      }
    )
  );

  passport.use(
    "github",
    new gitHubStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await UserModel.findOne({ email: profile._json.email });
          if (!user) {
            const newCartId = await cartServices.createCart();

            let newUser = {
              first_name: profile._json.name,
              last_name: "secreto",
              age: 25,
              email: profile._json.email,
              rol: "user",
              password: "secreto",
              cart: newCartId.id,
            };

            //Una vez que tengo el nuevo usuario, lo guardo en MongoDB
            let result = await UserModel.create(newUser);
            done(null, result);
          } else {
            done(null, user);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: "coderhouse",
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "current",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: "coderhouse",
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload);
        } catch (error) {
          return done(error);
        }
      }
    )
  );  
};

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["coderCookieToken"];
  }
  return token;
};

module.exports = initializePassport;
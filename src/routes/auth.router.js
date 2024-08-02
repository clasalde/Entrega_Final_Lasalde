const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

const AuthController = require("../controller/auth.controller.js");
const authController = new AuthController();

const upload = require("../middlewares/multer.js");

router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/views/login?error=true",
    session: false,
  }),
  authController.login
);

router.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "/views/register?error=true",
    session: false,
  }),
  authController.register
);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"], session: false }),
  authController.github
);

router.get(
  "/githubcallback",
  passport.authenticate("github", {
    failureRedirect: "/views/login?error=true",
    session: false,
  }),
  authController.githubcallback
);

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  authController.current
);

router.get("/logout", authController.logout);

router.post("/requestPasswordReset", authController.requestPasswordReset);

router.post("/reset-password", authController.resetPassword);

router.put("/change_rol/:uid/:rol", authController.changeRol);

router.post(
  "/:uid/documents",
  upload.fields([
    { name: "document" },
    { name: "products" },
    { name: "profile" },
  ]),
  authController.uploadUserFile
);

module.exports = router;

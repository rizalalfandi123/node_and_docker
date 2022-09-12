const express = require("express");
const userController = require("../controllers/user-controller");

const routers = express.Router();

routers.post("/signup", userController.signUp);
routers.post("/signin", userController.signIn);

module.exports = routers;

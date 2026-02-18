const express = require("express");
// the meaning of above line is to requiring express js in the file
//Express = Node.js ka web framework
const authController = require("../controllers/auth.controller");
// here the authController is 

const router = express.Router();
//Router object ban raha hai
//Routes ko group karne ke liye

router.post("/register", authController.userRegisterController);
/*Method: POST
Path: /register
Handler: userRegisterController function */
router.post("/login", authController.userLoginController);
/*Method: POST
Path: /login
Handler: userLoginController function */

module.exports = router;
const  Router = require("express");
const {doSignup, doLogin} = require("../../controllers/user/authController.js");

const router=Router();

// @desc login user
// @body email or mobileNumber, password
// @return null
router.post("/signin", doLogin );

// @desc login user
// @body firstName,lastName, email or mobileNumber, password
// @return null
router.post("/signup", doSignup);


module.exports=router;
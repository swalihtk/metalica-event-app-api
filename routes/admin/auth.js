const router=require("express").Router();
const {authAdmin, authWithEmail, checkAdminLogedin} =require("../../controllers/admin/authController");

// @desc authenticate admin
// @body email,password
// @return null
router.post("/signin", authAdmin);

// @desc authenticate with email
// @body email
// @return 
router.post("/signin-with-email", authWithEmail);


// @desc check admin logedin
// @return null
router.get("/check-admin-logedin", checkAdminLogedin);

module.exports=router;
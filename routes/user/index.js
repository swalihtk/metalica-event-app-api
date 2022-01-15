const  Router = require("express");
const auth=require("./auth");
const router=Router();

// auth router
router.use("/auth", auth);

module.exports=router;
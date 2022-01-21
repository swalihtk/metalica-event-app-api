const  Router = require("express");
const auth=require("./auth");
const router=Router();
const category=require("./category");

// auth router
router.use("/auth", auth);

// category router
router.use("/category", category);

module.exports=router;
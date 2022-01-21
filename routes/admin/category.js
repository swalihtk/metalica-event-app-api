const router=require("express").Router();
const {categoryAddValidater} = require("../../middlewares/admin/categoryValidation");
const {createMainCategory} = require("../../controllers/admin/categoryController");

// @desc create main category
// @body categoryName, description
// @return null
router.post("/create", categoryAddValidater, createMainCategory);

// @desc add sub category

// @desc edit main category

// @desc delete main category

// @desc edit subcategory

// @desc delete subcategory

module.exports=router;
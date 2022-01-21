const Category=require("../../models/admin/category");
const {validationResult}=require("express-validator");

module.exports={
    createMainCategory:async function(req,res){
        try{
            // validation
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.json(errors);
                return;
            }

            let {categoryName, description}=req.body;

            let existingCategory=await Category.findOne({categoryName});

            if(!existingCategory){
                let newCat=await new Category({
                    categoryName,description
                })
                let saveCat=await newCat.save();
                res.json(saveCat);
            }else{
                res.json({code:402, error:"category already exists"});
            }
        }catch(e){
            res.json({code:500, error:"server error"});
        }
    },
    addSubCategory:async function(req,res){
        try{
            // validation
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.json(errors);
                return;
            }

        }catch(e){
            res.json({code:500, error:"server error"});
        }
    },
    deleteMainCategory:async function(req,res){
        try{
            // validation
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.json(errors);
                return;
            }

        }catch(e){
            res.json({code:500, error:"server error"});
        }
    },
    editMainCategory:async function(req,res){
        try{
            // validation
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.json(errors);
                return;
            }

        }catch(e){
            res.json({code:500, error:"server error"});
        }
    },
    deleteSubCategory:async function(req,res){
        try{
            // validation
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.json(errors);
                return;
            }

        }catch(e){
            res.json({code:500, error:"server error"});
        }
    },
    editSubCategory:async function(req,res){
        try{
            // validation
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.json(errors);
                return;
            }

        }catch(e){
            res.json({code:500, error:"server error"});
        }
    }
}
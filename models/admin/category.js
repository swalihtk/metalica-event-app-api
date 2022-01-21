const mongoose=require("mongoose");

const subCategorySchema=new mongoose.Schema({
    subCategoryName:{
        type:String,
    },
    imageUrl:{
        type:String
    }
})
const categorySchema=new mongoose.Schema({
    categoryName:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },

    subCategorys:[
        subCategorySchema
    ]
})


module.exports=mongoose.model("category", categorySchema);
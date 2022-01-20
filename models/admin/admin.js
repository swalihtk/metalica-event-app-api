const mongoose=require("mongoose");

const adminSchema=new mongoose.Schema({
    email: {
        type: String
      },
      password: {
        type: String,
      },
      firstname: {
        type: String,
      },
      lastname: {
        type: String,
      },
      profileImage: {
        type: String
      },
})

module.exports=mongoose.model("admin", adminSchema);
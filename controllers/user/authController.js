const user = require("../../models/user/user.js");
const crypto = require("crypto");
const jwt=require("jsonwebtoken");

module.exports = {
  doSignup: async (req, res) => {
    try {
      let { email, mobileNumber } = req.body;

      // check existing user
      let existingUser;
      if (email) {
        existingUser = await user.findOne({ email: email });
      } else {
        existingUser = await user.findOne({ mobileNumber: mobileNumber });
      }

      if (existingUser) {
        res.json({ error: "User Already registerd" });
      } else {
        req.body.password = await crypto
          .createHmac("sha256", req.body.password)
          .update("secret")
          .digest("hex");
        let newUser = await new user(req.body);
        let saveUser = await newUser.save();
        res.json(saveUser);
      }
    } catch (e) {
      res.status(402).json({ error: "something went wrong!" });
    }
  },

//   loginuser
  doLogin:async function(req,res){
      try{

        let {email, mobileNumber, password}=req.body;

        let checkUserExist;
        if(email){
            checkUserExist=await user.findOne({email})
        }else{
            checkUserExist=await user.findOne({mobileNumber});
        }

        if(!checkUserExist){
            res.json({error:"User not found"});
            return;
        }

        let hashPassword=await crypto.createHmac("sha256", password).update("secret").digest("hex");
        if(checkUserExist.password===hashPassword){
            let userToken=await jwt.sign({id:checkUserExist._id}, process.env.JWT_SECRET);
            res.json({success:true, userToken});
        }else{
            res.json({error:"validation failed"});
        }

      }catch(e){
          console.log(e);
          res.json({error:"something went wrong"});
      }
  }
};

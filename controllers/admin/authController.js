const Admin = require("../../models/admin/admin");
const crypto = require("crypto");

module.exports = {
  authAdmin: async function (req, res) {
    try {
      let { email, password } = req.body;

      let existingAdmin = Admin.findOne({ email: email });

      if (!existingAdmin) {
        res.json({ code: 404, error: "admin not found" });
      } else {
        let hashPassword = crypto
          .createHmac("sha256", password)
          .update("secret")
          .digest("hex");

        if (hashPassword !== existingAdmin) {
          res.json({ code: 404, error: "Authentication failed" });
        } else {
          let adminToken = await jwt.sign(
            { id: existingAdmin._id },
            process.env.JWT_SECRET
          );
          res.cookie(adminToken).send();
        }
      }
    } catch (e) {
      res.json({ code: 500, error: "something went wrong!" });
    }
  },

  authWithEmail: async function (req, res) {
    try {
      let { email } = req.body;
      let existingAdmin = Admin.findOne({ email: email });

      if (!existingAdmin) {
        res.json({ code: 404, error: "admin not found" });
      } else {
        let adminToken = await jwt.sign(
          { id: existingAdmin._id },
          process.env.JWT_SECRET
        );
        res.cookie("atoken", adminToken, {
            maxAge:10000000
        }).send();
      }
    } catch (e) {
      res.json({ code: 500, error: "something went wrong" });
    }
  },

  checkAdminLogedin:async function(req,res){
      try{
        let {utoken}=req.cookies;
        if(utoken){
            res.json({logedin:true});
        }else{
            res.json({logedin:false});
        }
      }catch(e){
          res.json({code:500, error:"something went wrong", logedin:false});
      }
  }
};

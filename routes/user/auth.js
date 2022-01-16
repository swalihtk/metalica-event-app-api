const  Router = require("express");
const {doSignup, doLogin, doLoginWithGoogle, getMobileOtp, verifyMobileOtp} = require("../../controllers/user/authController.js");
const {doLoginValidater, doSignupValidater, doLoginWithEmailValidater, mobileNumberForOtpValidater, mobileOtpVerifyValidater} = require("../../middlewares/user/authValidations");

const router=Router();

// @desc login user
// @body email or mobileNumber, password
// @return null
router.post("/signin",doLoginValidater, doLogin );

// @desc login user
// @body firstname,lastname, email or mobileNumber, password
// @return null
router.post("/signup",doSignupValidater, doSignup);

// @desc login user with google auth
// @body firstName,lastName, email, profileImage
// @return null
router.post("/signin_google",doLoginWithEmailValidater, doLoginWithGoogle);

// @desc login with otp
// @body mobileNumber, countryCode
// @return null
router.post("/get_mobile_otp",mobileNumberForOtpValidater, getMobileOtp);

// @desc login with otp
// @body mobileNumber, otp
// @return null
router.post("/verify_mobile_otp",mobileOtpVerifyValidater, verifyMobileOtp);



module.exports=router;
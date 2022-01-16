const { body, oneOf } = require('express-validator');


module.exports={
    doLoginValidater:[
        oneOf([
            [body("email").exists(), body("email").isEmail()],
            [body("mobileNumber").exists()]
        ]),
        body("password").isString()
    ],

    doSignupValidater:[
        // firstname,lastname, email or mobileNumber, password
        oneOf([
            [body("email").exists(), body("email").isEmail()],
            [body("mobileNumber").exists()]
        ]),
        [body("password").isString(), body("password").exists()],
        [body("firstname").isString().trim(), body("firstname").exists()],
        [body("lastname").isString().trim(), body("lastname").exists()],
    ],

    doLoginWithEmailValidater:[
        [body("email").exists(), body("email").isEmail()],
        [body("firstname").isString().trim(), body("firstname").exists()],
        [body("lastname").isString().trim(), body("lastname").exists()],
    ],


    mobileNumberForOtpValidater:[
        // mobileNumber, countryCode
        [body("mobileNumber").exists()],
        [body("countryCode").exists()]
    ],

    mobileOtpVerifyValidater:[
        //  mobileNumber, otp
        [body("mobileNumber").exists()],
        [body("otp").exists()]
    ]
}
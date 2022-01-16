const accountId=process.env.TWILIO_ACCOUNT_SID;
const authToken=process.env.TWILIO_AUTH_TOKEN;

const twilioClient=require("twilio")(accountId, authToken);

module.exports=twilioClient;
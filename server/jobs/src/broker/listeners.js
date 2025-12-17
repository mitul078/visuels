const {subscribeToQueue} = require("./broker")
const sendEmail = require("../jobs/email/config")
const otpEmailTemplate = require("../jobs/email/templates/otp")
const newuser = require("../jobs/email/templates/newuser")

module.exports = () => {
    subscribeToQueue("AUTH_SERVICE:EMAIL_OTP" , async(data) => {
        sendEmail(
            data.email,
            "Visuels -Email Verification Code",
            `Your verification code for Visuels signup is`,
            otpEmailTemplate(data.otp)
        )
    })

    subscribeToQueue("AUTH_SERVICE:USER_CREATED" , async (data) => {
        sendEmail(
            data.email,
            "Visuels - User registered",
            "You are successfully registered at visuels",
            newuser(data.name , data.username , data.role , data.email)
        )
    })
}
const {subscribeToQueue} = require("./broker")
const sendEmail = require("../jobs/email/config")
const otpEmailTemplate = require("../jobs/email/templates/otp")

module.exports = () => {
    subscribeToQueue("AUTH_SERVICE:EMAIL_OTP" , async(data) => {
        sendEmail(
            data.email,
            "Visuels -Email Verification Code",
            `Your verification code for Visuels signup is`,
            otpEmailTemplate(data.otp)
        )
    })
}
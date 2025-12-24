const {subscribeToQueue} = require("./broker")
const sendEmail = require("../jobs/email/config")
const otpEmailTemplate = require("../jobs/email/templates/otp")
const newuser = require("../jobs/email/templates/newuser")
const newOrder = require("../jobs/email/templates/newOrder")
const orderPlacedSuccessfully = require("../jobs/email/templates/placeOrder")

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

    subscribeToQueue("ORDER_DETAIL:ARTIST" , async (data) => {
        sendEmail(
            data.email,
            "Visuels -New Order",
            "A new Order just received at visuels.",
            newOrder(data.name , data.product , data.customerDetail , data.orderId)
        )
    })

    subscribeToQueue("ORDER_DETAIL:USER" , async(data) => {
        sendEmail(
            data.customerDetail.email,
            "Visuels -Order Placed",
            "Your order has been placed",
            orderPlacedSuccessfully(
                data.customerDetail , data.artistDetail , data.product , data.orderId
            )
        )
    })
}
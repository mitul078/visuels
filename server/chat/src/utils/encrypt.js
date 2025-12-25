const CryptoJS = require("crypto-js")

const SECRET_KEY = process.env.MESSAGE_SECRET

exports.encrypt = (text) =>
    CryptoJS.AES.encrypt(text, SECRET_KEY).toString()

exports.decrypt = (cipher) =>
    CryptoJS.AES.decrypt(cipher, SECRET_KEY).toString(CryptoJS.enc.Utf8)

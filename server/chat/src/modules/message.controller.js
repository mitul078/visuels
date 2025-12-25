const Message = require("./message.model")
const Chat = require("./chat.model")
const AppError = require("../utils/AppError")
const { artists, users } = require("../services/auth.service")


//logged as a user
// i am a user
// senderId =  req.user.id
// check that params id was a artist for that fetch all the user with role artist 
// communication possible

// logged as a artist
// i am a artist
// senderId = req.user.id
// check that params id was a user for that fetch all the user with role user
// communication possible
exports.send_message = async (req, res, next) => {
    
    try {
        if (req.user.role === "USER") {
            const userId = req.user.id
            
            const artistIds = await artists(userId)
            console.log(artistIds)

        }
        else if (req.user.role === "ARTIST") {
            const userId = req.authType === "USER" ? req.user.id : req.userId
            
        }

    } catch (error) {
        next(error)
    }
}


// exports.get_message = async (req, res, next) => {
//     try {

//         const user_1 = req.user.id
//         const { id: user_2 } = req.params

//         const chat = await Chat.findOne({ participants: { $all: [user_1, user_2] } }).populate("messages")

//         if (!chat)
//             return next(new AppError("Chat not found", 404))

//         res.status(200).json({ chat })


//     } catch (error) {
//         next(error)
//     }
// }
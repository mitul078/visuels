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
        const { content, type } = req.body

        if (req.user.role === "USER") {
            const userId = req.user.id
            const artistId = req.params.id

            const artistIds = await artists(userId)
            const artistList = artistIds.map(a => a._id.toString())

            if (!artistList.includes(artistId)) {
                return next(new AppError("Artist not found", 404))
            }

            let chat = await Chat.findOne({
                participants: { $all: [userId, artistId] }
            })

            if (!chat) {
                chat = await Chat.create({
                    participants: [userId, artistId]
                })
            }

            const message = await Message.create({
                chatId: chat._id,
                senderId: userId,
                senderRole: "USER",
                content,
                type
            })

            chat.messages.push(message._id)
            await chat.save()

            return res.status(201).json({ msg: "Message sent" })
        }

        if (req.user.role === "ARTIST") {
            const artistId = req.user.id
            const userId = req.params.id

            const usersArr = await users(artistId)
            const usersList = usersArr.map(u => u._id.toString())

            if (!usersList.includes(userId)) {
                return next(new AppError("User not found", 404))
            }

            let chat = await Chat.findOne({
                participants: { $all: [artistId, userId] }
            })

            if (!chat) {
                chat = await Chat.create({
                    participants: [artistId, userId]
                })
            }

            const message = await Message.create({
                chatId: chat._id,
                senderId: artistId,
                senderRole: "ARTIST",
                content,
                type
            })

            chat.messages.push(message._id)
            await chat.save()

            return res.status(201).json({ msg: "Message sent" })
        }

    } catch (error) {
        next(error)
    }
}




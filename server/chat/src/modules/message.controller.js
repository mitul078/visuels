const Message = require("./message.model")
const Chat = require("./chat.model")
const { encrypt } = require("../utils/encrypt")
const { user, check_exist } = require("../services/auth.service")
const AppError = require("../utils/AppError")

exports.send_message = async (req, res, next) => {
    try {
        const { content, type } = req.body


        if (!content || !content.trim()) {
            return next(new AppError("Message content required", 400));
        }

        const senderId = req.user.id
        const { id: receiverId } = req.params

        
        const result = await check_exist(receiverId, senderId)
        

        if (!result.valid) {
            return next(new AppError("Receiver invalid", 404))
        }

        const chat = await Chat.findOneAndUpdate(
            { participants: { $all: [senderId, receiverId] } },
            {
                $setOnInsert: { participants: [senderId, receiverId] },
                $set: {
                    lastMessage: encrypt(content),
                    lastMessageAt: Date.now()
                }
            },
            { new: true, upsert: true }
        );


        await Message.create({
            chatId: chat._id,
            senderId,
            type,
            content: encrypt(content)
        })

        res.status(201).json({
            msg: "Message sent"
        })


    } catch (error) {
        next(error)
    }
}




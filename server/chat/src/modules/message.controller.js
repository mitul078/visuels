const Message = require("./message.model")
const Chat = require("./chat.model")
const { encrypt, decrypt } = require("../utils/encrypt")
const { check_exist } = require("../services/auth.service")
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


        if (!result || !result.valid) {
            return next(new AppError("Receiver invalid", 404))
        }

        const participants = [senderId, receiverId].sort()


        const chat = await Chat.findOneAndUpdate(
            { participants },
            {
                $setOnInsert: { participants },
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


exports.get_message = async (req, res, next) => {
    try {

        const { id: receiverId } = req.params

        const senderId = req.user.id

        const result = await check_exist(receiverId, senderId)

        if (!result || !result.valid) {
            return next(new AppError("Receiver invalid", 404))
        }

        const participants = [senderId, receiverId].sort()

        const chat = await Chat.findOne({ participants })

        if (!chat) {
            return res.status(200).json({
                status: true,
                data: []
            })
        }

        const message = await Message.find({ chatId: chat._id }).sort({ createdAt: 1 })

        const decryptMessage = message.map(msg => ({
            ...msg._doc,
            content: decrypt(msg.content)
        }))

        res.status(200).json({ msg: "fetched msgs", msg: decryptMessage })

    } catch (error) {
        next(error)
    }
}



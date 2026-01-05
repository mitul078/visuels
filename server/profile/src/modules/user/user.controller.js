const User = require("./user.model")


exports.me = async (req, res, next) => {
    try {

        const user = req.user

        if (!user) return next(new AppError("User not logged in", 401))

        const userId = user.id
        const profile = await User.findOneAndUpdate(
            { userId },
            { $setOnInsert: { userId } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        )

        return res.status(200).json({
            success: true,
            profile
        })


    } catch (error) {
        next(error)
    }
}

exports.update_profile = async (req, res, next) => {
    try {

        const { phone, city, address, state, country, firstName, lastName, dateOfBirth, pinCode } = req.body

        const userId = req.user.id

        const updateData = {}
        if (phone) updateData.phone = phone
        if (city) updateData.city = city
        if (address) updateData.address = address
        if (state) updateData.state = state
        if (country) updateData.country = country
        if (firstName) updateData.firstName = firstName
        if (lastName) updateData.lastName = lastName
        if (dateOfBirth) updateData.dateOfBirth = dateOfBirth
        if (pinCode) updateData.pinCode = pinCode

        if (firstName && lastName && phone && city && country && address) {
            updateData.isProfileCompleted = true
        }

        const user = await User.findOneAndUpdate(
            { userId },
            { $set: updateData },
            { new: true, runValidators: true }
        )
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user
        })


    } catch (error) {
        next(error)
    }
}

const Artist = require("./artist.model")
const AppError = require("../../utils/AppError")
const imagekit = require("../../config/imagekit")
const { deleteImage } = require("../../utils/imagekit-delete")

exports.me = async (req, res, next) => {
    try {
        const artist = req.user
        if (!artist) {
            return next(new AppError("Artist not logged in", 401))
        }

        const artistId = artist.id

        const profile = await Artist.findOneAndUpdate(
            { artistId },
            { $setOnInsert: { artistId } },
            {
                new: true,
                upsert: true,
                setDefaultsOnInsert: true
            }
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
        const artistId = req.user.id

        const {
            bio,
            city,
            state,
            about,
            specialist,
            stylesAndThemes,
            languages
        } = req.body

        const updateData = {}

        if (bio) updateData.bio = bio
        if (city) updateData.city = city
        if (state) updateData.state = state
        if (about) updateData.about = about
        if (specialist) updateData.specialist = JSON.parse(specialist)
        if (stylesAndThemes) updateData.stylesAndThemes = JSON.parse(stylesAndThemes)
        if (languages) updateData.languages = JSON.parse(languages)

        // Fetch existing profile ONCE
        const existingProfile = await Artist.findOne({ artistId })
        if (!existingProfile) {
            return next(new AppError("Artist profile not found", 404))
        }

        /* ---------- AVATAR ---------- */
        if (req.files?.avatar) {
            if (existingProfile.avatar?.fileId) {
                await deleteImage(existingProfile.avatar.fileId)
            }

            const avatarFile = req.files.avatar[0]

            const uploadedAvatar = await imagekit.upload({
                file: avatarFile.buffer,
                fileName: `artist-avatar-${artistId}`,
                folder: "/artists/avatars"
            })

            updateData.avatar = {
                url: uploadedAvatar.url,
                fileId: uploadedAvatar.fileId
            }
        }

        /* ---------- BANNER ---------- */
        if (req.files?.banner) {
            if (existingProfile.banner?.fileId) {
                await deleteImage(existingProfile.banner.fileId)
            }

            const bannerFile = req.files.banner[0]

            const uploadedBanner = await imagekit.upload({
                file: bannerFile.buffer,
                fileName: `artist-banner-${artistId}`,
                folder: "/artists/banners"
            })

            updateData.banner = {
                url: uploadedBanner.url,
                fileId: uploadedBanner.fileId
            }
        }

        // Profile completion logic
        if (
            (bio || existingProfile.bio) &&
            (city || existingProfile.city) &&
            (state || existingProfile.state) &&
            (about || existingProfile.about) &&
            (updateData.avatar || existingProfile.avatar?.url) &&
            (updateData.banner || existingProfile.banner?.url)
        ) {
            updateData.isProfileCompleted = true
        }

        const profile = await Artist.findOneAndUpdate(
            { artistId },
            { $set: updateData },
            { new: true, runValidators: true }
        )

        res.status(200).json({
            success: true,
            message: "Artist profile updated",
            profile
        })

    } catch (error) {
        next(error)
    }
}

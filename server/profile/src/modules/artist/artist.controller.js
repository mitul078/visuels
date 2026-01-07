const Artist = require("./artist.model")
const AppError = require("../../utils/AppError")
const imagekit = require("../../config/imagekit")
const { deleteImage } = require("../../utils/imagekit-delete")
const { get_artist } = require("../../services/auth.service")

exports.me = async (req, res, next) => {
    try {
        const artist = req.user
        if (!artist) {
            return next(new AppError("Artist not logged in", 401))
        }

        const artistId = artist.id

        const profile = await Artist.findOne({ artistId })

        return res.status(200).json({
            success: true,
            profile
        })

    } catch (error) {
        next(error)
    }
}

exports.complete_artist_profile = async (req, res, next) => {
    try {

        const artistId = req.user.id
        const { bio, city, state, country, about, specialist, stylesAndThemes, languages } = req.body

        if (!bio || !city || !state || !country || !specialist || !stylesAndThemes || !languages) {
            return res.status(400).json({
                success: false,
                message: "Please complete all required artist details"
            })
        }

        const artistDetail = await get_artist(artistId, artistId)

        const profile = await Artist.findOneAndUpdate(
            { artistId },
            {
                $setOnInsert:
                {
                    artistId,
                    artist: {
                        username: artistDetail.username,
                        name: artistDetail.name,
                        email: artistDetail.email
                    }
                }
            },
            {
                new: true,
                upsert: true,
                setDefaultsOnInsert: true
            }
        )


        if (profile.isProfileCompleted) {
            return res.status(400).json({
                success: false,
                message: "Artist profile already completed"
            })
        }

        profile.bio = bio
        profile.city = city
        profile.state = state
        profile.country = country
        profile.about = about || ""

        profile.specialist = Array.isArray(specialist) ? specialist : specialist.split(",")

        profile.stylesAndThemes = Array.isArray(stylesAndThemes) ? stylesAndThemes : stylesAndThemes.split(",")

        profile.languages = Array.isArray(languages) ? languages : languages.split(",")


        if (req.files?.avatar) {
            const avatarFile = req.files.avatar[0]

            const uploadedAvatar = await imagekit.upload({
                file: avatarFile.buffer,
                fileName: `artist-avatar-${artistId}-${Date.now()}`,
                folder: "/artists/avatars"
            })

            profile.avatar = {
                url: uploadedAvatar.url,
                fileId: uploadedAvatar.fileId
            }
        }

        if (req.files?.banner) {
            const bannerFile = req.files.banner[0]

            const uploadedBanner = await imagekit.upload({
                file: bannerFile.buffer,
                fileName: `artist-banner-${artistId}-${Date.now()}`,
                folder: "/artists/banners"
            })

            profile.banner = {
                url: uploadedBanner.url,
                fileId: uploadedBanner.fileId
            }
        }

        profile.isProfileCompleted = true
        profile.joiningDate = profile.joiningDate || new Date()

        await profile.save()

        return res.status(200).json({
            success: true,
            message: "Artist profile completed successfully",
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
            country,
            about,
            specialist,
            stylesAndThemes,
            languages
        } = req.body

        const updateData = {}

        if (bio) updateData.bio = bio
        if (city) updateData.city = city
        if (state) updateData.state = state
        if (country) updateData.country = country
        if (about) updateData.about = about
        if (specialist) updateData.specialist = JSON.parse(specialist)
        if (stylesAndThemes) updateData.stylesAndThemes = JSON.parse(stylesAndThemes)
        if (languages) updateData.languages = JSON.parse(languages)

        const existingProfile = await Artist.findOne({ artistId })
        if (!existingProfile) {
            return next(new AppError("Artist profile not found", 404))
        }

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


exports.artist_profile = async (req, res, next) => {
    try {

        const { id: artistId } = req.params

        const artist = await Artist.findOne({ artistId }).select("artist city state bio specialist totalArtworks followers avatar banner")

        if (!artist) {
            return next(new AppError("Artist not found", 404))
        }

        res.status(200).json({
            artist
        })

    } catch (error) {
        next(error)
    }
}

exports.artist_full_profile = async (req, res, next) => {
    try {

        const { id: artistId } = req.params
        const artist = await Artist.findOne({ artistId })

        if (!artist) return next(new AppError("Artist not found", 404))

        return res.status(200).json({
            artist
        })

    } catch (error) {
        next(error)
    }
}
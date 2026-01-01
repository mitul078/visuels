"use client"

import React, { useRef, useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import "./top_artist.scss"
import "swiper/css"
import "swiper/css/navigation"

const TopArtist = () => {
    const swiperRef = useRef(null)
    const prevRef = useRef(null)
    const nextRef = useRef(null)

    useEffect(() => {
        if (
            swiperRef.current &&
            prevRef.current &&
            nextRef.current
        ) {
            swiperRef.current.params.navigation.prevEl = prevRef.current
            swiperRef.current.params.navigation.nextEl = nextRef.current

            swiperRef.current.navigation.destroy()
            swiperRef.current.navigation.init()
            swiperRef.current.navigation.update()
        }
    }, [])

    return (
        <div className="relative">
            <Swiper
                modules={[Navigation]}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className="slide h-[500px]">
                        <div className="artist-image"></div>
                        <div className="artist-data">
                            <h1 className="name">Artist</h1>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="slide h-[500px]">
                        <div className="artist-image"></div>
                        <div className="artist-data">
                            <h1 className="name">Artist</h1>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="slide h-[500px]">
                        <div className="artist-image"></div>
                        <div className="artist-data">
                            <h1 className="name">Artist</h1>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="slide h-[500px]">
                        <div className="artist-image"></div>
                        <div className="artist-data">
                            <h1 className="name">Artist</h1>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="slide h-[500px]">
                        <div className="artist-image"></div>
                        <div className="artist-data">
                            <h1 className="name">Artist</h1>
                        </div>
                    </div>
                </SwiperSlide>


            </Swiper>

            {/* Custom Navigation */}
            <div className="absolute bottom-4 right-4 flex gap-3 z-10">
                <button
                    ref={prevRef}
                    className="w-10 h-10  icon"
                >
                    ←
                </button>

                <button
                    ref={nextRef}
                    className="w-10 h-10  icon"
                >
                    →
                </button>
            </div>
        </div>
    )
}

export default TopArtist

"use client";
import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const [currentIndex, setcurrentIndex] = useState(1);
    const [hasClicked, sethasClicked] = useState(false);
    const [isLoading, setisLoading] = useState(true);

    const totalVideos = 4;
    const nextVideoRef = useRef<HTMLVideoElement | null>(null);
    const nextVideo = nextVideoRef.current;

    const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

    const handleMiniVideoClick = () => {
        sethasClicked(true);
        setcurrentIndex(upcomingVideoIndex);
    };

    const getVideoSrc = (index: number) => `videos/hero-${index}.mp4`;

    useGSAP(
        () => {
            if (hasClicked && nextVideo) {
                gsap.set("#next-video", { visibility: "visible" });
                gsap.to("#next-video", {
                    transformOrigin: "center center",
                    width: "100%",
                    height: "100%",
                    duration: 1,
                    ease: "power1.inOut",
                    onStart: () => {
                        nextVideo.play();
                    },
                });
                gsap.from("#current-video", {
                    transformOrigin: "center center",
                    scale: 0,
                    duration: 1.5,
                    ease: "power1.inOut",
                });
            }
        },
        { dependencies: [currentIndex], revertOnUpdate: true }
    );

    useGSAP(() => {
        gsap.set("#video-frame", {
            clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)",
            borderRadius: "0 0 40% 10%",
        });
        gsap.from("#video-frame", {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            borderRadius: "0 0 0 0",
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: "#video-frame",
                start: "center center",
                end: "bottom center",
                scrub: true,
            },
        });
    });

    return (
        <div className="relative h-dvh w-screen overflow-x-hidden">
            <div id="video-frame" className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75">
                <div>
                    <div className="mask-clip-path absolute-center z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
                        <div
                            onClick={handleMiniVideoClick}
                            className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
                        >
                            <video
                                ref={nextVideoRef}
                                src={getVideoSrc(upcomingVideoIndex)}
                                loop
                                preload="auto"
                                muted
                                id="current-video"
                                className="size-64 origin-center scale-150 object-cover object-center"
                            />
                        </div>
                    </div>
                    <video
                        ref={nextVideoRef}
                        src={getVideoSrc(currentIndex)}
                        loop
                        preload="auto"
                        muted
                        id="next-video"
                        className="absolute-center invisible z-20 size-64 object-cover object-center"
                    />

                    <video
                        src={getVideoSrc(currentIndex == totalVideos - 1 ? 1 : currentIndex)}
                        autoPlay
                        loop
                        preload="auto"
                        muted
                        className="absolute left-0 top-0 size-full object-cover object-center"
                    />
                </div>
                <h1 className="special-font hero-heading absolute bottom-5 right-6 z-40 text-blue-75">
                    G<b>a</b>ming
                </h1>

                <div className="absolute left-0 top-0 z-40 size-full">
                    <div className="mt-24 px-5 sm:px-10">
                        <h1 className="special-font hero-heading text-blue-100">
                            redefi<b>n</b>e
                        </h1>
                        <p className="mb-5 max-w-64 font-[robert-regular] text-blue-100">
                            Enter the Metagame Layer <br></br>Unleash the Play Economy.
                        </p>
                        <Button
                            id="watch-trailer"
                            title="Watch Trailer"
                            leftIcon={<TiLocationArrow />}
                            containerClass="!bg-yellow-300 flex-center gap-1"
                        />
                    </div>
                </div>
            </div>
            <h1 className="special-font hero-heading absolute bottom-5 right-6 text-black">
                G<b>a</b>ming
            </h1>
        </div>
    );
};

export default Hero;

"use client";
import React, { useRef, useState, useEffect } from "react";
import { TiLocationArrow } from "react-icons/ti";
import Button from "./Button";
import { useWindowScroll } from "react-use";
import gsap from "gsap";

const navItems = ["Nexus", "Vault", "Prologue", "About", "Contact"];

const Navbar = () => {
    const navContainerRef = useRef<HTMLDivElement | null>(null);
    const audioElementRef = useRef<HTMLAudioElement | null>(null);

    const [isAudioPlaying, setisAudioPlaying] = useState<boolean>(false);
    const [isIndicatorActive, setisIndicatorActive] = useState(false);
    const [lastScrollY, setlastScrollY] = useState(0);
    const [isNavVisible, setisNavVisible] = useState(true);

    const { y: currentScrollY } = useWindowScroll();

    const toggleAudioIndicator = () => {
        setisAudioPlaying((prev) => !prev);
        setisIndicatorActive((prev) => !prev);
    };

    useEffect(() => {
        const audio = audioElementRef.current;
        if (audio) {
            if (isAudioPlaying) {
                audio.play();
            } else {
                audio.pause();
            }
        }
    }, [isAudioPlaying]);

    useEffect(() => {
        const navContainer = navContainerRef.current;

        if (navContainer) {
            if (currentScrollY === 0) {
                setisNavVisible(true);
                navContainer.classList.remove("floating-nav");
            } else if (currentScrollY > lastScrollY) {
                setisNavVisible(false);
                navContainer.classList.add("floating-nav");
            } else if (currentScrollY < lastScrollY) {
                setisNavVisible(true);
                navContainer.classList.add("floating-nav");
            }
        }

        setlastScrollY(currentScrollY);
    }, [currentScrollY, lastScrollY]);

    useEffect(() => {
        gsap.to(navContainerRef.current, {
            y: isNavVisible ? 0 : -100,
            opacity: isNavVisible ? 1 : 0,
            duration: 0.2,
        });
    }, [isNavVisible]);

    return (
        <div ref={navContainerRef} className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-600 sm:inset-x-6">
            <header className="absolute top-1/2 w-full -translate-y-1/2">
                <nav className="flex size-full items-center justify-between p-4">
                    <div className="flex items-center gap-7">
                        <img src="/img/logo.png" alt="Logo" className="w-10" />
                        <Button
                            id="product-button"
                            title="Products"
                            rightIcon={<TiLocationArrow />}
                            containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
                        ></Button>
                    </div>
                    <div className="flex h-full items-center">
                        <div className="hidden md:block">
                            {navItems.map((item) => (
                                <a key={item} href={`#${item.toLowerCase()}`} className="nav-hover-btn">
                                    {item}
                                </a>
                            ))}
                        </div>
                        <button onClick={toggleAudioIndicator} className="ml-10 flex items-center space-x-0.5 cursor-pointer">
                            <audio ref={audioElementRef} className="hidden" src="/audio/loop.mp3" loop />
                            {[1, 2, 3, 4].map((bar) => (
                                <div
                                    key={bar}
                                    className={`indicator-line ${isIndicatorActive ? "active" : ""}`}
                                    style={{ animationDelay: `${bar * 0.2}s` }}
                                />
                            ))}
                        </button>
                    </div>
                </nav>
            </header>
        </div>
    );
};

export default Navbar;

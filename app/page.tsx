import About from "@/components/About";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
    return (
        <main className="relative min-h-screen w-screen overflow-x-hidden ">
            <Navbar />
            <Hero />
            <About />
        </main>
    );
}

"use client";

import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import Loader from "../Loader/Loader";

const Hero = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const { data, isLoading, refetch } = useGetHeroDataQuery("Banner", {});

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim() === "") {
      return;
    } else {
      router.push(`/courses?title=${search}`);
    }
  };

  return (
    <>
    {
      isLoading ? (
        <Loader/>
      ) : (
        <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-[#0a0f1d] px-4 py-16 lg:px-12 transition-colors duration-300">
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Left Side: Hero Image Section */}
        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <div className="relative w-[320px] h-[320px] md:w-[450px] md:h-[450px] lg:w-[550px] lg:h-[550px] flex items-center justify-center">
            
            {/* Background Graphic: Light mode mein soft purple aura aur Dark mode mein dynamic glowing circle */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-100 to-indigo-50 dark:from-[#1d1b4c] dark:to-[#12132d] rounded-full scale-90 -z-10 opacity-70 dark:opacity-80 transition-all duration-300 hero_animation" />
            
            <Image
              src={data?.layout?.banner?.image.url}
              width={500}
              height={500}
              alt="Online Learning Illustration"
              priority
              className="object-contain w-full h-auto"
            />
          </div>
        </div>

        {/* Right Side: Hero Content Section */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left text-black dark:text-white transition-colors duration-300">
          
          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 tracking-wide text-gray-900 dark:text-white">
            {/* Improve Your Online <br />
            Learning Experience <br />
            Better Instantly */}
            {data?.layout?.banner?.title}
          </h1>
          
          {/* Subtitle / Description */}
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-xl mb-8 leading-relaxed">
            We have <span className="font-semibold text-gray-900 dark:text-white">40k+</span> Online courses &{" "}
            <span className="font-semibold text-gray-900 dark:text-white">500K+</span> {data?.layout?.banner?.subTitle}
          </p>

          {/* Search Form component */}
          <form 
            onSubmit={handleSearch} 
            className="w-full max-w-xl flex items-center bg-gray-100 dark:bg-[#22263f] rounded-md overflow-hidden p-1 mb-8 border border-gray-300 dark:border-gray-700/50 focus-within:border-blue-500 transition-all duration-300"
          >
            <input
              type="text"
              placeholder="Search Courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent px-4 py-3 text-sm md:text-base text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-[#2da5f3] hover:bg-blue-600 text-white p-3 rounded-md transition duration-300 flex items-center justify-center aspect-square"
            >
              <BiSearch size={22} />
            </button>
          </form>

          {/* Trust Indicators - Client Avatars and Text */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-3">
              <Image
                src="/assets/client-1.jpg"
                alt="Student 1"
                width={38}
                height={38}
                className="rounded-full border-2 border-white dark:border-[#0a0f1d] object-cover transition-colors duration-300"
              />
              <Image
                src="/assets/client-2.jpg"
                alt="Student 2"
                width={38}
                height={38}
                className="rounded-full border-2 border-white dark:border-[#0a0f1d] object-cover transition-colors duration-300"
              />
              <Image
                src="/assets/client-3.jpg"
                alt="Student 3"
                width={38}
                height={38}
                className="rounded-full border-2 border-white dark:border-[#0a0f1d] object-cover transition-colors duration-300"
              />
            </div>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
              <span className="font-bold text-gray-900 dark:text-white">500K+</span> People already trusted us.{" "}
              <Link href="/courses" className="text-blue-600 dark:text-[#4ade80] hover:underline font-medium ml-1">
                View Courses
              </Link>
            </p>
          </div>
        </div>

      </div>
    </section>
      )
    }
    </>
  );
};

export default Hero;

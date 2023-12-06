"use client";
import Image from "next/image";
import React, { useState, useRef } from "react";

export const Loader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const parentDivReff = useRef(null);

 
  const handleImageLoad = () => {
    setTimeout(() => {
      parentDivReff.current.style.top = "-200%";
      parentDivReff.current.style.transition = "top 2s ease-in-out";
      // setIsLoading(false);
    }, 500);
  }; 

  return (
    <>
      {isLoading && (
        <div ref={parentDivReff} className="fixed top-0 left-0 z-[9999999] h-full w-full flex items-center justify-center ">
          <Image
            src={"/appLoaderForLaptop.jpg"}
            alt="background"
            fill
            className="invert-0 dark:invert hidden sm:block"
            onLoad={handleImageLoad}
          />
          <Image
            src={"/appLoaderForPhone.jpg"}
            alt="App Loader For Phone"
            fill
            className="invert dark:invert object-contain scale-[1.05] sm:hidden"
            onLoad={handleImageLoad}
          />
        </div>
      )}
    </>
  );
};

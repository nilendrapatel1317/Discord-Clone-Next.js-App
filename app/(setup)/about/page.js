import { Button } from "@mui/material";
import { Home } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <section className="relative w-full h-screen mx-auto pt-6" id="about">
      <Link
        href="/"
        className="z-50 absolute top-5 left-5 bg-[#28e1bf] mb-3 block p-2 rounded-full text-white"
      >
        <Home size={20} />
      </Link>
      <div className="max-w-7xl mx-auto sm:px-16 px-6 flex flex-col-reverse sm:flex-row items-start gap-5">
        <div className="sm:w-2/3">
          <div>
            <p className="sm:text-[18px] text-[14px] underline text-black dark:text-white uppercase tracking-wider">
              About Developer
            </p>
            <h2 className="text-[#28e1bf] font-black md:text-[60px] sm:text-[50px] text-[40px]">
              Nilendra Patel
            </h2>
          </div>
          <p className="mt-4 text-black dark:text-white text-[17px] max-w-3xl leading-[30px]">
            Hello & Welcome 🙂
          </p>
         <p className="mt-4 text-[17px] max-w-3xl leading-[30px]">
          I am a recent graduate with a B.Tech in Computer Science Engineering, currently honing my skills in Java and web 
          development (MERN Stack). I am seeking a challenging role as a Java Developer or Web Developer, where I can 
          apply my academic knowledge and technical skills to contribute eAectively to innovative projects while 
          continuously learning and growing in a dynamic development environment. 
          </p>
          <p className="mt-4 text-[17px] max-w-3xl leading-[30px]">
            I'm a <span className="text-[#28e1bf]">quick learner</span> and
            collaborate closely with clients to create efficient, scalable, and
            user-friendly solutions that solve real-world problems.
          </p>
          <p className="mt-4 text-[#28e1bf] text-bold dark:text-white text-[25px] max-w-3xl leading-[30px]">
            Contact Details👇
          </p>
          <p className="mt-4 text-black dark:text-white text-[17px] max-w-3xl leading-[30px]"></p>
          <div className="mb-10 ps-3 md:ps-10">
            <ul>
              <li className="mt-4 text-white text-[17px] max-w-3xl leading-[30px]">
                <b>My Portfolio :</b>{" "}
                <Link href="https://nilendrapatel.vercel.app/">
                  https://nilendrapatel.vercel.app/
                </Link>
              </li>
              <li className="mt-4 text-black dark:text-white text-[17px] max-w-3xl leading-[30px]">
                <b>Email Address :</b> patelnilendra809@gmail.com
              </li>
              <li className="mt-4 text-black dark:text-white text-[17px] max-w-3xl leading-[30px]">
                <b>LinkedIn Profile URL :</b>{" "}
                <Link href="https://www.linkedin.com/in/nilendra-patel-6aaa71209/">
                  Click here to redirect
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="sm:w-1/3 pb-5 flex flex-col items-center gap-10">
          <div className="w-[340px] sm:w-[360px] h-[450px]">
            <img
              src="/MyPhotoNilendraPatel.png"
              alt=""
              className="rounded-2xl w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col items-center gap-3">
            {" "}
            <Button variant="contained" className="!bg-[#28e1bf]">
              <Link href="/Nilendra Resume 2024 with photo v3.pdf" target="_blank">
                Download CV
              </Link>
            </Button>
            <small className="text-[red]">
              Contact Details Mentioned inside the Resume
            </small>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center items-center py-5 text-center">
        <p className="text-[#28e1bf] text-4xl font-bold">Thank You 😊</p>
      </div>
    </section>
  );
};

export default page;

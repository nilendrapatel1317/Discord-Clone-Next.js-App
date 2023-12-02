import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <>
      <div className=" w-fit h-fit relative">
        <SignIn />
        <div className=" absolute left-[4%] bottom-0 h-0 w-[43%]  border-b-[28px] sm:left-0 sm:w-0 sm:top-[10%]  sm:h-[35%] sm:border-s-[28px] sm:border-b-0 border-white dark:border-zinc-900"></div>
      </div>
      <div className=" justify-center  h-full w-full absolute z-[-1] hidden sm:flex">
        <Image
          src={"/Discord.jpg"}
          alt="background"
          fill
          className="invert-0 dark:invert"
        />
      </div>
    </>
  );
}

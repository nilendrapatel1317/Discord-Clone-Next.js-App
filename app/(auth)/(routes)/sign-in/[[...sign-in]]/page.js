import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <>
      <div className=" w-fit h-fit relative">
        <SignIn />
        <div className=" absolute left-[4%] bottom-0 h-0 w-[43%]  border-b-[28px] sm:left-0 sm:w-0 sm:top-[10%]  sm:h-[35%] sm:border-s-[28px] sm:border-b-0 border-white dark:border-zinc-900 sm:dark:border-black"></div>
      </div>

      <div className="absolute z-[-1] h-full w-full flex items-center justify-center ">
        <Image
          src={"/appLoaderForLaptop.jpg"}
          alt="background"
          fill
          className="invert-0  dark:invert hidden sm:block"
        />
        <Image
          src={"/appLoaderForPhone.jpg"}
          alt="App Loader For Phone"
          fill
          className=" invert dark:invert  object-contain sm:hidden"
        />
      </div>
    </>
  );
}

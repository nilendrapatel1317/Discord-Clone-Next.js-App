import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <>
      <div className=" w-fit h-fit relative">
        <SignIn />
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

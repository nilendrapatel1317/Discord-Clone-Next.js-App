import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/theme/ModeToggle";

const page = () => {
  return (
    <div>
      <UserButton afterSignOutUrl="/sign-in" />
      <ModeToggle />
    </div>
  );
};

export default page;

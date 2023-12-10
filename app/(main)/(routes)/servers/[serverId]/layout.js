import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect, useRouter } from "next/navigation";
import ServerSidebar from "@/components/server/serverSidebar";



function pathName() {
  
}
pathName()
const layout = async ({ children, params }) => {
  const profile = currentProfile();
  if (!profile) {
    return redirectToSignIn();
  }
  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
    },
  });


  if (!server) {
    return redirect("/");
  }

  return ( 
    <div className="h-full">
      <div 
      className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
        <ServerSidebar serverId={params.serverId} />
      </div>
      <main className="h-full md:pl-60">
        {children}
      </main>
    </div>
   );
};

export async function generateMetadata({ params }) {
  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
    },
  });

  const serverName = server.name.length > 10 ? `${server.name.slice(0, 10)}..` : server.name;
  return {
    title: `Discord | ${serverName} `,
    
  }
}

export default layout;

import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
  publicRoutes: ["/", "/(api|trpc)(.*)", "/api/uploadthing"],
  ignoredRoutes: ["/((?!api|trpc))(_next.*|.+\.[\w]+$)", "/servers/6575f8f344763e664a04ff95"]
});
 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
 
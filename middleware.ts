import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { authMiddleware } from "@clerk/nextjs/server";

// const isPublicRoute = createRouteMatcher(["/sign-in", "/sign-up"]);

export default authMiddleware({
  publicRoutes: ["/"],
});

// export default clerkMiddleware((auth, request) => {
//   if (!isPublicRoute(request)) {
//     auth().protect();
//   }
// });

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(['/']);

export default clerkMiddleware(async function (auth, req) {
  if (!auth().userId && isProtectedRoute(req)) {
    // Add custom logic to run before redirecting
    return auth().redirectToSignIn();
  }
  const result = await fetch(process.env.API_ADDRESS + "/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: auth().userId,
    }),
  });
  await result.json();
});

export const config = {
  matcher: [
     // Skip Next.js internals and all static files, unless found in search params
     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
     // Always run for API routes
     '/(api|trpc)(.*)',
  ],
};

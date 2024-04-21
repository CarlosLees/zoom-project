import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const protectedRoutes = createRouteMatcher([
    '/',
    '/upcoming',
    '/previous',
    '/personal-room',
    'meeting(.*)',
]);

export default clerkMiddleware((auth, request) => {
    if (protectedRoutes(request)) {
        auth().protect();
    }
});

export const config = {
    matcher: ['/((?!.+.[w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};

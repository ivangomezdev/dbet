// middleware.js
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/signup",
  },
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
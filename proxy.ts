import { type NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/auth";
import { ROUTES } from "@/lib/constants";

export async function proxy(request: NextRequest) {
	if (request.nextUrl.pathname.startsWith("/api/auth/")) {
		return new Response("Not Found", { status: 404 });
	}
	const session = await getSession();
	const isHomePage = request.nextUrl.pathname === ROUTES.HOME;
	const isSignInPage = request.nextUrl.pathname === ROUTES.AUTH.SIGN_IN;
	const isSignUpPage = request.nextUrl.pathname === ROUTES.AUTH.SIGN_UP;
	const isDashboard = request.nextUrl.pathname.startsWith(ROUTES.APP.DASHBOARD);

	if ((isSignUpPage || isSignInPage || isHomePage) && session) {
		return NextResponse.redirect(new URL(ROUTES.APP.DASHBOARD, request.url));
	}

	if (isDashboard && !session) {
		return NextResponse.redirect(new URL(ROUTES.AUTH.SIGN_IN, request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/", "/api/auth/:path*", "/dashboard/:path*", "/SignIn", "/SignUp"],
};

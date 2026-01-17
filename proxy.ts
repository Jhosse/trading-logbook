import { type NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { ROUTES } from "@/lib/constants";

export async function proxy(request: NextRequest) {
	if (request.nextUrl.pathname.startsWith("/api/auth/")) {
		return new Response("Not Found", { status: 404 });
	}

	const session = await getSession();
	const isHomePage = request.nextUrl.pathname === ROUTES.HOME;
	const isSignInPage = request.nextUrl.pathname === ROUTES.AUTH.SIGN_IN;
	const isSignUpPage = request.nextUrl.pathname === ROUTES.AUTH.SIGN_UP;

	if (isSignUpPage) {
		if (session) {
			return NextResponse.next();
		} else {
			request.nextUrl.pathname = ROUTES.AUTH.SIGN_IN;
			return NextResponse.redirect(request.nextUrl);
		}
	}

	if (isSignInPage && session) {
		request.nextUrl.pathname = ROUTES.APP.DASHBOARD;
		return NextResponse.redirect(request.nextUrl);
	}

	if (isHomePage) {
		if (session) {
			request.nextUrl.pathname = ROUTES.APP.DASHBOARD;
			return NextResponse.redirect(request.nextUrl);
		} else {
			request.nextUrl.pathname = ROUTES.AUTH.SIGN_IN;
			return NextResponse.redirect(request.nextUrl);
		}
	}
}

export const config = {
	matcher: ["/", "/api/auth/:path*", "/dashboard/:path*", "/SignIn", "/SignUp"],
};

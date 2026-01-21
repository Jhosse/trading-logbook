import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { APIError } from "better-auth/api";
import { nextCookies } from "better-auth/next-js";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";

interface SignInCredentials {
	email: string;
	password: string;
}

interface SignUnCredentials extends SignInCredentials {
	name: string;
}

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
	emailAndPassword: {
		enabled: true,
	},
	plugins: [nextCookies()],
});

export async function signUpEmail({
	name,
	email,
	password,
}: SignUnCredentials) {
	try {
		await auth.api.signUpEmail({
			body: {
				name,
				email,
				password,
			},
			headers: await headers(),
		});
	} catch (error) {
		if (error instanceof APIError) {
			return error?.body?.message;
		}

		return "Something went wrong. Please try again.";
	}
}

export async function signInEmail({ email, password }: SignInCredentials) {
	try {
		await auth.api.signInEmail({
			body: {
				email,
				password,
			},
			headers: await headers(),
		});
	} catch (error) {
		if (error instanceof APIError) {
			return error?.body?.message;
		}

		return "Something went wrong. Please try again.";
	}
}

export async function signOut() {
	await auth.api.signOut({
		headers: await headers(),
	});
}

export async function getSession() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	return session;
}

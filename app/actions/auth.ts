"use server";

import { redirect } from "next/navigation";
import { signInEmail, signOut, signUpEmail } from "@/lib/auth/auth";
import { ROUTES } from "@/lib/constants";
import {
	type AuthFormState,
	SignInSchema,
	SignUpSchema,
} from "@/lib/definitions";

export async function signUp(
	state: AuthFormState,
	formData: FormData,
): Promise<AuthFormState> {
	// TODO: MOVE VALIDATION TO THE COMPONENT (SAME AS CREATE A TRADE)
	const validatedFields = SignUpSchema.safeParse({
		name: formData.get("name"),
		email: formData.get("email"),
		password: formData.get("password"),
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
		};
	}

	try {
		const user = await signUpEmail(validatedFields.data);

		redirect(ROUTES.DASHBOARD.OVERVIEW);
	} catch (error) {
		// TODO: handle properly the errors (e.g., duplicate email)
		// Use Prisma error instanceof ie: Prisma.PrismaClientKnownRequestError
		// error instanceof APIError ? error?.body?.message ;

		return {
			// message: `Failed to create user: ${error}`,
			errors: {
				db: [`Failed to create user: ${error}	`],
			},
		};
	}
}

export async function signIn(
	state: AuthFormState,
	formData: FormData,
): Promise<AuthFormState> {
	const validatedFields = SignInSchema.safeParse({
		email: formData.get("email"),
		password: formData.get("password"),
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
		};
	}

	try {
		const signInError = await signInEmail(validatedFields.data);

		if (signInError) {
			return {
				errors: {
					db: [signInError],
				},
			};
		}

		redirect(ROUTES.DASHBOARD.OVERVIEW);
		// TODO: {else} handle redirect on successful sign in
	} catch (error) {
		return {
			errors: {
				db: [`Failed to sign in: ${error}`],
			},
		};
	}
}

export async function logout() {
	await signOut();

	redirect(ROUTES.HOME);
}

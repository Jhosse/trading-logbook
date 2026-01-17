"use server";

import { redirect } from "next/navigation";
import { signInEmail, signOut, signUpEmail } from "@/lib/auth";
import {
	type AuthFormState,
	SignInSchema,
	SignUpSchema,
} from "@/lib/definitions";

export async function signUp(
	state: AuthFormState,
	formData: FormData,
): Promise<AuthFormState> {
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

	const { name, email, password } = validatedFields.data;
	// const hashedPassword = await bcrypt.hash(password, 10);

	try {
		const user = await signUpEmail(name, email, password);
		// TODO: Handle Redirect
		return { message: "User created successfully!" };
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

	const { email, password } = validatedFields.data;

	try {
		const signInError = await signInEmail(email, password);

		if (signInError) {
			return {
				errors: {
					db: [signInError],
				},
			};
		}
		// TODO: {else} handle redirect on successful sign in
	} catch (error) {
		return {
			errors: {
				db: [`Failed to sign in: ${error}`],
			},
		};
	}

	return { message: "Sign in action called" };
}

export async function logout() {
	await signOut();

	redirect("/");
}

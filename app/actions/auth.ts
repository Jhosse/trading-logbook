"use server";

import bcrypt from "bcryptjs";
import { type FormState, SignupFormSchema } from "@/lib/definitions";
import prisma from "@/lib/prisma";

export async function signup(state: FormState, formData: FormData) {
	const validatedFields = SignupFormSchema.safeParse({
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
	const hashedPassword = await bcrypt.hash(password, 10);

	try {
		const user = await prisma.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
			},
		});
		console.log("Created user:", user);
		return { message: "User created successfully!" };
	} catch (error) {
		console.log("Error creating user:", error);
		return {
			message: `Failed to create user: ${error}`,
		};
	}
}

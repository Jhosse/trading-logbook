"use client";

import { useActionState } from "react";

import Button from "@/app/components/button";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldSet,
} from "@/app/components/ui/field";
import { Input } from "@/app/components/ui/input";
import { Spinner } from "@/app/components/ui/spinner";
import type { AuthFormState } from "@/lib/definitions";

interface AuthFormProps {
	action: (state: AuthFormState, formData: FormData) => Promise<AuthFormState>;
	submitText: string;
	showNameField?: boolean;
}

export default function AuthForm({
	action,
	submitText,
	showNameField = false,
}: AuthFormProps) {
	const [state, formAction, pending] = useActionState(action, undefined);

	return (
		<>
			{pending ? (
				<Spinner className="mx-auto size-10" />
			) : (
				<form
					action={formAction}
					className="w-full border rounded-xl p-6 shadow-2xl bg-[#192233]/80"
				>
					<FieldSet>
						<FieldGroup>
							{showNameField && (
								<Field>
									<FieldLabel htmlFor="name">Name</FieldLabel>
									<Input id="name" name="name" type="text" placeholder="Name" />
									<FieldError className="text-red-500">
										{state?.errors?.name}
									</FieldError>
								</Field>
							)}
							<Field>
								<FieldLabel htmlFor="email">Email</FieldLabel>
								<Input
									id="email"
									name="email"
									type="email"
									placeholder="Email"
								/>
								<FieldError className="text-red-500">
									{state?.errors?.email}
								</FieldError>
							</Field>
							<Field>
								<FieldLabel htmlFor="password">Password</FieldLabel>
								<FieldDescription>
									Must be at least 8 characters long.
								</FieldDescription>
								<Input
									id="password"
									name="password"
									type="password"
									placeholder="••••••••"
								/>
								<FieldError className="text-red-500">
									{state?.errors?.password}
								</FieldError>
							</Field>

							<Field orientation="horizontal">
								<Button variant={"outline"} type="submit">
									{submitText}
								</Button>
							</Field>
						</FieldGroup>
					</FieldSet>
				</form>
			)}
		</>
	);
}

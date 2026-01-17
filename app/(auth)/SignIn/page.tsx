"use client";

import { useActionState } from "react";

import { signIn } from "@/app/actions/auth-client";
import { Button } from "@/app/components/ui/button";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "@/app/components/ui/field";

import { Input } from "@/app/components/ui/input";
import { Spinner } from "@/app/components/ui/spinner";

export default function SignInForm() {
	const [state, action, pending] = useActionState(signIn, undefined);

	if (pending) {
		return <Spinner className="mx-auto size-10" />;
	}

	return (
		<form action={action}>
			<Field>
				<FieldLabel htmlFor="email">Email</FieldLabel>
				<Input id="email" name="email" type="email" placeholder="Email" />
				<FieldError className="text-red-500">{state?.errors?.email}</FieldError>
			</Field>
			<Field>
				<FieldLabel htmlFor="password">Password</FieldLabel>
				<FieldDescription>Must be at least 8 characters long.</FieldDescription>
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
			<Button type="submit" variant={"outline"} className="w-full mt-4">
				Sign In
			</Button>
		</form>
	);
}

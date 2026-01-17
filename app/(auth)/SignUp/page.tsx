"use client";

import { useActionState } from "react";

import { signUp } from "@/app/actions/auth-client";
import { Button } from "@/app/components/ui/button";
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

export default function SignupForm() {
	const [state, action, pending] = useActionState(signUp, undefined);

	if (pending) {
		return (
			<div className="w-full">
				<Spinner className="mx-auto size-10" />
			</div>
		);
	}

	return (
		<form action={action}>
			<FieldSet>
				<FieldGroup>
					<Field>
						<FieldLabel htmlFor="name">Name</FieldLabel>
						<Input id="name" name="name" type="text" placeholder="Name" />
						<FieldError className="text-red-500">
							{state?.errors?.name}
						</FieldError>
					</Field>
					<Field>
						<FieldLabel htmlFor="email">Email</FieldLabel>
						<Input id="email" name="email" type="email" placeholder="Email" />
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
							Submit
						</Button>
					</Field>
				</FieldGroup>
			</FieldSet>
		</form>
	);
}

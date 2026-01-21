import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { z } from "zod";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function validateFormData<T extends z.ZodTypeAny>(
	formData: FormData,
	schema: T,
) {
	const entries: Record<string, FormDataEntryValue> = {};

	formData.forEach((value, key) => {
		entries[key] = value;
	});

	return schema.safeParse(entries);
}

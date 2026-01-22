import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { CreateTradeFormSchema } from "@/lib/definitions";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function validateFormData(
	formData: FormData,
	schema: typeof CreateTradeFormSchema,
) {
	const entries: Record<string, FormDataEntryValue> = {};

	formData.forEach((value, key) => {
		entries[key] = value;
	});

	return schema.safeParse(entries);
}

"use server";

import type { z } from "zod";
import type {
	CreateTradeFormData,
	CreateTradeFormSchema,
	CreateTradeFormState,
} from "@/lib/definitions";
import { create } from "@/lib/trades/trades";

export async function createTrade(
	state: CreateTradeFormState,
	validatedFields: z.ZodSafeParseSuccess<z.infer<typeof CreateTradeFormSchema>>,
): Promise<CreateTradeFormState> {
	try {
		const data: CreateTradeFormData = validatedFields.data;
		await create(data);

		return { message: "Trade created successfully!" };
	} catch (error) {
		return {
			// message: `Failed to create user: ${error}`,
			errors: {
				db: [`Failed to create user: ${error}	`],
			},
		};
	}
}

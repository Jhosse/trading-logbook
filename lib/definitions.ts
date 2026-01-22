import * as z from "zod";
import { ASSETS } from "@/lib/constants";
import { TradeType } from "@/lib/trades/types";

// TODO: Check if SignUpSchema and SignInSchema can be merged into one.
// Maybe extend SignUpSchema from SignInSchema?
export const SignUpSchema = z.object({
	name: z
		.string()
		.min(2, { error: "Name must be at least 2 characters long." })
		.trim(),
	email: z.email({ error: "Please enter a valid email." }).trim(),
	password: z
		.string()
		.min(8, { error: "Be at least 8 characters long. " })
		.regex(/[a-zA-Z]/, { error: "Contain at least one letter. " })
		.regex(/[0-9]/, { error: "Contain at least one number. " })
		.regex(/[^a-zA-Z0-9]/, {
			error: "Contain at least one special character. ",
		})
		.trim(),
});

export const SignInSchema = z.object({
	email: z.email({ error: "Please enter a valid email." }).trim(),
	password: z
		.string()
		.min(8, { error: "Be at least 8 characters long. " })
		.regex(/[a-zA-Z]/, { error: "Contain at least one letter. " })
		.regex(/[0-9]/, { error: "Contain at least one number. " })
		.regex(/[^a-zA-Z0-9]/, {
			error: "Contain at least one special character. ",
		})
		.trim(),
});

export type AuthFormState =
	| {
			errors?: {
				name?: string[];
				email?: string[];
				password?: string[];
				db?: string[];
			};
			message?: string;
	  }
	| undefined;

export const CreateTradeFormSchema = z.object({
	asset: z.enum(ASSETS, "An asset is required"),
	tradeType: z.enum(TradeType),
	price: z.coerce.number().positive("Price must be positive"),
	lots: z.coerce.number().positive("Lots must be positive"),
	sl: z.coerce.number().positive("Stop loss must be positive"),
	tp: z.coerce.number().positive("Take profit must be positive"),
	date: z.string().min(1, "Date and time are required"),
	riskReward: z.coerce.number().optional(),
	notes: z.coerce.string().optional(),
});

export type CreateTradeFormData = z.infer<typeof CreateTradeFormSchema>;

export type CreateTradeFormState =
	| {
			errors?: {
				[K in keyof z.infer<typeof CreateTradeFormSchema>]?: string[];
			} & {
				db?: string[];
			};
			message?: string;
	  }
	| undefined;

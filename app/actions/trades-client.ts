import {
	CreateTradeFormSchema,
	type CreateTradeFormState,
} from "@/lib/definitions";
import { create } from "@/lib/trades/trades";

export async function createTrade(
	state: CreateTradeFormState,
	formData: FormData,
): Promise<CreateTradeFormState> {
	return undefined;
}

import { getSession } from "@/lib/auth/auth";
import type { CreateTradeFormData } from "@/lib/definitions";
import prisma from "@/lib/prisma";

// TODO: Return / Return type needs some love
export async function create(
	data: CreateTradeFormData,
): Promise<string | undefined> {
	try {
		const session = await getSession();
		const userId = session?.session?.userId;

		if (!userId) {
			throw new Error("User not authenticated");
		}

		await prisma.trade.create({
			data: {
				...data,
				date: new Date(data.date),
				userId: userId,
			},
		});
	} catch (error) {
		// TODO: Handle error
		// if (error instanceof APIError) {
		// 	return error?.body?.message;
		// }

		return "Something went wrong. Please try again.";
	}
}

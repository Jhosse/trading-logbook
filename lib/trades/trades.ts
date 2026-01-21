export async function create(state: any, formData: FormData): Promise<string> {
	console.log("CREATE TRADE", formData);
	for (const [key, value] of formData.entries()) {
		console.log(`${key}: ${value}`);
	}
	return "CREATE TRADE";
}

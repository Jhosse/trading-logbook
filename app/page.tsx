import Dashboard from "@/app/dashboard/page";
import { getSession } from "@/lib/auth";

export default async function Home() {
	const session = await getSession();

	return (
		<div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
			<main>HOMEPAGE</main>
		</div>
	);
}

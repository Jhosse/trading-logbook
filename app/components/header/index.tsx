"use client";

import Link from "next/link";
import Nav from "@/app/components/navigation/Nav";
import { useSession } from "@/app/context/session-context";
import { ROUTES } from "@/lib/constants";

export default function Header({ title }: { title: string }) {
	const session = useSession();

	return (
		<header className="flex items-center p-6 border-b border-white/5 bg-background-dark/20 backdrop-blur-sm">
			<Link href={ROUTES.HOME} className="w-full text-lg font-extrabold">
				{title}
			</Link>
			{session?.user && <Nav />}
		</header>
	);
}

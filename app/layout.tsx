import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/app/components/footer";
import Header from "@/app/components/header";
import { getSession } from "@/lib/auth/auth";
import { cn } from "@/lib/utils";
import {
	type SessionContextType,
	SessionProvider,
} from "./context/session-context";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Trading Logbook | Track & Analyze Your Trades",
	description:
		"Professional trading journal to log, track, and analyze your trading performance. Monitor your trades, calculate risk/reward ratios, and improve your trading strategy.",
	keywords: [
		"trading journal",
		"trade tracker",
		"trading logbook",
		"risk management",
		"trading performance",
		"trade analysis",
	],
	authors: [{ name: "Your Name" }],
	openGraph: {
		title: "Trading Logbook",
		description:
			"Track and analyze your trading performance with detailed trade logs and insights.",
		type: "website",
	},
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await getSession();
	let sessionContext: SessionContextType | undefined;

	if (session) {
		sessionContext = {
			user: {
				id: session?.user.id,
				name: session?.user.name,
				email: session?.user.email,
			},
			session: {
				id: session?.session.id,
				userId: session?.session.userId,
				expiresAt: session?.session.expiresAt,
			},
		};
	}

	const bgGridClass =
		"bg-[linear-gradient(to_right,rgb(255_255_255_/_0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255_/_0.01)_1px,transparent_1px)] bg-[size:40px_40px]";

	const bgGradientClass =
		"bg-[radial-gradient(circle_at_center,rgba(19,91,236,0.08)_0%,transparent_70%)]";

	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
			>
				<SessionProvider session={sessionContext}>
					<div className="relative">
						{/* <!-- Background Decorative Elements --> */}
						<div
							className={cn(
								"absolute inset-0 pointer-events-none",
								bgGridClass,
							)}
						></div>
						<div
							className={cn(
								"absolute inset-0 pointer-events-none",
								bgGradientClass,
							)}
						></div>

						<Header title="TradeJournal" />
						<main className="relative min-h-[calc(100vh-10rem)] flex flex-col overflow-hidden">
							{children}
						</main>
						<Footer />
					</div>
				</SessionProvider>
			</body>
		</html>
	);
}

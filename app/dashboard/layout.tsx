import { Suspense } from "react";
import DashboardNav from "@/app/components/dashboard/dashboardNav";
import { Spinner } from "@/app/components/ui/spinner";

const spinner = (
	<div className="h-screen flex items-center">
		<Spinner className="mx-auto size-10" />
	</div>
);

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<Suspense fallback={spinner}>
			<header className="flex items-center p-6">
				<h1 className="w-full main-title">TradeJournal</h1>
				<DashboardNav />
			</header>

			<section className="flex-1 flex justify-center py-10 px-6">
				{children}
			</section>
		</Suspense>
	);
}

import { Suspense } from "react";
import { Spinner } from "@/app/components/ui/spinner";

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<Suspense fallback={<Spinner className="mx-auto size-10" />}>
			{children}
		</Suspense>
	);
}

import { Spinner } from "@/app/components/ui/spinner";

export default function Loading() {
	return (
		<div className="min-h-[calc(100vh-10rem)] grid place-items-center">
			<Spinner className="size-10" />
		</div>
	);
}

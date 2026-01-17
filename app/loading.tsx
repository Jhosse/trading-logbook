import { Spinner } from "@/app/components/ui/spinner";

export default function Loading() {
	return (
		<div className="w-full">
			<Spinner className="mx-auto size-10" />
		</div>
	);
}

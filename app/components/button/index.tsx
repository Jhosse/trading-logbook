import { Button as UiButton } from "@/app/components/ui/button";
import { cn } from "@/lib/utils";

export interface ButtonProps {
	variant?:
		| "default"
		| "link"
		| "destructive"
		| "outline"
		| "secondary"
		| "ghost";
	size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg";
}

export default function Button({
	variant = "default",
	size = "default",
	...props
}: React.ComponentProps<"button"> & ButtonProps) {
	return (
		<UiButton
			variant={variant}
			size={size}
			{...props}
			className={cn("cursor-pointer", props.className)}
		>
			{props.children}
		</UiButton>
	);
}

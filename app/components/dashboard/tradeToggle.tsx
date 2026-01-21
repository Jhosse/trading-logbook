import { Field, FieldGroup, FieldLabel } from "@/app/components/ui/field";
import { Input } from "@/app/components/ui/input";
import { TRADE_LABELS } from "@/lib/constants";
import { TradeType } from "@/lib/trades/types";

interface TradeToggleProps {
	buyLabel?: string;
	sellLabel?: string;
}

export function TradeToggle({
	buyLabel = TRADE_LABELS[TradeType.BUY],
	sellLabel = TRADE_LABELS[TradeType.SELL],
}: TradeToggleProps) {
	return (
		<Field className="gap-3">
			<FieldLabel>Trade Type</FieldLabel>
			<FieldGroup className="flex flex-row items-center justify-center h-14 rounded-lg border border-border-color p-1 dark:bg-input/30">
				<FieldLabel
					htmlFor={`trade-type-${TradeType.BUY}`}
					className="flex cursor-pointer w-full h-full items-center justify-center overflow-hidden rounded-lg px-2 text-sm font-bold transition-all has-[:checked]:bg-lime-500/20 has-[:checked]:text-lime-500 text-muted-foreground"
				>
					{buyLabel}
					<Input
						type="radio"
						name="trade-type"
						id={`trade-type-${TradeType.BUY}`}
						value="buy"
						defaultChecked={true}
						className="sr-only"
					/>
				</FieldLabel>
				<FieldLabel
					htmlFor={`trade-type-${TradeType.SELL}`}
					className="flex cursor-pointer w-full h-full items-center justify-center overflow-hidden rounded-lg px-2 text-sm font-bold transition-all has-[:checked]:bg-red-500/20 has-[:checked]:text-red-500 text-muted-foreground"
				>
					{sellLabel}
					<Input
						type="radio"
						name="trade-type"
						id={`trade-type-${TradeType.SELL}`}
						value="sell"
						className="sr-only"
					/>
				</FieldLabel>
			</FieldGroup>
		</Field>
	);
}

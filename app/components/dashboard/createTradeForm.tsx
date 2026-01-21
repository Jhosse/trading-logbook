"use client";

import Image from "next/image";
import {
	startTransition,
	useActionState,
	useEffect,
	useRef,
	useState,
} from "react";
import type { z } from "zod";
import { createTrade } from "@/app/actions/trades-client";
import Button from "@/app/components/button";
import { TradeToggle } from "@/app/components/dashboard/tradeToggle";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldSeparator,
	FieldSet,
} from "@/app/components/ui/field";
import { Input } from "@/app/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/app/components/ui/select";
import { Spinner } from "@/app/components/ui/spinner";
import { ASSETS } from "@/lib/constants";
import { CreateTradeFormSchema } from "@/lib/definitions";
import { cn, validateFormData } from "@/lib/utils";

const hideSpinButton =
	"[-moz-appearance:textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none";

export default function CreateTradeForm() {
	const formRef = useRef<HTMLFormElement>(null);
	const [state, action, pending] = useActionState(createTrade, undefined);
	const [errorState, setErrorState] = useState<
		| Partial<Record<keyof z.infer<typeof CreateTradeFormSchema>, string[]>>
		| undefined
	>(undefined);
	const [selectedAsset, setSelectedAsset] = useState<string | undefined>(
		undefined,
	);

	const clearState = () => {
		setErrorState(undefined);
		setSelectedAsset(undefined);
	};

	const resetForm = () => {
		clearState();
		formRef.current?.reset();
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const validation = validateFormData(formData, CreateTradeFormSchema);

		if (!validation.success) {
			setErrorState(validation.error?.flatten().fieldErrors);
			return;
		}

		clearState();
		startTransition(() => {
			action(formData);
		});
	};

	useEffect(() => {
		if (state) {
			setErrorState(state?.errors);
		}
	}, [state]);

	return (
		<>
			{pending ? (
				<div className="h-full flex items-center">
					<Spinner className="mx-auto size-10" />
				</div>
			) : (
				<form onSubmit={handleSubmit} ref={formRef}>
					<FieldGroup className="flex flex-col gap-6">
						<FieldSet className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<Field>
								<FieldLabel htmlFor="asset">Asset / Index</FieldLabel>
								<Select
									name="asset"
									value={selectedAsset}
									onValueChange={setSelectedAsset}
								>
									<SelectTrigger className="w-full h-14!" id="asset">
										<SelectValue placeholder="Select an asset" />
									</SelectTrigger>
									<SelectContent>
										{ASSETS.map((asset) => (
											<SelectItem value={asset} key={`select-asset-${asset}`}>
												{asset}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FieldError className="text-red-500">
									{errorState?.asset}
								</FieldError>
							</Field>
							<TradeToggle />
							<Field className="gap-3">
								<FieldLabel htmlFor="price">Entry Price</FieldLabel>
								<div className="relative">
									<Input
										className={cn("h-14", hideSpinButton)}
										id="price"
										name="price"
										type="number"
										step="0.0001"
										placeholder="0.00"
									/>
									<span className="absolute top-1/3 end-4 text-sm text-muted-foreground">
										EUR
									</span>
								</div>
								<FieldError className="text-red-500">
									{errorState?.price}
								</FieldError>
							</Field>
							<Field className="gap-3">
								<FieldLabel htmlFor="lots">Position Size</FieldLabel>
								<div className="relative">
									<Input
										className={cn("h-14", hideSpinButton)}
										id="lots"
										name="lots"
										type="number"
										step="0.01"
										placeholder="Units / Lots"
									/>
									<span className="absolute top-1/3 end-4 text-sm text-muted-foreground">
										<Image
											src="/svg/layers.svg"
											alt="Layers"
											width={24}
											height={24}
											style={{
												filter:
													"invert(63%) sepia(0%) saturate(0%) hue-rotate(180deg) brightness(95%) contrast(83%)",
											}}
										/>
									</span>
								</div>
								<FieldError className="text-red-500">
									{errorState?.lots}
								</FieldError>
							</Field>
							<Field className="gap-3">
								<FieldLabel htmlFor="sl">Stop Loss (SL)</FieldLabel>
								<div className="relative">
									<Input
										className={cn(
											"h-14 border-red-500/40 focus-visible:border-red-500/70 focus-visible:ring-red-500/50",
											hideSpinButton,
										)}
										id="sl"
										name="sl"
										type="number"
										step="0.0001"
										placeholder="0.00"
									/>
									<span className="absolute top-1/3 end-4 text-sm text-muted-foreground">
										EUR
									</span>
								</div>
								<FieldError className="text-red-500">
									{errorState?.sl}
								</FieldError>
							</Field>
							<Field className="gap-3">
								<FieldLabel htmlFor="tp">Take Profit (TP)</FieldLabel>
								<div className="relative">
									<Input
										className={cn(
											"h-14 border-lime-500/40 focus-visible:border-lime-500/70 focus-visible:ring-lime-500/50",
											hideSpinButton,
										)}
										id="tp"
										name="tp"
										type="number"
										step="0.0001"
										placeholder="0.00"
									/>
									<span className="absolute top-1/3 end-4 text-sm text-muted-foreground">
										EUR
									</span>
								</div>
								<FieldError className="text-red-500">
									{errorState?.tp}
								</FieldError>
							</Field>
							<Field className="gap-3">
								<FieldLabel htmlFor="date">Execution Date & Time</FieldLabel>
								<div className="relative">
									<Input
										className="h-14 [&::-webkit-calendar-picker-indicator]:w-4 [&::-webkit-calendar-picker-indicator]:h-4 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:sepia-0 [&::-webkit-calendar-picker-indicator]:brightness-95 [&::-webkit-calendar-picker-indicator]:invert-[63%] [&::-webkit-calendar-picker-indicator]:saturate-0 [&::-webkit-calendar-picker-indicator]:hue-rotate-180 [&::-webkit-calendar-picker-indicator]:contrast-83"
										id="date"
										name="date"
										type="datetime-local"
									/>
								</div>
								<FieldError className="text-red-500">
									{errorState?.date}
								</FieldError>
							</Field>
							<Field className="gap-3">
								<FieldLabel htmlFor="risk-reward">
									Risk/Reward Estimate
								</FieldLabel>
								<div className="relative">
									<Input
										className={"h-14"}
										id="risk-reward"
										name="risk-reward"
										type="number"
										placeholder="0.00"
									/>
								</div>
								<FieldError className="text-red-500">
									{errorState?.["risk-reward"]}
								</FieldError>
							</Field>
						</FieldSet>
						<FieldSeparator />
						<footer className="flex flex-col sm:flex-row items-center justify-end gap-4 px-4">
							<Button
								onClick={resetForm}
								variant="ghost"
								type="button"
								className="w-full sm:w-auto px-8 h-12 text-[#92a4c9] font-bold text-sm hover:text-white transition-colors uppercase tracking-widest"
							>
								Cancel
							</Button>
							<Button
								type="submit"
								className="w-full sm:w-auto min-w-[200px] flex items-center justify-center gap-2 overflow-hidden rounded-lg h-12 px-8 text-white bg-blue-500 hover:bg-blue-500/80 text-sm font-bold transition-all uppercase"
							>
								<Image
									src="/svg/double-tick.svg"
									alt="Double Tick"
									width={24}
									height={24}
									style={{
										filter: "brightness(0) invert(1)",
									}}
								/>
								Save Trade
							</Button>
						</footer>
					</FieldGroup>
				</form>
			)}
		</>
	);
}

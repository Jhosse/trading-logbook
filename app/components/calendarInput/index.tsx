"use client";

import { format } from "date-fns";
import { CalendarIcon, Clock2Icon } from "lucide-react";
import { useState } from "react";
import Button from "@/app/components/button";
import { Calendar } from "@/app/components/ui/calendar";
import { CardContent, CardFooter } from "@/app/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/app/components/ui/field";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/app/components/ui/input-group";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/app/components/ui/popover";

export default function CalendarInput({
	id,
	name,
}: {
	id: string;
	name: string;
}) {
	const newDate = new Date();
	const [date, setDate] = useState<Date | undefined>(
		new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate()),
	);
	const [time, setTime] = useState(newDate.toTimeString().slice(0, 5));

	return (
		<div className="flex gap-2" id={id}>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						className="w-full justify-start h-14 text-muted-foreground hover:text-muted-foreground"
					>
						<CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
						{date ? format(date, "PPP") : "Pick a date"}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0">
					<CardContent>
						<Calendar
							mode="single"
							selected={date}
							onSelect={setDate}
							initialFocus
						/>
					</CardContent>
					<CardFooter className="bg-card border-t">
						<FieldGroup>
							<Field>
								<FieldLabel htmlFor="time-from">Start Time</FieldLabel>
								<InputGroup>
									<InputGroupInput
										id="time-from"
										type="time"
										step="1"
										value={time}
										onChange={(e) => setTime(e.target.value)}
										className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
									/>
									<InputGroupAddon>
										<Clock2Icon className="text-muted-foreground" />
									</InputGroupAddon>
								</InputGroup>
							</Field>
						</FieldGroup>
					</CardFooter>
				</PopoverContent>
			</Popover>

			{/* Hidden input for form submission */}
			<input
				type="hidden"
				name={name}
				value={date && time ? `${format(date, "yyyy-MM-dd")}T${time}` : ""}
			/>
		</div>
	);
}

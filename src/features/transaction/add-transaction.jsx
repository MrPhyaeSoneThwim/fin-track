import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import transactionSchema from "@/lib/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectItem,
	SelectTrigger,
	SelectValue,
	SelectContent,
} from "@/components/ui/select";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

import useTransactionStore from "@/store/transactionStore";

import { v4 as uuidv4 } from "uuid";
import { Separator } from "@/components/ui/separator";

const AddTransaction = ({ open, onOpenChange }) => {
	const { addTransaction } = useTransactionStore();

	const form = useForm({
		resolver: yupResolver(transactionSchema),
		defaultValues: {
			name: "",
			type: "income",
			amount: "",
			createdAt: new Date(),
		},
	});

	function onSubmit(values) {
		addTransaction({ ...values, _id: uuidv4() });
		form.reset();
		onOpenChange();
	}

	const handleDismiss = () => {
		form.reset();
		onOpenChange();
	};

	return (
		<Dialog open={open}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Add new transaction</DialogTitle>
					<DialogDescription>
						Enter the details of your new transaction below. Click submit when
						you're finished.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
							<div className="sm:col-span-6">
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Name</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<div className="sm:col-span-6">
								<FormField
									control={form.control}
									name="amount"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Amount</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<div className="sm:col-span-3">
								<FormField
									name="type"
									control={form.control}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Type</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select type" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="income">Income</SelectItem>
													<SelectItem value="expense">Expense</SelectItem>
												</SelectContent>
											</Select>

											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="sm:col-span-3">
								<FormField
									name="createdAt"
									control={form.control}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Date</FormLabel>
											<Popover>
												<PopoverTrigger asChild>
													<Button
														variant={"outline"}
														className={cn(
															"w-full justify-start text-left font-normal",
															!field.value && "text-muted-foreground",
														)}
													>
														<CalendarIcon className="mr-2 h-4 w-4" />
														{field.value ? (
															format(field.value, "PPP")
														) : (
															<span>Pick a date</span>
														)}
													</Button>
												</PopoverTrigger>
												<PopoverContent className="w-auto p-0" align="start">
													<Calendar
														mode="single"
														disabled={{ after: new Date() }}
														selected={field.value}
														onSelect={field.onChange}
														initialFocus
													/>
												</PopoverContent>
											</Popover>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>

						<div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 ">
							<Button variant="outline" onClick={handleDismiss} type="button">
								Dismiss
							</Button>
							<Button className="mb-2 sm:mb-0" type="submit">
								Submit
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default AddTransaction;

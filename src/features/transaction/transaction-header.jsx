import React from "react";

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

import {
	BanknotesIcon,
	ArchiveBoxArrowDownIcon,
} from "@heroicons/react/24/outline";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Card, CardContent } from "@/components/ui/card";

import useTransactionStore from "@/store/transactionStore";
import { format } from "date-fns";

const TransactionHeader = () => {
	const { dailyStats, filterDate, handleFilterDate } = useTransactionStore(
		(state) => state,
	);
	return (
		<div className="px-3">
			<h3 className="scroll-m-20 py-3 text-3xl font-bold text-primary tracking-tight">
				FinTrack
			</h3>
			<div className="space-y-3">
				<div className="flex items-center justify-between">
					<h5 className="scroll-m-20 text-lg font-semibold tracking-tight">
						Daily Statistic
					</h5>
					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant={"outline"}
								className={cn(
									"w-[180px] justify-start rounded-lg px-3 text-left font-normal",
									!filterDate && "text-muted-foreground",
								)}
							>
								<CalendarIcon className="mr-2 h-4 w-4" />
								{filterDate ? (
									format(filterDate, "PPP")
								) : (
									<span>Pick a date</span>
								)}
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0" align="start">
							<Calendar
								mode="single"
								initialFocus
								selected={filterDate}
								disabled={{ after: new Date() }}
								onSelect={handleFilterDate}
							/>
						</PopoverContent>
					</Popover>
				</div>
				<div className="w-full bg-primary flex-col rounded-xl py-5 flex items-center justify-center">
					<h3 className="scroll-m-20 text-2xl text-white font-semibold tracking-normal">
						{dailyStats.balance.toLocaleString()}
					</h3>
					<p className="leading-7 text-white/80">Available balance</p>
				</div>
				<div className="flex space-x-5">
					<Card className="flex-1 shadow-none">
						<CardContent className="w-full p-3 rounded-lg flex-1 flex items-center">
							<div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-green-200 text-green-600">
								<BanknotesIcon className="h-6 w-6" />
							</div>
							<div className="ml-4">
								<h4 className="scroll-m-20 text-lg font-semibold tracking-normal leading-none">
									{dailyStats.income.toLocaleString()}
								</h4>
								<small className="text-sm font-medium leading-none">
									Income
								</small>
							</div>
						</CardContent>
					</Card>
					<Card className="flex-1 shadow-none">
						<CardContent className="w-full p-3 rounded-lg flex-1 flex items-center">
							<div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-red-200 text-red-600">
								<ArchiveBoxArrowDownIcon className="h-6 w-6" />
							</div>
							<div className="ml-4">
								<h4 className="scroll-m-20 text-lg font-semibold tracking-normal leading-none">
									{dailyStats.expense.toLocaleString()}
								</h4>
								<small className="text-sm font-medium leading-none">
									Expense
								</small>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default TransactionHeader;

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { PopoverContent } from "@/components/ui/popover";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import {
	PlusIcon,
	MinusIcon,
	PlusCircleIcon,
	ArchiveBoxXMarkIcon,
	ArchiveBoxArrowDownIcon,
	BanknotesIcon,
} from "@heroicons/react/24/outline";

import { Card, CardContent } from "@/components/ui/card";

import { ScrollArea } from "@/components/ui/scroll-area";

import AddTransaction from "@/features/transaction/add-transaction";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";

import useTransactionStore from "@/store/transactionStore";

import DeleteTransaction from "@/features/transaction/delete-transaction";
import EditTransaction from "@/features/transaction/edit-transaction";

const Transaction = () => {
	const [editId, setEditId] = useState(null);
	const [deleteId, setDeleteId] = useState(null);
	const [isAddOpen, setIsAddOpen] = useState(false);
	const [selectedDate, setSelectedDate] = useState(new Date());

	const {
		refreshId,
		dailyStats,
		filteredTransactions,
		deleteTransaction,
		handleFilterTransactions,
	} = useTransactionStore((state) => state);

	useEffect(() => {
		handleFilterTransactions(selectedDate);
	}, [selectedDate, refreshId]);

	const handleToggleAddOpen = () => {
		setIsAddOpen((isAddOpen) => !isAddOpen);
	};

	const handleDelete = (_id) => {
		setDeleteId(_id);
	};

	const handleEdit = (_id) => {
		setEditId(_id);
	};

	const handleToggleEditOpen = () => {
		setEditId(null);
	};

	const handleToggleDeleteOpen = () => {
		setDeleteId(null);
	};

	const handleSubmitDelete = () => {
		deleteTransaction(deleteId);
		setDeleteId(null);
	};

	return (
		<div className="px-2 pt-2 pb-5 md:px-0 md:py-10 lg:max-w-xl space-y-3 flex flex-col w-full mx-auto h-full">
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
										!selectedDate && "text-muted-foreground",
									)}
								>
									<CalendarIcon className="mr-2 h-4 w-4" />
									{selectedDate ? (
										format(selectedDate, "PPP")
									) : (
										<span>Pick a date</span>
									)}
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-auto p-0" align="start">
								<Calendar
									mode="single"
									selected={selectedDate}
									disabled={{ after: new Date() }}
									onSelect={setSelectedDate}
									initialFocus
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

			<div className="flex items-center justify-between px-3">
				<h5 className="scroll-m-20 text-lg tracking-tight font-semibold">
					Transactions
				</h5>
			</div>
			<DeleteTransaction
				open={!!deleteId}
				onSubmit={handleSubmitDelete}
				onOpenChange={handleToggleDeleteOpen}
			/>
			<EditTransaction
				open={!!editId}
				editId={editId}
				onOpenChange={handleToggleEditOpen}
			/>

			{filteredTransactions.length ? (
				<ScrollArea className="flex-1">
					<div className="px-3 space-y-3">
						{filteredTransactions.map((transaction) => {
							const { name, type, amount, _id } = transaction;
							return (
								<Card className="shadow-none" key={_id}>
									<CardContent className="w-full p-2 flex items-center justify-between">
										<div className="inline-flex items-center">
											<div
												className={`w-10 h-10 rounded-full inline-flex items-center justify-center ${
													type === "income"
														? "bg-green-200 text-green-600"
														: "bg-red-200 text-red-600"
												}`}
											>
												{type === "income" ? (
													<BanknotesIcon className="w-6 h-6" />
												) : (
													<ArchiveBoxArrowDownIcon className="w-6 h-6" />
												)}
											</div>
											<div className="ml-4">
												<p className="leading-none">{name}</p>
												<h4
													className={`scroll-m-20 text-md font-semibold tracking-tight ${
														type === "income"
															? "text-green-600"
															: "text-red-600"
													}`}
												>
													{type === "income" ? "+" : "-"}
													{parseInt(amount).toLocaleString()}
												</h4>
											</div>
										</div>
										<div className="space-x-5 inline-flex items-center">
											<div className="space-x-1">
												<Tooltip>
													<TooltipTrigger asChild>
														<Button
															onClick={() => handleEdit(_id)}
															variant="outline"
															size="icon"
														>
															<Pencil2Icon className="w-4 h-4" />
														</Button>
													</TooltipTrigger>
													<TooltipContent className="bg-gray-500">
														<p>Edit</p>
													</TooltipContent>
												</Tooltip>
												<Tooltip>
													<TooltipTrigger asChild>
														<Button
															size="icon"
															variant="outline"
															onClick={() => handleDelete(_id)}
														>
															<TrashIcon className="w-4 h-4" />
														</Button>
													</TooltipTrigger>
													<TooltipContent className="bg-gray-500">
														<p>Delete</p>
													</TooltipContent>
												</Tooltip>
											</div>
										</div>
									</CardContent>
								</Card>
							);
						})}
					</div>
				</ScrollArea>
			) : (
				<div className="flex-1 w-full h-full flex flex-col items-center justify-center">
					<div className="p-5 rounded-full bg-gray-100">
						<ArchiveBoxXMarkIcon className="w-10 h-10 text-gray-500" />
					</div>
					<p className="leading-7 [&:not(:first-child)]:mt-6">
						No Transactions.
					</p>
				</div>
			)}
			<div className="px-3">
				<Button
					size="lg"
					onClick={handleToggleAddOpen}
					className="w-full rounded-lg"
				>
					<PlusCircleIcon className="mr-2 h-6 w-6" />
					New Trasaction
				</Button>
				<AddTransaction open={isAddOpen} onOpenChange={handleToggleAddOpen} />
			</div>
		</div>
	);
};

export default Transaction;

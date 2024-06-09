import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";

import {
	TrashIcon,
	BanknotesIcon,
	ArchiveBoxArrowDownIcon,
} from "@heroicons/react/24/outline";

import { Pencil2Icon } from "@radix-ui/react-icons";

const TransactionItem = ({ transaction, handleDelete, handleEdit }) => {
	const { name, type, amount, _id } = transaction;

	return (
		<Card className="shadow-none">
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
								type === "income" ? "text-green-600" : "text-red-600"
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
};

export default TransactionItem;

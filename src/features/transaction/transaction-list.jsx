import React, { useEffect, useState } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";

import EmptyWidget from "@/components/ui/empty-widget";
import useTransactionStore from "@/store/transactionStore";

import EditTransaction from "@/features/transaction/edit-transaction";
import TransactionItem from "@/features/transaction/transaction-item";
import DeleteTransaction from "@/features/transaction/delete-transaction";

const TransactionList = () => {
	const [editId, setEditId] = useState(null);
	const [deleteId, setDeleteId] = useState(null);

	const {
		refreshId,
		filterDate,
		deleteTransaction,
		filteredTransactions,
		handleFilterTransactions,
	} = useTransactionStore((state) => state);

	useEffect(() => {
		handleFilterTransactions(filterDate);
	}, [filterDate, refreshId]);

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
		<>
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
							return (
								<TransactionItem
									key={transaction._id}
									handleEdit={handleEdit}
									handleDelete={handleDelete}
									transaction={transaction}
								/>
							);
						})}
					</div>
				</ScrollArea>
			) : (
				<EmptyWidget message="No transactions found." />
			)}
		</>
	);
};

export default TransactionList;

import { useState } from "react";

import TransactionList from "@/features/transaction/transaction-list";
import TransactionFooter from "@/features/transaction/transaction-footer";
import TransactionHeader from "@/features/transaction/transaction-header";

const Transaction = () => {
	const [isAddOpen, setIsAddOpen] = useState(false);

	const handleToggleAddOpen = () => {
		setIsAddOpen((isAddOpen) => !isAddOpen);
	};

	return (
		<div className="px-2 pt-2 pb-5 md:px-0 md:py-10 lg:max-w-xl space-y-3 flex flex-col w-full mx-auto h-full">
			<TransactionHeader />
			<TransactionList />
			<TransactionFooter
				isAddOpen={isAddOpen}
				handleToggleAddOpen={handleToggleAddOpen}
			/>
		</div>
	);
};

export default Transaction;

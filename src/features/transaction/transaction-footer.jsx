import React from "react";
import AddTransaction from "@/features/transaction/add-transaction";

import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

const TransactionFooter = ({ isAddOpen, handleToggleAddOpen }) => {
	return (
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
	);
};

export default TransactionFooter;

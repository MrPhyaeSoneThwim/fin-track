import _ from "lodash";
import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { isSameDay } from "date-fns";
import { createJSONStorage, persist } from "zustand/middleware";

const initialTransactions = [];

const useTransactionStore = create(
	persist(
		(set, get) => ({
			refreshId: uuidv4(),
			filterDate: new Date(),
			transactions: initialTransactions,
			filteredTransactions: [],
			dailyStats: {
				income: 0,
				expense: 0,
				balance: 0,
			},

			handleFilterDate: (date) => {
				set({ filterDate: date });
			},

			handleFilterTransactions: (date) => {
				const prevTransactions = get().transactions;
				const filteredTransactions = prevTransactions.filter((transaction) => {
					const transactionDate = new Date(transaction.createdAt);
					const filterDate = new Date(date);

					return isSameDay(transactionDate, filterDate);
				});

				// Calculate income

				const income = _.sumBy(filteredTransactions, (transaction) => {
					return transaction.type === "income"
						? parseFloat(transaction.amount)
						: 0;
				});

				// Calculate expense
				const expense = _.sumBy(filteredTransactions, (transaction) => {
					return transaction.type === "expense"
						? parseFloat(transaction.amount)
						: 0;
				});

				// Calculate balance
				const balance = income - expense;

				set({
					filteredTransactions: filteredTransactions,
					dailyStats: { income, expense, balance },
				});
			},

			addTransaction: (transaction) => {
				const prevTransactions = get().transactions;

				const updatedTransactions = [
					...prevTransactions,
					{ ...transaction, _id: uuidv4(), category: uuidv4() },
				];
				set({ transactions: updatedTransactions, refreshId: uuidv4() });
			},

			deleteTransaction: (transactionId) => {
				const prevTransactions = get().transactions;

				const updatedTransactions = prevTransactions.filter(
					(transaction) => transaction._id !== transactionId,
				);

				set({ transactions: updatedTransactions, refreshId: uuidv4() });
			},

			updateTransaction: (updatedTransaction) => {
				const prevTransactions = get().transactions;

				const updatedTransactions = prevTransactions.map((transaction) =>
					transaction._id === updatedTransaction._id
						? updatedTransaction
						: transaction,
				);
				set({ transactions: updatedTransactions, refreshId: uuidv4() });
			},

			getTransactionById: (transactionId) => {
				const transactions = get().transactions;

				return transactions.find(
					(transaction) => transaction._id === transactionId,
				);
			},
		}),
		{
			name: "transaction-store", // name for the persisted store
			storage: createJSONStorage(() => localStorage),
		},
	),
);

export default useTransactionStore;

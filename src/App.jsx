import Transaction from "@/features/transaction";
import { TooltipProvider } from "@/components/ui/tooltip";

function App() {
	return (
		<TooltipProvider>
			<Transaction />
		</TooltipProvider>
	);
}

export default App;

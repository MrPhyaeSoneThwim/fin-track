import React from "react";
import { ArchiveBoxXMarkIcon } from "@heroicons/react/24/outline";

const EmptyWidget = ({ message }) => {
	return (
		<div className="flex-1 w-full h-full flex flex-col items-center justify-center">
			<div className="p-5 rounded-full bg-gray-100">
				<ArchiveBoxXMarkIcon className="w-10 h-10 text-gray-500" />
			</div>
			<p className="leading-7 [&:not(:first-child)]:mt-6">{message}</p>
		</div>
	);
};

export default EmptyWidget;

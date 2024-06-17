import { ActivityEntry } from "@/lib/interfaces";
import { Row, flexRender } from "@tanstack/react-table";
import { HiDotsVertical } from "react-icons/hi";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface params {
	row: Row<ActivityEntry>
}

export default function ActivityEntryRow({ row }: params) {
	const allowedColumnIds = ['description', 'category', 'startTime', 'endTime', 'duration', 'date'] as const;
	type AllowedColumnID = typeof allowedColumnIds[number];

	type ActivityEntryCells = {
		[key in AllowedColumnID]?: any
	}

	const cells: ActivityEntryCells = {};

	row.getVisibleCells().forEach(cell => {
		const columnId = cell.column.columnDef.id as keyof ActivityEntryCells;
		if (columnId && allowedColumnIds.includes(columnId))
			cells[columnId] = cell;
	});

	return (
		<li key={row.id} className="relative flex justify-between gap-x-6 px-4 py-5 sm:px-6">
			<div className="flex min-w-0 gap-x-4">
				<div className="min-w-0 flex-auto">
					<p key={cells.description.id} className="text-sm font-semibold leading-6 text-gray-900">
						{flexRender(cells.description.column.columnDef.cell, cells.description.getContext())}
					</p>
					<p className="mt-1 flex text-xs leading-5 text-gray-500">
						{flexRender(cells.date.column.columnDef.cell, cells.date.getContext())}, {flexRender(cells.startTime.column.columnDef.cell, cells.startTime.getContext())} - {flexRender(cells.endTime.column.columnDef.cell, cells.endTime.getContext())}
					</p>
				</div>
			</div>
			<div className="flex shrink-0 items-center gap-x-4">
				<div className="hidden sm:flex sm:flex-col sm:items-end">
					<p className="text-sm leading-6 text-gray-900">{flexRender(cells.duration.column.columnDef.cell, cells.duration.getContext())}</p>

					<div className="mt-1 flex items-center gap-x-1.5">
						<div className={`flex-none rounded-full bg-${cells.category.getValue().color}-500/20 p-1`}>
							<div className={`h-1.5 w-1.5 rounded-full bg-${cells.category.getValue().color}-500`} />
						</div>
						<p className="text-xs leading-5 text-gray-500">{cells.category.getValue().name}</p>
					</div>
				</div>

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="sm" className="py-5 focus-visible:ring-transparent focus-visible:ring-0 focus-visible:outline-none">
							<HiDotsVertical className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent collisionPadding={{ right: 18, bottom: 18 }}>
						<DropdownMenuItem className="py-3 px-3" onClick={() => { console.log("Edit") }}>
							<PencilSquareIcon className="h-4 w-4 text-gray-500 mr-2" /> Edit
						</DropdownMenuItem>
						<DropdownMenuItem className="py-3 px-3" onClick={() => { console.log("Delete") }}>
							<TrashIcon className="h-4 w-4 text-gray-500 mr-2 ml-[-0.03rem]" /> Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</li>
	);

	/*
	{flexRender(cell.column.columnDef.header, {} as HeaderContext<ActivityEntry, {}>)}: {flexRender(cell.column.columnDef.cell, cell.getContext())}
	*/
}
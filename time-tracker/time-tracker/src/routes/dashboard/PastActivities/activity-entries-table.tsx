import {
  AccessorFnColumnDef,
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Input } from "@/components/ui/input";
import ActivityEntryRow from "@/routes/dashboard/PastActivities/activity-entry-row";
import { ActivityEntry } from "@/lib/interfaces";
import { DatePickerWithRange } from "@/components/ui/date-picker-with-range";
import { Button } from "@/components/ui/button";
import { BackspaceIcon as BackspaceIconOutline } from "@heroicons/react/24/outline";
import { BackspaceIcon as BackspaceIconSolid } from "@heroicons/react/24/solid";
import { DateRange } from "react-day-picker";
import { PlusCircleIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { UUID } from "crypto";

interface ActivityEntriesTableProps {
  columns: Array<ColumnDef<ActivityEntry, any>>,
  data: ActivityEntry[]
}

export function ActivityEntriesTable({ columns, data }: ActivityEntriesTableProps) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  );

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5
  });

  // const { activityCategories, activityEntries } = useContext(ActivityDataContext);

  const table = useReactTable<ActivityEntry>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    state: {
      columnFilters,
      pagination
    }
  });

  const currentPageInfo = {
    from: Math.min(table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1, table.getRowCount()),
    to: Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, table.getRowCount())
  }

  return (
    <div className="w-full">
      <div className="flex items-center pb-4 gap-2">
        <Input
          placeholder="Description or category"
          value={(table.getColumn("description")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("description")?.setFilterValue(event.target.value)
          }
          className="sm:max-w-md sm:basis-3/5"
        />
        <DatePickerWithRange
          date={(table.getColumn("date")?.getFilterValue() as DateRange) ?? undefined}
          onSelect={(value) => {
            table.getColumn("date")?.setFilterValue(value);
          }}
          className="sm:basis-2/5"
        />

        <Button
          variant="outline"
          onClick={() => {
            table.setColumnFilters([]);
          }}
        >
          {(table.getState().columnFilters.length > 0 ?
            <BackspaceIconSolid className="w-4 h-4 text-gray-600" />
            :
            <BackspaceIconOutline className="w-4 h-4 text-gray-600" />
          )}
        </Button>
      </div>
      <ul role="list" className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 rounded-md">
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <ActivityEntryRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
              row={row}
            />
          ))
        ) : (
          <li className="py-8 text-center">
            No results.
          </li>
        )}
      </ul>
      <div className="flex items-center pt-4 gap-2">
        <Button variant="outline">
          <PlusCircleIcon className="w-4 h-4 xs:mr-1.5 text-gray-600" /><span className="sr-only xs:not-sr-only">Add</span><span className="sr-only sm:not-sr-only">&nbsp;Activity</span>
        </Button>

        <div className="ml-auto flex-shrink flex items-center justify-end gap-2">
          <span className="text-xs xxs:text-sm text-gray-600 pr-2">
            {currentPageInfo.from} - {currentPageInfo.to} of {table.getRowCount()}
          </span>
          <Button
            variant="outline"
            className="px-3.5 xs:px-4"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only xs:not-sr-only">Previous</span><ChevronLeftIcon className="w-5 h-5 text-gray-600 xs:hidden" />
          </Button>
          <Button
            variant="outline"
            className="px-3.5 xs:px-4"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only xs:not-sr-only">Next</span><ChevronRightIcon className="w-5 h-5 text-gray-600 xs:hidden" />
          </Button>
        </div>
      </div>
    </div>
  )
}

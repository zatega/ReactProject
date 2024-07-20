import { ActivityEntry } from "@/lib/interfaces";
import { FilterFn, Row } from "@tanstack/react-table";

function removeTime(date: Date){
	return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const filterBySearch : FilterFn<ActivityEntry> = function(row: Row<ActivityEntry>, columnId: string, filterValue: any, _addMeta: (meta: any) => void): boolean{
	return true;
}

export const filterByDate : FilterFn<ActivityEntry> = function (row: Row<ActivityEntry>, columnId: string, filterValue: any, _addMeta: (meta: any) => void): boolean{
	if(filterValue == null)
		return true;

	const value: Date = row.getValue(columnId);
	console.log(filterValue.from, removeTime(filterValue.from));

	if(filterValue.from != null && filterValue.to != null)
		return (removeTime(value) >= removeTime(filterValue.from) && removeTime(value) <= removeTime(filterValue.to));

	if(filterValue.from != null && filterValue.to == null)
		return removeTime(value).getTime() == removeTime(filterValue.from).getTime();

	return true;
}
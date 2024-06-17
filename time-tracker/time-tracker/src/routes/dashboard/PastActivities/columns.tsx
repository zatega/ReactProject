import { ActivityCategory, ActivityEntry } from "@/lib/interfaces";
import { formatDuration, humanizeDate } from "@/lib/utils";
import { createColumnHelper } from "@tanstack/react-table"
import { filterByDate } from "./filters"

const columnHelper = createColumnHelper<ActivityEntry>();

export function getColumns(activityCategories: ActivityCategory[]){
	return [
		columnHelper.accessor(row => row.startTime, {
			id: 'date',
			header: () => <span>Date</span>,
			cell: info => humanizeDate(info.getValue()),
			filterFn: filterByDate,
			size: 300,
			minSize: 250
		}),
		columnHelper.accessor(row => row.startTime, {
			id: 'startTime',
			header: () => <span>Start</span>,
			cell: info => info.getValue().toLocaleTimeString([], {hour: 'numeric', minute:'2-digit'}),
		}),
		columnHelper.accessor(row => row.endTime, {
			id: 'endTime',
			header: () => <span>End</span>,
			cell: info => info.getValue().toLocaleTimeString([], {hour: 'numeric', minute:'2-digit'})
		}),
		columnHelper.accessor(row => Math.floor((row.endTime.getTime() - row.startTime.getTime())/1000), {
			id: 'duration',
			header: () => <span>Duration</span>,
			cell: (info) => formatDuration(info.getValue())	
		}),
		columnHelper.accessor(
			(row) => {
				const category = activityCategories.find(cat => cat.slug == row.category);
				if(category)
					return category;

				return {
					slug: row.category,
					name: 'Deleted Category',
					color: 'gray',
					builtIn: false
				};
			}, {
				id: 'category',
				header: () => <span>Category</span>,
				cell: info => info.getValue(),
			}
		),
		columnHelper.accessor(
			(row) => {
				if(row.description == null || row.description == ''){
					const category = activityCategories.find(cat => cat.slug == row.category);
					if(category)
						return category.name + ' Activity';
					return 'Activity'; 
				}

				return row.description;
			}, 
			{
				id: 'description',
				header: () => <span>Description</span>,
				cell: info => info.getValue(),
			}
		)
	];
}

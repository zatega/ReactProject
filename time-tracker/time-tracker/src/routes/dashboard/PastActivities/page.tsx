import { ActivityEntriesTable } from "./activity-entries-table";
import { getColumns } from "./columns";
import { useContext, useMemo } from "react";
import { ActivityDataContext } from "@/contexts";

export default function PastActivitiesPage(){
	const { activityCategories, activityEntries } = useContext(ActivityDataContext);
	const columns = useMemo(() => getColumns(activityCategories), [activityCategories]);

	return (
		<div className="max-w-2xl space-y-6 min-h-96 w-full">
			<ActivityEntriesTable columns={columns} data={activityEntries} />
		</div>
	);
}
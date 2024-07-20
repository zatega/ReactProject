import { useEffect, useState } from "react";
import { fetchUserActivityData } from "@/firebase"
import { ActivityCategory, ActivityEntry } from "@/lib/interfaces";

export default function useActivityData(){
	const [activityCategories, setActivityCategories] = useState([] as ActivityCategory[]);
	const [activityEntries, setActivityEntries] = useState([] as ActivityEntry[]);
	
	useEffect(() => {
		const data = fetchUserActivityData();
		
		setActivityCategories(data.activityCategories);
		setActivityEntries(data.activityEntries);
		
		return () => {}
	}, []);
	
	return { activityCategories, activityEntries };
}
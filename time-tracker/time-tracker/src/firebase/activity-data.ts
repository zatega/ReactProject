import { ActivityCategory, ActivityEntry } from "@/lib/interfaces";

// u buducnosti: fetchUserActivityData
// prima setState funkciju, vraca cleanUp funkciju
export function fetchUserActivityDataRecurring(setter: () => void){
	setter();
	
	return () => {};
}

const builtInCategories: ActivityCategory[] = [
	{
		slug: 'uncategorized',
		name: 'Uncategorized',
		color: 'gray'
	}
].map(category => ({ ...category, builtIn: true}));

// samo jednom povuce, kad dodamo firebase nece se koristiti
export function fetchUserActivityData(): {activityCategories: ActivityCategory[], activityEntries: ActivityEntry[]} {	
	const exampleCustomActivityCategories: ActivityCategory[] = [
		{
			slug: 'studying',
			name: 'Studying',
			color: "blue",
		},
		{
			slug: 'work',
			name: 'Work',
			color: "green"
		},{
			slug: 'gym',
			name: 'Gym',
			color: "red"
		},
	].map(category => ({ ...category, builtIn: false}));

	const exampleActivityCategories: ActivityCategory[] = [...builtInCategories, ...exampleCustomActivityCategories];

	const exampleActivityEntries: ActivityEntry[] = [
		{
			uuid: 'd6cb78ff-7183-4f83-944e-47e527f6cb8c',
			description: 'Dancing',
			category: 'uncategorized',
			startTime: new Date(Date.parse('26 Apr 2024 09:15:00')),
			endTime: new Date(Date.parse('26 Apr 2024 10:30:00'))
		},
		{
			uuid: 'a32f2f65-0464-4a9d-b320-eba2ef050a5c',
			description: 'Tennis Match',
			category: 'work',
			startTime: new Date(Date.parse('25 Apr 2024 11:30:00')),
			endTime: new Date(Date.parse('25 Apr 2024 13:50:00'))
		},
		{
			uuid: '45fb2bc0-0992-4642-849a-23f21df3b02f',
			description: '',
			category: 'studying',
			startTime: new Date(Date.parse('23 Apr 2024 14:00:00')),
			endTime: new Date(Date.parse('23 Apr 2024 16:00:00'))
		},
		{
			uuid: '3bad85d3-9f85-4094-815d-f18445671007',
			description: 'Bench day',
			category: 'gym',
			startTime: new Date(Date.parse('21 Apr 2024 16:10:00')),
			endTime: new Date(Date.parse('21 Apr 2024 17:15:00'))
		},
	];

	return {
		activityCategories: exampleActivityCategories,
		activityEntries: exampleActivityEntries
	};
}
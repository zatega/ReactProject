import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { useContext, useEffect, useMemo, useState } from "react";
import { ActivityDataContext, FocusModeContext } from "@/contexts";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { ActivityCategory } from "@/lib/interfaces";
// import useActivityData from "@/hooks/useActivityData";

function addLeadingZero(num: number) {
	if (num >= 10)
		return num;
	return '0' + num;
}

export default function NewActivityPage() {
	const { activityCategories } = useContext(ActivityDataContext);
	const defaultCategory: ActivityCategory = useMemo(() => {
		return activityCategories.find(category => category.builtIn == true) ?? { slug: 'loading', name: 'Loading', color: 'gray', builtIn: true }
	}, [activityCategories]);

	const [startTime, setStartTime] = useState(new Date().getTime());
	const [endTime, setEndTime] = useState(new Date().getTime());
	const [isRunning, setIsRunning] = useState(false);
	const [activityDescription, setActivityDescription] = useState("");
	const [activityCategory, setActivityCategory] = useState(defaultCategory.slug);
	const { focusMode, setFocusMode } = useContext(FocusModeContext);
	const { toast } = useToast();

	// Select an actual category once finished loading
	if (activityCategory == 'loading' && defaultCategory.slug != 'loading')
		setActivityCategory(defaultCategory.slug);

	useEffect(() => {
		if (!isRunning)
			return;

		const timer = setInterval(() => {
			setEndTime(new Date().getTime());
		}, 1000);

		setFocusMode(true);

		return () => {
			clearInterval(timer);
			setFocusMode(false);
		}
	}, [isRunning]); // eslint-disable-line

	const durationSeconds = Math.floor((endTime - startTime) / 1000);
	const clockMinutes = Math.floor(durationSeconds / 60);
	const clockSeconds = durationSeconds - clockMinutes * 60;

	function handleStartClick() {
		setStartTime(new Date().getTime());
		setEndTime(new Date().getTime());
		setIsRunning(true);
	}

	function handleStopClick() {
		setIsRunning(false);
		toast({
			title: "Successfully saved the activity",
			description: (
				<p>
					{(clockMinutes > 0 && clockMinutes + (clockMinutes > 1 ? ' minutes' : ' minute'))}
					{clockSeconds + (clockSeconds != 1 ? ' seconds' : ' second')} of {getCategory(activityCategory).name}
				</p>
			)
			// action: <ToastAction altText="View">View</ToastAction>,
		});
	}

	function getCategory(slug: string) {
		for (const category of activityCategories)
			if (category.slug == slug)
				return category;
		return defaultCategory;
	}

	const categoryListItems = (defaultCategory.slug == 'loading' ? [defaultCategory] : activityCategories).map((category) => (
		<SelectItem key={category.slug} value={category.slug}>
			<div className="flex items-center gap-x-2 rounded-md">
				<div className={`flex-none rounded-full bg-${category.color}-500/20 p-1`}>
					<div className={`h-1.5 w-1.5 rounded-full bg-${category.color}-500`} />
				</div>
				<p>{category.name}</p>
			</div>
		</SelectItem>
	));

	return (
		<div className="max-w-xl space-y-6">
			<p className={"text-5xl sm:text-7xl text-center transition-colors " + (focusMode ? 'text-gray-300' : 'text-gray-600')}>{addLeadingZero(clockMinutes)}:{addLeadingZero(clockSeconds)}</p>

			{!isRunning ? (
				<div className="flex gap-2 justify-center">
					<Input value={activityDescription} onChange={(e) => { setActivityDescription(e.target.value); }} className="max-w-44" placeholder="Description" />
					<Select value={activityCategory} onValueChange={(val: string) => { setActivityCategory(val); }}>
						<SelectTrigger className="w-44">
							<SelectValue placeholder="Category" />
						</SelectTrigger>
						<SelectContent>
							{categoryListItems}
						</SelectContent>
					</Select>
					<Button onClick={handleStartClick}>Start</Button>
				</div>
			) : (
				<div className="flex justify-center">
					<Button className="text-base" onClick={handleStopClick}>
						Stop
					</Button>
				</div>
			)}
		</div>
	);
}
import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { HiSun, HiCollection, HiChartBar, HiCog } from "react-icons/hi";

import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList
} from "@/components/ui/navigation-menu"

import { ActivityDataContext, FocusModeContext } from '@/contexts';
import useActivityData from '@/hooks/useActivityData';

export default function DashboardRoot() {
	const [focusMode, setFocusMode] = useState(false);

	const { activityCategories, activityEntries } = useActivityData();
	const location = useLocation();

	return (
		<FocusModeContext.Provider value={{ focusMode, setFocusMode }}>
			<ActivityDataContext.Provider value={{ activityCategories, activityEntries }}>
				<div className={(focusMode ? "-bottom-10" : "bottom-4") + " transition-all fixed left-0 right-0 flex items-center justify-center w-full px-4"}>
					<NavigationMenu className="bg-white shadow rounded-2xl overflow-hidden">
						<NavigationMenuList>
							<NavigationMenuItem>
								<NavigationMenuLink active={location.pathname == "/"} to="/">
									<HiSun className="h-5 w-5 sm:h-4 sm:w-4 text-gray-500" /><span className="hidden sm:block">New Activity</span>
								</NavigationMenuLink>
							</NavigationMenuItem>

							<NavigationMenuItem>
								<NavigationMenuLink active={location.pathname == "/activities"} to="/activities">
									<HiCollection className="h-5 w-5 sm:h-4 sm:w-4 text-gray-500" /><span className="hidden sm:block">Past Activities</span>
								</NavigationMenuLink>
							</NavigationMenuItem>

							<NavigationMenuItem>
								<NavigationMenuLink active={location.pathname == "/analytics"} to="/analytics">
									<HiChartBar className="h-5 w-5 sm:h-4 sm:w-4 text-gray-500" /><span className="hidden sm:block">Analytics</span>
								</NavigationMenuLink>
							</NavigationMenuItem>

							<NavigationMenuItem>
								<NavigationMenuLink active={location.pathname == "/settings"} to="/settings">
									<HiCog className="h-5 w-5 sm:h-4 sm:w-4 text-gray-500" /><span className="hidden sm:block">Settings</span>
								</NavigationMenuLink>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
				</div>
				<div className={"h-full p-4 flex items-center justify-center transition-colors " + (focusMode ? 'bg-zinc-950' : 'bg-slate-50')}>
					<Outlet></Outlet>
				</div>
			</ActivityDataContext.Provider>
		</FocusModeContext.Provider>
	)
}
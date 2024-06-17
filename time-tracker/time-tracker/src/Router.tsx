
import {
	createBrowserRouter
} from "react-router-dom";

import Root from "@/routes/Root"

import NewActivityPage from "./routes/dashboard/NewActivity";
import PastActivitiesPage from "./routes/dashboard/PastActivities";
import AnalyticsPage from "./routes/dashboard/Analytics";

import "./index.css";
import SettingsPage from "./routes/dashboard/Settings";
import DashboardRoot from "@/routes/dashboard/DashboardRoot";
  
export const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		children: [
			{
				path: "",
				element: <DashboardRoot />,
				children: [
					{
						path: "",
						element: <NewActivityPage />
					},
					{
						path: "activities",
						element: <PastActivitiesPage />
					},
					{
						path: "analytics",
						element: <AnalyticsPage />
					},
					{
						path: "settings",
						element: <SettingsPage />
					}
				]
			}
		]
	},
]);
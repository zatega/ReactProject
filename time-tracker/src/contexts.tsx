import { createContext, Dispatch, SetStateAction } from "react";
import { ActivityCategory, ActivityEntry, User } from "./lib/interfaces";

interface FocusModeContext {
	focusMode: boolean,
	setFocusMode: Dispatch<SetStateAction<boolean>>
}

export const FocusModeContext = createContext<FocusModeContext>({focusMode: false, setFocusMode: () => {}});

interface ActivityDataContext {
	activityCategories: ActivityCategory[],
	activityEntries: ActivityEntry[]
}

export const ActivityDataContext = createContext<ActivityDataContext>({activityCategories: [], activityEntries: []});

interface AuthContext {
	user: User,
	handleSignOutClick: () => void
}

export const AuthContext = createContext<AuthContext>({user: {uid: null, email: null, isAuthenticated: false}, handleSignOutClick: () => {}});
import { UUID } from "crypto";

export interface ActivityEntry{
	uuid: UUID,
	description: string,
	category: string,
	startTime: Date,
	endTime: Date
}

const allowedColors = ['red', 'green', 'blue', 'gray']; 

export interface ActivityCategory{
	slug: string,
	name: string,
	builtIn: boolean, 
	color: typeof allowedColors[number]
}

export interface User {
	uid: string | null,
	email: string | null,
	isAuthenticated: boolean
}
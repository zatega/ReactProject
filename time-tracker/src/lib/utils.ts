import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

function formatDurationShort(durationSeconds: number) {
	if (durationSeconds <= 0)
		return "0s";

	const hours = Math.floor(durationSeconds / 3600);
	const minutes = Math.floor((durationSeconds - hours * 3600) / 60);
	const seconds = durationSeconds - hours * 3600 - minutes * 60;

	let res = "";
	if (hours > 0)
		res += hours + (hours == 1 ? 'h' : 'h');
	if (minutes > 0)
		res += ' ' + minutes + (minutes == 1 ? 'm' : 'm');
	if (seconds > 0 && durationSeconds < 60)
		res += ' ' + seconds + (seconds == 1 ? 's' : 's');

	return res.trim();
}

function formatDurationLong(durationSeconds: number) {
	if (durationSeconds <= 0)
		return "0 seconds";

	const hours = Math.floor(durationSeconds / 3600);
	const minutes = Math.floor((durationSeconds - hours * 3600) / 60);
	const seconds = durationSeconds - hours * 3600 - minutes * 60;

	let res = "";
	if (hours > 0)
		res += hours + (hours == 1 ? ' hour' : ' hours');
	if (minutes > 0)
		res += ' ' + minutes + (minutes == 1 ? ' minute' : ' minutes');
	if (seconds > 0 && durationSeconds < 60)
		res += ' ' + seconds + (seconds == 1 ? ' second' : ' seconds');

	return res.trim();
}

export function formatDuration(durationSeconds: number) {
	return formatDurationShort(durationSeconds);
}

// Helper function to get the day suffix (st, nd, rd, or th)
function getDaySuffix(day: number) {
	if (day >= 11 && day <= 13) {
		return 'th';
	}
	switch (day % 10) {
		case 1: return 'st';
		case 2: return 'nd';
		case 3: return 'rd';
		default: return 'th';
	}
}

// Formats a date as Today, Yesterday, April 15th, or March 12th, 2023
export function humanizeDate(date: Date): string {
	const today = new Date();
	if (date.toDateString() === today.toDateString())
		return 'Today';

	const yesterday = new Date();
	yesterday.setDate(today.getDate() - 1);
	if (date.toDateString() === yesterday.toDateString())
		return 'Yesterday';


	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	const month = months[date.getMonth()];
	const day = date.getDate();
	let res = `${month} ${day}${getDaySuffix(day)}`;

	// Check if the date is from this year
	if (date.getFullYear() !== today.getFullYear()) {
		res += ', ' + date.getFullYear();
	}

	return res;
}

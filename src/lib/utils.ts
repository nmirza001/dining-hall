import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines Tailwind CSS classes, ensuring proper order and deduplication.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Converts a decimal representation of time into a 12-hour clock format with AM/PM.
 */
export function formatTime(time: number): string {
  const hours = Math.floor(time);
  const minutes = Math.round((time - hours) * 60);
  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12; // Converts 0 to 12 for AM
  return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
}

/**
 * Calculates the time remaining until a given reset time.
 */
export function getTimeUntilReset(nextReset: Date): string {
  const diff = Math.max(0, nextReset.getTime() - Date.now()); // Avoid negative values
  const minutes = Math.floor(diff / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

/**
 * Formats a Date object into a localized 12-hour time string.
 */
export function formatTimeString(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

/**
 * Determines whether a given time is between two other times, accounting for day rollovers.
 */
export function isTimeBetween(time: number, start: number, end: number): boolean {
  if (end < start) {
    // Handles cases where the range crosses midnight
    return time >= start || time < end;
  }
  return time >= start && time < end;
}

/**
 * Converts a 12-hour clock time string into a decimal representation.
 */
export function timeStringToDecimal(timeStr: string): number {
  const [time, period] = timeStr.split(" ");
  const [hours, minutes] = time.split(":").map(Number);
  let decimalHours = hours % 12;
  if (period === "PM") decimalHours += 12;
  return decimalHours + minutes / 60;
}
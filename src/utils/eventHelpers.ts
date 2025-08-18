import { getLiveCollection } from 'astro:content';
import type { LumaEvent } from '../loaders/lumaLoader.js';

/**
 * Get the latest upcoming event
 */
export async function getLatestEvent(): Promise<LumaEvent | null> {
	const { entries: events, error } = await getLiveCollection('events');

	if (error) {
		console.error('Error fetching events:', error.message);
		return null;
	}

	if (!events || events.length === 0) {
		return null;
	}

	const now = new Date();

	// Filter for upcoming events and sort by start date
	const upcomingEvents = events
		.filter(event => new Date(event.data.start_at) > now)
		.sort((a, b) => new Date(a.data.start_at).getTime() - new Date(b.data.start_at).getTime());

	return upcomingEvents[0]?.data || null;
}

/**
 * Get the most recent past event
 */
export async function getLastEvent(): Promise<LumaEvent | null> {
	const { entries: events, error } = await getLiveCollection('events');

	if (error) {
		console.error('Error fetching events:', error.message);
		return null;
	}

	if (!events || events.length === 0) {
		return null;
	}

	const now = new Date();

	// Filter for past events and sort by start date (most recent first)
	const pastEvents = events
		.filter(event => new Date(event.data.start_at) <= now)
		.sort((a, b) => new Date(b.data.start_at).getTime() - new Date(a.data.start_at).getTime());

	return pastEvents[0]?.data || null;
}

/**
 * Get all upcoming events sorted by date
 */
export async function getUpcomingEvents(): Promise<LumaEvent[]> {
	const { entries: events, error } = await getLiveCollection('events');

	if (error) {
		console.error('Error fetching events:', error.message);
		return [];
	}

	if (!events) {
		return [];
	}

	const now = new Date();

	return events
		.filter(event => new Date(event.data.start_at) > now)
		.sort((a, b) => new Date(a.data.start_at).getTime() - new Date(b.data.start_at).getTime())
		.map(event => event.data);
}

/**
 * Get all past events sorted by date (most recent first)
 */
export async function getPastEvents(): Promise<LumaEvent[]> {
	const { entries: events, error } = await getLiveCollection('events');

	if (error) {
		console.error('Error fetching events:', error.message);
		return [];
	}

	if (!events) {
		return [];
	}

	const now = new Date();

	return events
		.filter(event => new Date(event.data.start_at) <= now)
		.sort((a, b) => new Date(b.data.start_at).getTime() - new Date(a.data.start_at).getTime())
		.map(event => event.data);
}


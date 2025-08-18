import { getCollection } from 'astro:content';
import type { LumaEvent } from '../loaders/lumaLoader.js';

/**
 * Get the latest upcoming event
 */
export async function getLatestEvent(): Promise<LumaEvent | null> {
	try {
		const events = await getCollection('events');

		if (!events || events.length === 0) {
			return null;
		}

		const now = new Date();

		// Filter for upcoming events and sort by start date
		const upcomingEvents = events
			.filter(event => new Date(event.data.start_at) > now)
			.sort((a, b) => new Date(a.data.start_at).getTime() - new Date(b.data.start_at).getTime());

		return upcomingEvents[0]?.data || null;
	} catch (error) {
		console.error('Error fetching events:', error);
		return null;
	}
}

/**
 * Get the most recent past event
 */
export async function getLastEvent(): Promise<LumaEvent | null> {
	try {
		const events = await getCollection('events');

		if (!events || events.length === 0) {
			return null;
		}

		const now = new Date();

		// Filter for past events and sort by start date (most recent first)
		const pastEvents = events
			.filter(event => new Date(event.data.start_at) <= now)
			.sort((a, b) => new Date(b.data.start_at).getTime() - new Date(a.data.start_at).getTime());

		return pastEvents[0]?.data || null;
	} catch (error) {
		console.error('Error fetching events:', error);
		return null;
	}
}

/**
 * Get all upcoming events sorted by date
 */
export async function getUpcomingEvents(): Promise<LumaEvent[]> {
	try {
		const events = await getCollection('events');

		if (!events) {
			return [];
		}

		const now = new Date();

		return events
			.filter(event => new Date(event.data.start_at) > now)
			.sort((a, b) => new Date(a.data.start_at).getTime() - new Date(b.data.start_at).getTime())
			.map(event => event.data);
	} catch (error) {
		console.error('Error fetching events:', error);
		return [];
	}
}

/**
 * Get all past events sorted by date (most recent first)
 */
export async function getPastEvents(): Promise<LumaEvent[]> {
	try {
		const events = await getCollection('events');

		if (!events) {
			return [];
		}

		const now = new Date();

		return events
			.filter(event => new Date(event.data.start_at) <= now)
			.sort((a, b) => new Date(b.data.start_at).getTime() - new Date(a.data.start_at).getTime())
			.map(event => event.data);
	} catch (error) {
		console.error('Error fetching events:', error);
		return [];
	}
}


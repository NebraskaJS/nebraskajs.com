import type { Loader } from 'astro/loaders';
import type { LumaEvent } from './lumaLoader';

interface LumaApiRawResponse {
	entries: Array<{
		api_id: string;
		event: LumaEvent;
		tags: Array<{
			api_id: string;
			name: string;
		}>;
	}>;
	has_more: boolean;
	next_cursor?: string;
}

export function lumaEventLoader(config: { apiKey: string; calendarId: string }): Loader {
	return {
		name: 'luma-static-loader',
		load: async ({ store, logger }) => {
			logger.info('Fetching Luma events at build time...');
			
			if (!config.apiKey) {
				logger.error('LUMA_API_KEY is not configured');
				throw new Error('LUMA_API_KEY is required');
			}
			
			try {
				const response = await fetch(
					`https://public-api.luma.com/v1/calendar/list-events?calendar_api_id=${config.calendarId}`,
					{
						headers: {
							'x-luma-api-key': config.apiKey,
							'Content-Type': 'application/json',
						},
					}
				);
				
				if (!response.ok) {
					throw new Error(`Luma API error: ${response.status} ${response.statusText}`);
				}
				
				const data: LumaApiRawResponse = await response.json();
				const events = data.entries.map(entry => entry.event);
				
				logger.info(`Successfully fetched ${events.length} events`);
				
				// Clear existing entries
				store.clear();
				
				// Add each event to the store
				for (const event of events) {
					store.set({
						id: event.api_id,
						data: event as unknown as Record<string, unknown>,
					});
				}
				
				logger.info('Events stored successfully');
			} catch (error) {
				logger.error(`Failed to fetch events: ${error}`);
				throw error;
			}
		},
	};
}
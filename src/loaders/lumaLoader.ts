import type { LiveLoader } from 'astro/loaders';

export interface LumaEvent {
	api_id: string;
	created_at: string; // ISO 8601 Datetime
	cover_url: string;
	calendar_api_id: string;
	description: string;
	description_md: string;
	duration_interval: string;
	end_at: string; // ISO 8601 Datetime
	geo_address_json: {
		geo_latitude: string | null;
		geo_longitude: string | null;
		meeting_url: string | null;
	} | null;
	name: string;
	start_at: string; // ISO 8601 Datetime
	timezone: string; // IANA Timezone, e.g. America/New_York
	url: string;
	user_api_id: string;
	visibility: 'public' | 'members-only' | 'private';
	zoom_meeting_url: string | null;
	tags: Array<{
		api_id: string;
		name: string;
	}>;
}

export interface LumaApiResponse {
	entries: LumaEvent[];
	has_more: boolean;
	next_cursor?: string;
}

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

class LumaApiClient {
	private baseUrl = 'https://public-api.luma.com/v1';
	private apiKey: string;

	constructor(apiKey: string) {
		this.apiKey = apiKey;
	}

	private async request<T>(endpoint: string): Promise<T> {
		console.log('🌐 Making Luma API request to:', `${this.baseUrl}${endpoint}`);
		console.log('🔐 API key present:', !!this.apiKey, 'length:', this.apiKey?.length || 0);
		
		const response = await fetch(`${this.baseUrl}${endpoint}`, {
			headers: {
				'x-luma-api-key': this.apiKey,
				'Content-Type': 'application/json',
			},
		});

		console.log('📡 Luma API response status:', response.status, response.statusText);

		if (!response.ok) {
			throw new Error(`Luma API error: ${response.status} ${response.statusText}`);
		}

		return response.json();
	}

	async getCalendarEvents(calendarId: string): Promise<LumaApiResponse> {
		const response = await this.request<LumaApiRawResponse>(`/calendar/list-events?calendar_api_id=${calendarId}`);

		// Transform the response to extract the nested event data
		const result: LumaApiResponse = {
			entries: response.entries.map(entry => entry.event),
			has_more: response.has_more,
		};

		if (response.next_cursor !== undefined) {
			result.next_cursor = response.next_cursor;
		}

		return result;
	}

	async getEvent(eventId: string): Promise<LumaEvent> {
		return this.request<LumaEvent>(`/event/get?api_id=${eventId}`);
	}
}

export function lumaEventLoader(config: { apiKey: string; calendarId: string }): LiveLoader<LumaEvent> {
	console.log('🔧 Luma loader initialized with config:', {
		apiKey: config.apiKey ? `${config.apiKey.slice(0, 8)}...` : 'undefined',
		calendarId: config.calendarId
	});
	
	const client = new LumaApiClient(config.apiKey);

	return {
		name: 'luma-event-loader',
		loadCollection: async () => {
			console.log('📅 Loading Luma events collection...');
			try {
				const response = await client.getCalendarEvents(config.calendarId);
				console.log(`✅ Successfully loaded ${response.entries.length} events`);

				return {
					entries: response.entries.map(event => ({
						id: event.api_id,
						data: event,
					})),
				};
			} catch (error) {
				console.error('❌ Failed to load Luma events:', error);
				return {
					error: new Error(`Failed to load events: ${error instanceof Error ? error.message : String(error)}`),
				};
			}
		},
		loadEntry: async ({ filter }: { filter: { id: string } }) => {
			try {
				if (!filter.id) {
					return {
						error: new Error('Event ID is required'),
					};
				}

				const event = await client.getEvent(filter.id);

				return {
					id: event.api_id,
					data: event,
				};
			} catch (error) {
				return {
					error: new Error(`Failed to load event: ${error instanceof Error ? error.message : String(error)}`),
				};
			}
		},
	};
}

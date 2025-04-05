import type { DispatcherEvents } from '@/events';

type EventName = string | symbol;

type EventHandler<T = unknown> = (event: T) => void;
type EventHandlerSet<T = unknown> = Set<EventHandler<T>>;

type EventHandlersMap<Events extends Record<EventName, unknown>> = Map<
	keyof Events,
	EventHandlerSet<Events[keyof Events]>
>;

export function getEventDispatcher<
	Events extends Record<EventName, unknown>
>() {
	type Event = Events[keyof Events];

	const events: EventHandlersMap<Events> = new Map();

	return {
		on<Key extends keyof Events>(
			eventName: Key,
			handler: EventHandler<Events[Key]>
		): void {
			let eventHandlers = events.get(eventName);

			if (!eventHandlers) {
				const eventHandlersSet: EventHandlerSet<Event> = new Set();

				events.set(eventName, eventHandlersSet);

				eventHandlers = eventHandlersSet;
			}

			eventHandlers.add(handler as EventHandler<Event>);
		},
		emit<Key extends keyof Events>(eventName: Key, event?: Events[Key]): void {
			const handlers: EventHandlerSet<Events[Key]> | undefined =
				events.get(eventName);

			if (!handlers) return;

			handlers.forEach((fn) => fn(event!));
		}
	};
}

export const Dispatcher = getEventDispatcher<DispatcherEvents>();

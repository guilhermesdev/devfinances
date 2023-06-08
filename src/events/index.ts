export type EventsNames = 'update-transactions';

export const Dispatcher = {
	eventsCallbacks: new Map<EventsNames, Set<Function>>(),
	on(eventName: EventsNames, callback: Function): void {
		let eventCallbacks = this.eventsCallbacks.get(eventName);

		if (!eventCallbacks) {
			const eventCallbacksSet = new Set<Function>();

			this.eventsCallbacks.set(eventName, eventCallbacksSet);

			eventCallbacks = eventCallbacksSet;
		}

		eventCallbacks.add(callback);
	},
	emit(eventName: EventsNames): void {
		const callbacks = this.eventsCallbacks.get(eventName);

		if (!callbacks) return;

		callbacks.forEach((fn) => fn());
	}
};

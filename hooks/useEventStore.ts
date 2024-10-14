import { create } from "zustand";

interface Lead {
  id: string;
  name: string;
}

interface Event {
  id: string;
  title: string;
  lead: Lead | null;
  description: string;
  location: string;
  startTime: string;
  endTime: string;
}

interface EventStore {
  events: Event[];
  fetchEvents: (leadId: string) => Promise<void>;
  addEvent: (event: Event) => void;
  deleteEvent: (eventId: string) => void;
}

export const useEventStore = create<EventStore>((set) => ({
  events: [],
  fetchEvents: async (date: string) => {
    try {
      const response = await fetch(`/api/eventsCount?date=${date}`);
      if (!response.ok) {
        throw new Error("Error fetching events data");
      }
      const data: Event[] = await response.json();

      const eventsWithLeads = data.map((event) => ({
        ...event,
        lead: event.lead ? event.lead : { id: "", name: "Unknown Lead" },
      }));

      set({ events: eventsWithLeads });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
  addEvent: (event: Event) =>
    set((state) => ({ events: [...state.events, event] })),
  deleteEvent: (eventId: string) =>
    set((state) => ({
      events: state.events.filter((event) => event.id !== eventId),
    })),
}));

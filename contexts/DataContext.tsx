import { PrivateEvent, PublicEvent } from "@/types";
import { DateTime } from "luxon";
import { createContext, PropsWithChildren, useState } from "react";


export interface EventsState {
  events: PublicEvent[];
  privateEvents: PrivateEvent[];
  recurring: PrivateEvent[];
}

export interface DataState extends EventsState {
  setData: (data: Partial<EventsState>) => void,
  setPublicData: (data: PublicEvent[]) => void,
  refreshEvents: () => void,
}

export const DataContext = createContext<DataState>({
    events: [],
    privateEvents: [],
    recurring: [],
  setData: () => { },
  setPublicData: () => { },
  refreshEvents: () => {},
})


export const DataProvider = ({ children }: PropsWithChildren) => {

  const [events, setEvents] = useState([] as PublicEvent[]);
  const [privateEvents, setPrivateEvents] = useState([] as PrivateEvent[]);
  const [recurring, setRecurring] = useState([] as PrivateEvent[]);
  

  const setData = (data: Partial<EventsState>) => {
    if (data?.privateEvents) setPrivateEvents(data.privateEvents);
    if (data?.recurring) setRecurring(data.recurring);
  }

  const setPublicData = (newEvents: PublicEvent[]) => {
    newEvents.map((event) => {
      const index = events.findIndex((e) => e.id === event.id);
      if (index === -1) setEvents((st) => ([ ...st, event ]));
    })
    setEvents((st) => st.sort((a, b) => DateTime.fromISO(a.start).valueOf() - DateTime.fromISO(b.start).valueOf()));
  }

  const refreshEvents = () => {
    setEvents([]);
  }

  return (<DataContext.Provider value={{ events, privateEvents, recurring, setData, setPublicData, refreshEvents }}>
    {children}
  </DataContext.Provider>);
}
import { PrivateEvent, PublicEvent } from "@/types";
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

  const setPublicData = (events: PublicEvent[]) => {
    setEvents((st) => ([ ...st, ...events ]));
  }

  const refreshEvents = () => {
    setEvents([]);
  }

  return (<DataContext.Provider value={{ events, privateEvents, recurring, setData, setPublicData, refreshEvents }}>
    {children}
  </DataContext.Provider>);
}
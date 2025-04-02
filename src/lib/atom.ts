import { atom } from "jotai";
interface User {
  id?: number;
  email?: string;
  name?: string | null;
  surname?: string | null;
  phone?: string | null;
  address?: string | null;
  subscriptionStatus?: string;
  createdAt?: string;
  updatedAt?: string;
  iat?: number;
  userId?: any; 
}

export interface Event {
  eventId: string;
  bookmakerCount: number;
  date: string;
  eventStatus: string;
  participant1: string;
  participant1Id: number;
  participant2: string;
  participant2Id: number;
  startTime: number;
  time: string;
  tournamentId: number;
  meta?: {
    scores?: {
      away: number;
      home: number;
      winner: string;
    };
  };
}

export interface TournamentResponse {
  categoryName: string;
  events: Record<string, Event>;
}

export interface OddsResponse {
  eventId: string;
  odds: Record<string, any>; // Ajusta esto si tienes una estructura más específica
}

// Átomos con tipos
export const tournamentsDataAtom = atom<TournamentResponse[]>([]);
export const oddsDataAtom = atom<Record<string, OddsResponse>>({});
export const loadingAtom = atom<boolean>(true);
export const errorAtom = atom<string | null>(null);
// Átomo para el estado global 
export const userAtom = atom<User | null>(null);
export const oAuthAtom = atom(null);

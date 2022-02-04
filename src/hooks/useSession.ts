import { createContext, useContext } from "react";
import { Me } from "../logic/api";

export type Session =
  | { user: Me; logout: () => void }
  | { user: null; setToken: (token: string) => void };

export const SessionContext = createContext<Session | null>(null);

export function useSession(): Session {
  const session = useContext(SessionContext);
  if (session === null) {
    throw new Error("Fatal: Missing session context");
  }
  return session;
}

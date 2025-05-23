// app/context/SessionContext.tsx
"use client";

import { createContext, useContext } from "react";

export type SessionType = {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
} | null;

const SessionContext = createContext<SessionType>(null);

export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: SessionType;
}) => {
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};

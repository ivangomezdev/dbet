"use client"; // Esto indica que es un Client Component

import { SessionProvider } from "next-auth/react";
import { Provider } from "jotai";
import ClientProvider from "./ClientProvider";

export default function AllProviders({ children }) {
  return (
    <ClientProvider>
        <Provider>
      <SessionProvider >
          {children}
      </SessionProvider>
        </Provider>
    </ClientProvider>
  );
}
"use client";

import { CookiesProvider } from 'react-cookie';
import { ReactNode } from 'react';

export default function ClientProvider({ children }: { children: ReactNode }) {
  return <CookiesProvider>{children}</CookiesProvider>;
}
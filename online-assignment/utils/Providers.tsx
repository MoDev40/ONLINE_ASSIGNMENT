"use client"
import { AppStore, makeStore } from '@/lib/store';
import { ClerkProvider } from '@clerk/nextjs';
import React, { useRef } from 'react';
import { Provider } from 'react-redux';

function Providers({children}:{
    children:React.ReactNode;
}) {
    const storeRef = useRef<AppStore>()
    if (!storeRef.current) {
      // Create the store instance the first time this renders
      storeRef.current = makeStore()
    }
  return (
    <ClerkProvider>
    <Provider store={storeRef.current}>{children}</Provider>
    </ClerkProvider>
  )
}

export default Providers
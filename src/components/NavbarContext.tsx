'use client';

import React, { createContext, useContext } from 'react';

interface FilterTab {
  id: string;
  label: string;
}

interface NavbarContextValue {
  filterTabs: FilterTab[];
  activeFilter: string;
  onFilterChange: (id: string) => void;
}

const NavbarContext = createContext<NavbarContextValue>({
  filterTabs: [],
  activeFilter: 'all',
  onFilterChange: () => {},
});

export const NavbarProvider = NavbarContext.Provider;

export function useNavbar() {
  return useContext(NavbarContext);
}

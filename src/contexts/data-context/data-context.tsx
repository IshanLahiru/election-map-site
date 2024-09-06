// DataContext.tsx
import React, { createContext, useEffect, useState, ReactNode } from 'react';
import divisions from './data/division.json';
import parties from './data/party.json';
import electionResults from './data/result.json';
import {
  DataContextType,
  Division,
  Party,
  ElectionResult,
} from './types/data-intarfaces';

export const DataContext = createContext<DataContextType | undefined>(
  undefined
);

export const DataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [divisionArray, setDivisionArray] = useState<Division[]>([]);
  const [partyArray, setPartyArray] = useState<Party[]>([]);
  const [resultArray, setResultArray] = useState<ElectionResult[]>([]);

  useEffect(() => {
    const loadData = () => {
      setDivisionArray(divisions);
      setPartyArray(parties);
      setResultArray(electionResults);
    };

    loadData();
  }, []);

  return (
    <DataContext.Provider value={{ divisionArray, partyArray, resultArray }}>
      {children}
    </DataContext.Provider>
  );
};

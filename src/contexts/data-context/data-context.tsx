// DataContext.tsx
import React, { createContext, useEffect, useState, ReactNode } from 'react';
import divisions from './data/division.json';
import provinces from './data/province.json';
import parties from './data/party.json';
import electionResults from './data/result.json';
import {
  DataContextType,
  Division,
  Province,
  Party,
  ElectionResult,
} from './types/data-intarfaces';

export const DataContext = createContext<DataContextType | undefined>(
  undefined
);

export const DataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [divisionArray, setDivisionArray] = useState<Division[]>(divisions);
  const [provinceArray, setProvinceArray] = useState<Province[]>(provinces);
  const [partyArray, setPartyArray] = useState<Party[]>(parties);
  const [resultArray, setResultArray] = useState<ElectionResult[]>([]);

  // calculated states
  //need to calculate the colors that should be in those divisions and provinces. so there should be 2 arrays with colors
  // another array for sorted card layout to show on the side bar of that

  useEffect(() => {
    const loadData = () => {
      setDivisionArray(divisions);
      setProvinceArray(provinces);
      setPartyArray(parties);
      setResultArray(electionResults);
    };

    loadData();

    console.log(divisionArray);
    console.log(provinceArray);
    
    
  }, []);

  return (
    <DataContext.Provider value={{ divisionArray, provinceArray, partyArray, resultArray }}>
      {children}
    </DataContext.Provider>
  );
};

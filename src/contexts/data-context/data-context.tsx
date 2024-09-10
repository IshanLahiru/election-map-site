// DataContext.tsx
import React, { createContext, useEffect, useState, ReactNode } from 'react';
import divisions from './data/division.json';
import provinces from './data/province.json';
import parties from './data/party.json';
import divisionElectionResults from './data/division_result.json';
import provinceElectionResults from './data/province_result.json';
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
  const [divisionArray, setDivisionArray] = useState<Division[]>([]);
  const [provinceArray, setProvinceArray] = useState<Province[]>([]);
  const [partyArray, setPartyArray] = useState<Party[]>([]);
  const [divisionResultArray, setDivisionResultArray] = useState<
    ElectionResult[]
  >([]);
  const [provinceResultArray, setProvinceResultArray] = useState<
    ElectionResult[]
  >([]);

  useEffect(() => {
    const sampleDataGenerator = {};
    const loadData = () => {
      setDivisionArray(divisions);
      setProvinceArray(provinces);
      setPartyArray(parties);
      setProvinceResultArray(provinceElectionResults);
      setDivisionResultArray(divisionElectionResults);
    };

    loadData();

    console.log(divisionArray);
    console.log(provinceArray);
  }, []);

  return (
    <DataContext.Provider
      value={{
        divisionArray,
        provinceArray,
        partyArray,
        divisionResultArray,
        provinceResultArray,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

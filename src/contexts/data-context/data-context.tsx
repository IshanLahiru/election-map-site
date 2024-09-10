import React, { createContext, useEffect, useState, ReactNode } from 'react';
import divisions from './data/division.json';
import provinces from './data/province.json';
import parties from './data/party.json';
// import divisionElectionResults from './data/division_result.json';
// import provinceElectionResults from './data/province_result.json';
import {
  DataContextType,
  Division,
  Province,
  Party,
  ElectionResult,
} from './types/data-intarfaces';
import { getPollingData, SampleDataPack } from './data/dataHelper';

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
    const pollingData: SampleDataPack = getPollingData(parties, divisions, provinces, "PRESIDENTIAL-FIRST");
    const loadData = (divisions:Division[], provinces:Province[], parties:Party[], pollingData:SampleDataPack) => {
      setDivisionArray(divisions);
      setProvinceArray(provinces);
      setPartyArray(parties);
      setProvinceResultArray(pollingData.provinceResultArray);
      setDivisionResultArray(pollingData.divisionResultArray);
    };

    loadData(divisions, provinces, parties, pollingData);
  }, []);

  useEffect(() => {
    console.log(divisionArray);
  }, [divisionArray]);
  useEffect(() => {
    console.log(provinceArray);
  }, [provinceArray]);
  useEffect(() => {
    console.log(partyArray);
  }, [partyArray]);
  useEffect(() => {
    console.log(divisionResultArray);
  }, [divisionResultArray]);
  useEffect(() => {
    console.log(provinceResultArray);
  }, [provinceResultArray]);

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

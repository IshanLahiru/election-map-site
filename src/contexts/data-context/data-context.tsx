import React, { createContext, useEffect, useState, ReactNode } from 'react';
import divisions from './data/division.json';
import provinces from './data/province.json';
import parties from './data/party.json';
import {
  DataContextType,
  Division,
  Province,
  Party,
  ElectionResult,
  ColorData,
} from './types/data-intarfaces';
import {
  calculateAllIslandResult,
  getPollingData,
  getWinningPartyColors,
  SampleDataPack,
} from './data/dataHelper';

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
  const [allIslandResult, setAllIslandResult] = useState<ElectionResult>();
  const [divisionColorArray, setDivisionColorArray] = useState<ColorData[]>([]);
  const [provinceColorArray, setProvinceColorArray] = useState<ColorData[]>([]);

  useEffect(() => {
    const pollingData: SampleDataPack = getPollingData(
      parties,
      divisions,
      provinces,
      'PRESIDENTIAL-FIRST'
    );
    console.log(pollingData);
    
    const loadData = (
      divisions: Division[],
      provinces: Province[],
      parties: Party[],
      pollingData: SampleDataPack
    ) => {
      setDivisionArray(divisions);
      setProvinceArray(provinces);
      setPartyArray(parties);
      setProvinceResultArray(pollingData.provinceResultArray);
      setDivisionResultArray(pollingData.divisionResultArray);
      // setProvinceResultArray(divisionElectionResults);
      // setDivisionResultArray(provinceElectionResults);
    };

    loadData(divisions, provinces, parties, pollingData);
  }, []);

  useEffect(() => {
    const winningPartyColors = getWinningPartyColors(
      divisionResultArray,
      partyArray
    );
    setDivisionColorArray(winningPartyColors);
  }, [divisionResultArray, partyArray]);

  useEffect(() => {
    const allIslandResult = calculateAllIslandResult(
      provinceResultArray,
      partyArray
    );
    setAllIslandResult(allIslandResult);
    const winningPartyColors = getWinningPartyColors(
      provinceResultArray,
      partyArray
    );
    setProvinceColorArray(winningPartyColors);
  }, [provinceResultArray, partyArray]);

  return (
    <DataContext.Provider
      value={{
        divisionArray,
        provinceArray,
        partyArray,
        divisionResultArray,
        provinceResultArray,
        allIslandResult,
        divisionColorArray,
        provinceColorArray,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

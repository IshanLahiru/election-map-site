import React, { useContext, useEffect, useState } from 'react';
import SidebarCard from '../cards/sidebar-card/sidebar-card';
import './style.css';
import { DataContext } from '../../contexts/data-context/data-context';
import {
  Party,
  PartyResult,
} from '../../contexts/data-context/types/data-intarfaces';
import { getPartyByName } from '../../contexts/data-context/util/data-util';

interface PartyData {
  party_name: string;
  votes: number;
  percentage: number;
  seats?: number;
}

interface FullData {
  island_wide: PartyData[];
  division_wide: PartyData[];
}

interface PartialData {
  by_party?: PartyData[];
}

interface SidebarProps {
  type: FullData | PartialData;
}

const Sidebar: React.FC<SidebarProps> = () => {
  const { allIslandResult, partyArray } = useContext(DataContext) || {
    divisionArray: [],
    provinceArray: [],
    partyArray: [],
    divisionColorArray: [],
    provinceColorArray: [],
  };

  const [allIslandResultByParty, setAllIslandResultByPArty] = useState<
    PartyResult[]
  >([]);
  const [parties, setParties] = useState<Party[]>([]);

  useEffect(() => {
    if (allIslandResult) {
      setAllIslandResultByPArty(allIslandResult.by_party);
    }
  }, [allIslandResult]);

  useEffect(() => {
    setParties(partyArray);
  }, [partyArray]);

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">All Island Results - Final</h2>

      <div className="results-container">
        {allIslandResultByParty.length > 0 ? (
          allIslandResultByParty.map((party, index) => (
            <SidebarCard
              key={index}
              ob={{
                iconUrl: `src/contexts/data-context/data/svgs/${getPartyByName(parties, party.party_name)?.image ? getPartyByName(parties, party.party_name)?.image : 'janadhipathuwaranaya.svg'}`,
                name: party.party_name,
                voteCount: party.votes,
                percentage: isNaN(+party.percentage.replace('%', '').trim())
                  ? 0
                  : +party.percentage.replace('%', '').trim(),
                rank: index + 1,
                color:
                  getPartyByName(parties, party.party_name)?.color || '#0ttt',
              }}
            />
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;

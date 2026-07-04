import React, { useContext, useEffect, useState } from 'react';
import SidebarCard from '../cards/sidebar-card/sidebar-card';
import './style.css';
import { DataContext } from '../../contexts/data-context/data-context';
import {
  Party,
  PartyResult,
} from '../../contexts/data-context/types/data-intarfaces';
import { getPartyByCode } from '../../contexts/data-context/util/data-util';

const Sidebar: React.FC = () => {
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
                name:
                  party.party_code === 'OTH'
                    ? party.party_name
                    : party.candidate,
                voteCount: party.votes,
                percentage: isNaN(+party.percentage.replace('%', '').trim())
                  ? 0
                  : +party.percentage.replace('%', '').trim(),
                rank: index + 1,
                color:
                  getPartyByCode(parties, party.party_code)?.color ||
                  '#8a8a8a',
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

import React, { useContext, useEffect, useState } from 'react';
import { FullData } from '../map-component/map-component';
import './style.css';
import ModalCard from '../cards/modal-card/modal-card';
import { DataContext } from '../../contexts/data-context/data-context';
import { ElectionResult, Party } from '../../contexts/data-context/types/data-intarfaces';
import { getPartyByName } from '../../contexts/data-context/util/data-util';

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  dta: ElectionResult;
  title: string;
}

const Modal: React.FC<ModalProps> = ({ isVisible, onClose, dta, title }) => {
  const {
    partyArray
  } = useContext(DataContext)|| {
    divisionArray: [],
    provinceArray: [],
    partyArray: [],
    divisionColorArray: [],
    provinceColorArray: [],
  };

  const [allIslandResultByParty,setAllIslandResultByPArty] = useState<PartyResult[]>([]);
  const [parties,setParties] = useState<Party[]>([]);

  useEffect(() => {
    if (dta) {
      setAllIslandResultByPArty(dta.by_party);
    }
  }, [dta]);

  useEffect(() => {
    setParties(partyArray);
  }, [partyArray]);

  if (!isVisible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <div>
            <h2>{`${title} Results`}</h2>
          </div>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-content">
          {dta.by_party.length > 0 ? (
            dta.by_party.map((party, index) => (
              <ModalCard
              key={index}
              ob={{
                iconUrl: `src/contexts/data-context/data/svgs/${getPartyByName(parties, party.party_name)?.image}`,
                name: party.party_name,
                voteCount: party.votes,
                percentage: (isNaN(+party.percentage.replace('%', '').trim()) ? 0 : +party.percentage.replace('%', '').trim()),
                rank: index+1,
                color: getPartyByName(parties, party.party_name)?.color || '#0000',
              }}/>
            ))
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;

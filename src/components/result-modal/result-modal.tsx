import React, { useContext, useEffect, useState } from 'react';
import './style.css';
import ModalCard from '../cards/modal-card/modal-card';
import { DataContext } from '../../contexts/data-context/data-context';
import { ElectionResult, Party } from '../../contexts/data-context/types/data-intarfaces';
import { getPartyByCode } from '../../contexts/data-context/util/data-util';

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

  const [parties, setParties] = useState<Party[]>([]);

  useEffect(() => {
    setParties(partyArray);
  }, [partyArray]);

  if (!isVisible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <div>
            <h2 className="modal-title">{`${title} Results`}</h2>
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
                name:
                  party.party_code === 'OTH'
                    ? party.party_name
                    : party.candidate,
                voteCount: party.votes,
                percentage: (isNaN(+party.percentage.replace('%', '').trim()) ? 0 : +party.percentage.replace('%', '').trim()),
                rank: index+1,
                color: getPartyByCode(parties, party.party_code)?.color || '#8a8a8a',
              }}/>
            ))
          ) : (
            <p>No data available</p>
          )}
        </div>
        <div className="modal-footer-stats">
          <span>Valid votes: {dta.summary.valid.toLocaleString()}</span>
          {dta.ed_code.startsWith('division-') && (
            <span>Turnout: {dta.summary.percent_polled}%</span>
          )}
        </div>
        {dta.note && <p className="modal-note">{dta.note}</p>}
      </div>
    </div>
  );
};

export default Modal;

import React from 'react';
import { FullData } from '../map-component/map-component';
import './style.css';
import ModalCard from '../cards/modal-card/modal-card';

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  dta: FullData;
  title: string;
}

const Modal: React.FC<ModalProps> = ({ isVisible, onClose, dta, title }) => {
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
          {dta.island_wide.length > 0 ? (
            dta.island_wide.map((party, index) => (
              <ModalCard
                key={index}
                ob={{
                  iconUrl: '',
                  name: party.party_name,
                  voteCount: party.votes,
                  percentage: party.percentage,
                  rank: party.seats || 0,
                }}
              />
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

import React from 'react';
import './style.css';

interface ModalCardProps {
  ob: {
    iconUrl: string;
    name: string;
    voteCount: number;
    percentage: number;
    rank: number;
    color: string;
  };
}

const ModalCard: React.FC<ModalCardProps> = ({ ob }) => {
  return (
    <div className="card futuristic-card">
      <div className="party-logo">
        <img src={ob.iconUrl} alt={`1`} style={{backgroundColor: `${ob.color}` }} />
      </div>
      <div className="dtlSection">
        <div className='party-name'>{ob.name}</div>
        <div className='progressbarPart'>
            <div className='progress-bar'>
            <div className="progress-bar-fill" style={{ width: `${ob.percentage}%`, backgroundColor: `${ob.color}`   }}></div>
            </div>
        </div>
        <div className='percentage-and-count'>
            <div className='vote-count'>{ob.voteCount.toLocaleString()}</div>
            <div className='percentage'>{ob.percentage}%</div>
        </div>
      </div>
    </div>
  );
};

export default ModalCard;

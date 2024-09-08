import React from 'react';
import './style.css';

interface SidebarCardProps {
    ob: {
        iconUrl: string;
        name: string;
        voteCount: number;
        percentage: number;
        seats: number;
    };
}

const SidebarCard: React.FC<SidebarCardProps> = ({ ob }) => {
    return (
        <div className="card futuristic-card">
            <div className="card-content">
                <img src={ob.iconUrl} alt={`${ob.name} icon`} />
                <div className="party-info">
                    <div className="party-name">{ob.name}</div>
                    <div className="vote-count">{ob.voteCount.toLocaleString()}</div>
                </div>
                <div className="progress-bar">
                    <div className="progress-bar-fill" style={{ width: `${ob.percentage}%` }}></div>
                </div>
                <div className="percentage">{ob.percentage}%</div>
                <div className="seat-count">{'🪑'.repeat(ob.seats)}</div>
            </div>
        </div>
    );
};

export default SidebarCard;

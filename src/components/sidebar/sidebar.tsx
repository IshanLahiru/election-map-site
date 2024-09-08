import React from 'react';
import SidebarCard from '../cards/sidebar-card/sidebar-card';

interface PartyData {
  party_name: string;
  votes: number;
  percentage: number;
  seats?: number;
}

interface SidebarProps {
  type?: {
    by_party?: PartyData[];
  };
}

// Sample data array
const sampleData = {
  by_party: [
    {
      party_name: 'Party A',
      votes: 1500,
      percentage: 45,
      seats: 3,
    },
    {
      party_name: 'Party B',
      votes: 1000,
      percentage: 30,
      seats: 2,
    },
    {
      party_name: 'Party C',
      votes: 500,
      percentage: 15,
      seats: 1,
    },
    {
      party_name: 'Party D',
      votes: 300,
      percentage: 10,
      seats: 1,
    },
  ],
};

const Sidebar: React.FC<SidebarProps> = ({ type = sampleData }) => {
  return (
    <div className="sidebar" id="the-sidebar">
      <div className="sidebar-header">
        <h2>Results</h2>
      </div>
      <div className="results-container">
        {type.by_party && type.by_party.length > 0 ? (
          type.by_party.map((party, index) => (
            <SidebarCard
              key={index}
              ob={{
                iconUrl: '',
                name: party.party_name,
                voteCount: party.votes,
                percentage: party.percentage,
                seats: party.seats || 0,
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

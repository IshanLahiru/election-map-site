import React, { useState } from 'react';
import SidebarCard from '../cards/sidebar-card/sidebar-card';
import './style.css';

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

// Sample data for both island-wide and division-wide results
const sampleData: FullData = {
  island_wide: [
    { party_name: 'Party Aakdsfklasdj', votes: 1500, percentage: 45, seats: 3 },
    { party_name: 'Party B', votes: 1000, percentage: 30, seats: 2 },
    { party_name: 'Party C', votes: 500, percentage: 15, seats: 1 },
    { party_name: 'Party D', votes: 300, percentage: 10, seats: 1 },
  ],
  division_wide: [
    { party_name: 'Party X', votes: 100, percentage: 35, seats: 1 },
    { party_name: 'Party Y', votes: 80, percentage: 28, seats: 0 },
    { party_name: 'Party Z', votes: 60, percentage: 22, seats: 0 },
    { party_name: 'Party W', votes: 40, percentage: 15, seats: 0 },
  ],
};

const isFullData = (data: FullData | PartialData): data is FullData => {
  return (data as FullData).island_wide !== undefined;
};

const Sidebar: React.FC<SidebarProps> = ({ type = sampleData }) => {
  const [isIslandWide, setIsIslandWide] = useState(true);

  const currentData = isFullData(type)
    ? isIslandWide
      ? type.island_wide
      : type.division_wide
    : type.by_party || [];

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">All Island Results - Final</h2>

      <div className="results-container">
        {currentData.length > 0 ? (
          currentData.map((party, index) => (
            <SidebarCard
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
  );
};

export default Sidebar;

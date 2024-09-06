// Sidebar.tsx
import React from 'react';
//import './Sidebar.css';

interface SidebarProps {
  type?: {
    by_party?: {
      party_name: string;
      votes: number;
      percentage: number;
      seats?: number;
    }[];
  };
}

const Sidebar: React.FC<SidebarProps> = ({ type }) => {
  return (
    <div className="sidebar" id="the-sidebar">
      <div className="sidebar-header">
        {/* {provinceName()} Replace with your actual provinceName function */}
      </div>
      <div className="results-container">
        {/* {type && type.by_party && type.by_party.length > 0 ? (
                    type.by_party.map((party) => (

                        //generate the sidebar
                        console.log('party', party);
                        // theSidebarCard({
                        //     name: party.party_name,
                        //     voteCount: party.votes,
                        //     percentage: party.percentage,
                        //     seats: party.seats || 1,
                        //     iconUrl: 'party-icon-url'
                        // })
                    ))
                ) : (
                    'No data available'
                )} */}
      </div>
    </div>
  );
};

export default Sidebar;

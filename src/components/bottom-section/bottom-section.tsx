import React, { useContext } from 'react';
import './style.css';
import { DataContext } from '../../contexts/data-context/data-context';
import { getPartyByCode } from '../../contexts/data-context/util/data-util';

const BottomSection: React.FC = () => {
  const { allIslandResult, partyArray } = useContext(DataContext) || {
    partyArray: [],
  };

  if (!allIslandResult) {
    return <div className="bottom-section" />;
  }

  const leader = allIslandResult.by_party[0];
  const leaderColor = leader
    ? getPartyByCode(partyArray || [], leader.party_code)?.color
    : undefined;

  return (
    <div className="bottom-section">
      <div className="stat-card">
        <span className="stat-label">Leading Candidate</span>
        <span
          className="stat-value stat-value-accent"
          style={leaderColor ? { color: leaderColor } : undefined}
        >
          {leader?.candidate}
        </span>
        <span className="stat-sub">{leader?.percentage}% of valid votes</span>
      </div>
      <div className="stat-card">
        <span className="stat-label">Total Valid Votes</span>
        <span className="stat-value">
          {allIslandResult.summary.valid.toLocaleString()}
        </span>
        <span className="stat-sub">Island-wide, first count</span>
      </div>
      <div className="stat-card">
        <span className="stat-label">Voter Turnout</span>
        <span className="stat-value">
          {allIslandResult.summary.percent_polled}%
        </span>
        <span className="stat-sub">
          {allIslandResult.summary.rejected.toLocaleString()} rejected votes
        </span>
      </div>
    </div>
  );
};

export default BottomSection;

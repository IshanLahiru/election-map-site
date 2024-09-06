import React from 'react';
//import './BottomSection.css';

interface BottomSectionProps {
  resultArray: { pd_name: string; [key: string]: any }[];
}

const BottomSection: React.FC<BottomSectionProps> = ({ resultArray }) => {
  return (
    <div className="bottom-section">
      {/* {resultArray.map((ob) => createDivisionCard(ob.pd_name, ob)).join('')} */}
    </div>
  );
};

const createDivisionCard = (pd_name: string, ob: any) => {
  return (
    <div className="district-card-new" key={pd_name}>
      <div className="district-header-new">{pd_name}</div>
      {/* Add more content based on ob */}
    </div>
  );
};

export default BottomSection;

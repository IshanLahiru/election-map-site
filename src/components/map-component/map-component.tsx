import React, { useEffect, useState } from 'react';
import DivisionSvg from './maps/map-divisions.svg';
import DistrictSvg from './maps/map-districts.svg';
import { parse, stringify } from 'svgson';

import { districtMap, divisionMap, pathExample } from './maps/dmap';
import './style.css';
import MapDistricts from './maps/map-districts';

const MapContent: React.FC = () => {
  const [districtsDivisionToggler, setDistrictsDivisionToggler] = useState(true);
  const [divisionSvg, setDivisionSvg] = useState(DivisionSvg);
  const [districtSvg, setDistrictSvg] = useState(DistrictSvg);
  const [hoverInfo, setHoverInfo] = useState({ visible: false, x: 0, y: 0, content: '' });

  useEffect(() => {
    setDistrictSvg(DistrictSvg);
    setDivisionSvg(DivisionSvg);

    parse(districtMap).then((result) => {
      console.log('District SVG parsed:', result);
    });
    parse(divisionMap).then((result) => {
      console.log('Division SVG parsed:', result);
    });
    parse(pathExample).then((result) => {
      console.log('District SVG parsed:', result);
    });
  }, []);

  // Handle button click to toggle between district and division SVG
  const handleToggle = (type: 'district' | 'division') => {
    setDistrictsDivisionToggler(type === 'division');
  };

  // Handle mouse movement on the SVG areas
  const handleMouseMove = (event: React.MouseEvent<HTMLImageElement, MouseEvent>, content: string) => {
    setHoverInfo({
      visible: true,
      x: event.clientX,
      y: event.clientY,
      content,
    });
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    setHoverInfo({ visible: false, x: 0, y: 0, content: '' });
  };

  return (
    <div className="main-content">
      {/* Toggle buttons */}
      <div>
        <button
          type="button"
          className='btn btn1'
          onClick={() => handleToggle('division')}
        >
          Division
        </button>
        <button
          type="button"
          className='btn btn1'
          onClick={() => handleToggle('district')}
        >
          District
        </button>
      </div>



      {/* Conditionally render the appropriate map */}
      {districtsDivisionToggler ? (
        <div>
          <MapDistricts/>
        </div>
      ) : (
        <div>
          <img
            src={districtSvg}
            alt="District Map"
            onMouseMove={(e) => handleMouseMove(e, 'District Area')}
            onMouseLeave={handleMouseLeave}
          />
        </div>
      )}

      {/* Floating div for showing hover information */}
      {hoverInfo.visible && (
        <div
          id="floatingDiv"
          style={{
            position: 'absolute',
            left: hoverInfo.x + 10,
            top: hoverInfo.y + 10,
            display: 'block',
            background: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '5px',
            borderRadius: '4px',
          }}
        >
          {hoverInfo.content}
        </div>
      )}
    </div>
  );
};

export default MapContent;

import React, { useContext, useState } from 'react';
import './style.css';
import MapDistricts from './maps/map-districts';
import MapDivision from './maps/map-divisions';
import { DataContext } from '../../contexts/data-context/data-context';
import {
  Division,
  Province,
} from '../../contexts/data-context/types/data-intarfaces';

const MapContent: React.FC = () => {
  const [districtsDivisionToggler, setDistrictsDivisionToggler] =
    useState(true);
  const { divisionArray, provinceArray, partyArray, resultArray } =
    useContext(DataContext);
  const [hoverInfo, setHoverInfo] = useState({
    visible: false,
    x: 0,
    y: 0,
    content: '',
  });

  const handleToggle = (type: 'district' | 'division') => {
    setDistrictsDivisionToggler(type === 'division');
  };

  const handleMouseEnter = (event: React.MouseEvent<SVGPathElement>) => {
    const dataId = event.currentTarget.getAttribute('data-id');
    event.currentTarget.setAttribute('opacity', '0.6');

    let matched;

    if (districtsDivisionToggler) {
      matched = divisionArray.find(
        (division: Division) => division.divisionId === dataId
      );

      if (matched) {
        setHoverInfo({
          visible: true,
          x: event.clientX,
          y: event.clientY,
          content: `${matched.divisionName}`,
        });
        console.log('Matched Division:', matched);
      } else {
        console.log('No matching division found for ID:', dataId);
      }
    } else {
      matched = provinceArray.find(
        (province: Province) => province.provinceId === dataId
      );

      if (matched) {
        setHoverInfo({
          visible: true,
          x: event.clientX,
          y: event.clientY,
          content: `${matched.provinceName}`,
        });
        console.log('Matched Province:', matched);
      } else {
        console.log('No matching province found for ID:', dataId);
      }
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (hoverInfo.visible) {
      setHoverInfo((prev) => ({
        ...prev,
        x: event.clientX,
        y: event.clientY,
      }));
    }
  };

  const handleMouseLeave = (event: React.MouseEvent<SVGPathElement>) => {
    const dataId = event.currentTarget.getAttribute('data-id');
    event.currentTarget.setAttribute('opacity', '1');
    setHoverInfo((prev) => ({ ...prev, visible: false }));
  };

  const handleClick = (event: React.MouseEvent<SVGPathElement>) => {
    const dataId = event.currentTarget.getAttribute('data-id');
    console.log('Clicked on:', dataId);
  };

  const changeColor = (dataId: string, fill: string, stroke: string) => {
    // Add logic to change color if needed
  };

  return (
    <div className="main-content">
      {/* Toggle buttons */}
      <div className="button-container">
        <button
          type="button"
          className={`btn btn1 ${districtsDivisionToggler ? 'active' : ''}`}
          onClick={() => handleToggle('division')}
        >
          Division
        </button>
        <button
          type="button"
          className={`btn btn2 ${!districtsDivisionToggler ? 'active' : ''}`}
          onClick={() => handleToggle('district')}
        >
          District
        </button>
      </div>

      {/* Conditionally render the appropriate map */}
      <div className="map-container" onMouseMove={handleMouseMove}>
        {districtsDivisionToggler ? (
          <MapDivision
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            handleClick={handleClick}
          />
        ) : (
          <MapDistricts
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            handleClick={handleClick}
          />
        )}
      </div>

      {hoverInfo.visible && (
        <div
          className="floating-div"
          style={{
            left: hoverInfo.x - 115,
            top: hoverInfo.y - 115,
          }}
        >
          {hoverInfo.content}
        </div>
      )}
    </div>
  );
};

export default MapContent;

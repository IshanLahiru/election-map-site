import React, { useContext, useState } from 'react';
import './style.css';
import MapDistricts from './maps/map-districts';
import MapDivision from './maps/map-divisions';
import { DataContext } from '../../contexts/data-context/data-context';
import Modal from '../result-modal/result-modal';
import {
  Division,
  ElectionResult,
  Province,
} from '../../contexts/data-context/types/data-intarfaces';

interface PartyData {
  party_name: string;
  votes: number;
  percentage: number;
  seats?: number;
}

export interface FullData {
  island_wide: PartyData[];
  division_wide: PartyData[];
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

const MapContent: React.FC = () => {
  const [districtsDivisionToggler, setDistrictsDivisionToggler] =
    useState(true);
  const {
    divisionArray,
    provinceArray,
    partyArray,
    divisionColorArray,
    provinceColorArray,
    divisionResultArray,
    provinceResultArray,
  } = useContext(DataContext)|| {
    divisionArray: [],
    provinceArray: [],
    partyArray: [],
    divisionColorArray: [],
    provinceColorArray: [],
  };
  const [hoverInfo, setHoverInfo] = useState({
    visible: false,
    x: 0,
    y: 0,
    content: '',
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [result, setResult] = useState<ElectionResult>();

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleToggle = (type: 'district' | 'division') => {
    setDistrictsDivisionToggler(type === 'division');
  };

  const getPartyResultByPartyCode = (electionResults: ElectionResult[], partyCode: string): ElectionResult | undefined => {
      const partyResult = electionResults.find(party => party.ed_code === partyCode);
      if (partyResult) {
        return partyResult;
      }
    return undefined;
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
    event.currentTarget.setAttribute('opacity', '1');
    setHoverInfo((prev) => ({ ...prev, visible: false }));
  };

  const handleClick = (event: React.MouseEvent<SVGPathElement>) => {
    const dataId = event.currentTarget.getAttribute('data-id');
    setIsModalVisible(true);
    

    let matched;

    if (districtsDivisionToggler) {
      matched = divisionArray.find(
        (division: Division) => division.divisionId === dataId
      );
      console.log('Matched Division:', matched);
      console.log('Division Result Array:', divisionResultArray);
      console.log('Clicked on:', dataId);

      if (matched) {
        setModalTitle(`${matched.divisionName} Division`);
        if (divisionResultArray){
          const result = getPartyResultByPartyCode(divisionResultArray, matched.divisionId);
          setResult(result);
          console.log('Result is by the adnshfjkahsdlfjalskdhq :', result);
        }
      } else {
        console.log('No matching division found for ID:', dataId);
      }
    } else {
      matched = provinceArray.find(
        (province: Province) => province.provinceId === dataId
      );

      if (matched) {
        setModalTitle(`${matched.provinceName} Province`);
        if (provinceResultArray){
          const result = getPartyResultByPartyCode(provinceResultArray, matched.provinceId);
          setResult(result);
          console.log('Result is by the adnshfjkahsdlfjalskdhq :', result);
        }
      } else {
        console.log('No matching province found for ID:', dataId);
      }
    }
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
            colors={divisionColorArray}
          />
        ) : (
          <MapDistricts
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            handleClick={handleClick}
            colors={provinceColorArray}
          />
        )}
      </div>
      <Modal
        isVisible={isModalVisible}
        onClose={closeModal}
        title={modalTitle}
        dta={result}
      ></Modal>

      {hoverInfo.visible && (
        <div
          className="floating-div"
          style={{
            left: hoverInfo.x - window.innerWidth * 0.105,
            top: hoverInfo.y - window.innerHeight * 0.1,
          }}
        >
          {hoverInfo.content}
        </div>
      )}
    </div>
  );
};

export default MapContent;

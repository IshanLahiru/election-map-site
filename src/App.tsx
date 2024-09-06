import React from 'react';
import MapContent from './components/map-component/map-component';
import Sidebar from './components/sidebar/sidebar';
import BottomSection from './components/bottom-section/bottom-section';
import './App.css';

const App: React.FC = () => {
  return (
    <div>
      <div id="container">
        <MapContent />
        <Sidebar />
        <div id="bottom-section-container" className="bottom-section">
          <BottomSection resultArray={[]} />
        </div>
      </div>
    </div>
  );
};

export default App;

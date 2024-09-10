import React from 'react';
import MapContent from './components/map-component/map-component';
import Sidebar from './components/sidebar/sidebar';
import BottomSection from './components/bottom-section/bottom-section';
import { DataProvider } from './contexts/data-context/data-context';
import './App.css';
import Header from './components/header/header';
import Footer from './components/footer/footer';

const App: React.FC = () => {
  return (
    <div>
      <DataProvider>
        <Header />
        <div className="main-container">
          <MapContent />
          <Sidebar />
          <div id="bottom-section-container" className="bottom-section">
            <BottomSection resultArray={[]} />
          </div>
        </div>
        <Footer />
      </DataProvider>
    </div>
  );
};

export default App;

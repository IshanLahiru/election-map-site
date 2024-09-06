import React, { useState } from 'react';

const MapDivisions: React.FC = () => {
  // State to hold fill and stroke colors for each path
  const [colors, setColors] = useState<{ [key: string]: { fill: string; stroke: string } }>({});

  // Event Handlers
  const handleMouseEnter = (event: React.MouseEvent<SVGPathElement>) => {
    const dataId = event.currentTarget.getAttribute('data-id');
    event.currentTarget.setAttribute('opacity', '0.6');
    console.log('Mouse entered:', dataId);
  };

  const handleMouseLeave = (event: React.MouseEvent<SVGPathElement>) => {
    const dataId = event.currentTarget.getAttribute('data-id');
    event.currentTarget.setAttribute('opacity', '1');
    console.log('Mouse left:', dataId);
  };

  const handleClick = (event: React.MouseEvent<SVGPathElement>) => {
    const dataId = event.currentTarget.getAttribute('data-id');
    console.log('Clicked on:', dataId);
  };

  // Function to change color based on data-id
  const changeColor = (dataId: string, fill: string, stroke: string) => {
    setColors(prev => ({ ...prev, [dataId]: { fill, stroke } })); // Update colors state
  };

  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Paths can be added dynamically here */}
      {/* Example of how you would use the state colors */}
      {/* <path
          d="M10 10 H 90 V 90 H 10 Z"
          data-id="path-1"
          fill={colors['path-1']?.fill || '#fff'} // Default fill color
          stroke={colors['path-1']?.stroke || '#000'} // Default stroke color
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
      /> */}
      {/* Add more paths as needed */}
    </svg>
  );
};

export default MapDivisions;

import React from 'react';

const ChangeNodeViewButton = ({ onClick }) => (
  <button
    onClick={onClick}
    style={{
      position: 'absolute',
      top: '100px',
      left: '40px',
      zIndex: 1000,
      backgroundColor: '#006699',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
      style={{ width: '24px', height: '24px' }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
      />
    </svg>
  </button>
);

export default ChangeNodeViewButton;

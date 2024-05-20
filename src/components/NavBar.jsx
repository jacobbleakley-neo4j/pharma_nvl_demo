import React from 'react';
import logo from '../assets/logo.png'; // Make sure the path to your logo is correct

const NavBar = ({ viewMode, toggleView }) => (
  <nav className="navbar fixed top-0 left-0 right-0 bg-white shadow-md flex justify-between items-center p-4">
    <div className="flex items-center">
      <img src={logo} alt="Logo" className="h-10" />
    </div>
    <button
      onClick={toggleView}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Switch to {viewMode === 'graph' ? 'Table' : 'Graph'} View
    </button>
  </nav>
);

export default NavBar;

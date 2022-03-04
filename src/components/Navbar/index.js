import React from 'react';
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="md:flex items-center justify-between p-6 md:p-12">
      <div className="md:w-10/12">
        <h1>ASSETS</h1>
      </div>

      <div className="md:w-2/12 flex items-center justify-end md:w-4/12 -mx-4">
        <div className="inline-block px-4">
          <Link to="/">HOME</Link>
        </div>
        <div className="inline-block px-4">
          <Link to="/assets">GUIDE</Link>
        </div>
        <div className="inline-block px-4">
          <Link to="/">CONTACT</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

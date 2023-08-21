import React from 'react';
import '/src/App.css'


function NavBar() {
  return (
    <nav className='NavBar'>
        <img src='/logo.png' height='65px'/>
        <div/>
        <div className='Links'>
            <a className="link" href="/" >Home</a>
            <a className="link" href="/comunidade">Comunidade</a>
        </div>
    </nav>
  );
}

export default NavBar;

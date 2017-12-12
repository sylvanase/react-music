import React from 'react';
import 'styles/header.scss'

class Header extends React.Component {
  render() {
    return (
      <div className="components-header row">
        <img src="/images/logo.png" alt="" width="40" alt="" className="-col-auto"/>
        <h1 className="caption">
          React Music Player
        </h1>
      </div>
    );
  }
}

Header.defaultProps = {};

export default Header;

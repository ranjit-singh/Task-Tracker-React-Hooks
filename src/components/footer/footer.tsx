import React from 'react';
import './footer.scss';

const Footer = () => {
  return (
    <React.Fragment>
      <footer className='footer d-sm-flex justify-content-between'>
        <div>{'Robert Bosch'}</div>
        <div>&copy;2022 All rights reserved</div>
      </footer>
    </React.Fragment>
  );
};

export default Footer;

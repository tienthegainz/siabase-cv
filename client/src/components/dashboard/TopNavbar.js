import React, { memo, useContext } from 'react';
import { Link } from 'gatsby';
import Avatar from '../shared/Avatar';
import SettingsContext from '../../contexts/SettingsContext';
import FullLogoLight from '../../../static/images/full-logo-light.svg';
import FullLogoDark from '../../../static/images/full-logo-dark.svg';
import styles from './TopNavbar.module.css';

const TopNavbar = () => {
  const { theme } = useContext(SettingsContext);

  return (
    <div className={styles.navbar}>
      <div className='container'>
        <div
          className='top-left'
          style={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Link to='/'>
            <img
              src={theme === 'Light' ? FullLogoLight : FullLogoDark}
              alt='EzCV'
              width='35%'
            />
          </Link>
          <Link
            to='/app/dashboard/'
            style={{
              fontSize: 30,
              marginRight: 20,
              textDecoration: 'inherit'
            }}
          >
            Dashboard
          </Link>
          <Link
            to='/app/companies/'
            style={{
              fontSize: 30,
              marginRight: 20,
              textDecoration: 'inherit'
            }}
          >
            Companies
          </Link>
        </div>
        <Avatar className='ml-8' />
      </div>
    </div >
  );
};

export default memo(TopNavbar);

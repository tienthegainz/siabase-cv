import React from 'react';
// import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/database';
// import 'firebase/functions';
// import 'firebase/storage';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { DatabaseProvider } from './src/contexts/DatabaseContext';
import { ModalProvider } from './src/contexts/ModalContext';
import { ResumeProvider } from './src/contexts/ResumeContext';
import { SettingsProvider } from './src/contexts/SettingsContext';
// import { StorageProvider } from './src/contexts/StorageContext';
// import { LocalResumeProvider } from './src/contexts/LocalResumeContext';
import { UserProvider } from './src/contexts/UserContext';
import 'animate.css';
import './src/i18n';
import './src/styles/forms.css';
import './src/styles/global.css';
import './src/styles/shadows.css';
import './src/styles/tailwind.css';
import './src/styles/toastify.css';
import './src/utils/dayjs';

const theme = createMuiTheme({
  typography: {
    fontWeightRegular: 500,
    fontFamily: ['Montserrat', 'sans-serif'].join(',')
  }
});

// eslint-disable-next-line import/prefer-default-export
export const wrapRootElement = ({ element }) => (
  <SettingsProvider>
    <MuiThemeProvider theme={theme}>
      <ModalProvider>
        <UserProvider>
          <DatabaseProvider>
            <ResumeProvider>{element}</ResumeProvider>
          </DatabaseProvider>
        </UserProvider>
      </ModalProvider>
    </MuiThemeProvider>
  </SettingsProvider>
);

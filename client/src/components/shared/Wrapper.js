import React, { memo, useEffect } from 'react';
import { Slide, toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import ModalRegistrar from '../../modals/ModalRegistrar';

const Wrapper = ({ children }) => {
  useEffect(() => {
    toast.configure({
      role: 'alert',
      hideProgressBar: true,
      transition: Slide,
      closeButton: false,
      position: 'bottom-right',
      pauseOnFocusLoss: false
    });
  }, []);

  return (
    <>
      <Helmet>
        <html lang='en' />
        <title>SiabaseCV</title>
        <meta
          name='description'
          content='A free and open source resume builder that’s built to make the mundane tasks of creating, updating and sharing your resume as easy as writing alphabet.'
        />
        <link rel='canonical' href='https://siabase-cv.web.app/' />
        <meta property='og:url' content='https://siabase-cv.web.app/' />
        <meta property='og:type' content='website' />
        <meta
          property='og:description'
          content='A free and open source resume builder that’s built to make the mundane tasks of creating, updating and sharing your resume as easy as writing alphabet.'
        />
        <meta
          property='og:image'
          content='https://siabase-cv.web.app/images/overview.png'
        />
      </Helmet>

      {children}

      <ModalRegistrar />
    </>
  );
};

export default memo(Wrapper);

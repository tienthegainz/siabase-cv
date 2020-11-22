import firebase from 'gatsby-plugin-firebase';
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
// import LocalResumeContext from '../../contexts/LocalResumeContext';
import CreateResume from '../../components/dashboard/CreateResume';
import ResumePreview from '../../components/dashboard/ResumePreview';
import TopNavbar from '../../components/dashboard/TopNavbar';
import LoadingScreen from '../../components/router/LoadingScreen';

const Dashboard = ({ user }) => {
  const { t } = useTranslation();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  // const { resumes: resumeList } = useContext(LocalResumeContext);

  useEffect(() => {
    const resumesRef = 'resumes';
    const socketRef = '/.info/connected';

    firebase
      .database()
      .ref(socketRef)
      .on('value', snapshot => {
        if (snapshot.val()) {
          setLoading(false);
          firebase.database().ref(socketRef).off();
        }
      });

    firebase
      .database()
      .ref(resumesRef)
      .orderByChild('user')
      .equalTo(user.uid)
      .on('value', snapshot => {
        if (snapshot.val()) {
          const resumesArr = [];
          const data = snapshot.val();
          Object.keys(data).forEach(key => resumesArr.push(data[key]));
          setResumes(resumesArr);
        }
        console.log(user, snapshot, snapshot.val())
      });

    firebase
      .database()
      .ref(resumesRef)
      .orderByChild('user')
      .equalTo(user.uid)
      .on('child_removed', snapshot => {
        if (snapshot.val()) {
          setResumes(resumes.filter(x => x.id === snapshot.val().id));
        }
      });

    return () => {
      firebase.database().ref(resumesRef).off();
    };
  }, [user]);

  // useEffect(() => {
  //   setResumes(resumeList);
  //   setLoading(false);
  // }, [resumeList]);

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <div style={{ padding: '10px 30px' }}>
      <Helmet>
        <title>
          {t('dashboard.title')} | {t('shared.appName')}
        </title>
        <link rel='canonical' href='https://siabase-cv.web.app/app/dashboard' />
      </Helmet>

      <TopNavbar />

      <div className='container mt-12 px-12 xl:px-0'>
        <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-8'>
          <CreateResume />

          {resumes.map(x => (
            <ResumePreview key={x.id} resume={x} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

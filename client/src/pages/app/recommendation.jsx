import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from '../../contexts/ResumeContext'
import firebase from 'gatsby-plugin-firebase';

const dataColor = [
  '#5875DB',
  '#8BC34A',
  '#FFEB3B',
  '#FF5722',
  '#673AB7',
  '#00BCD4',
  '#E91E63',
  '#009688'
];

const dataLanguage = [
  'ReactJs',
  'VueJs',
  'Angular',
  'NodeJS',
  'Express',
  'Python'
];

const dataVacancies = [
  'Fontend Developer',
  'Web FullStack Developer',
  'AI Research'
];

const Wrapper = styled.div`
  padding: 50px 20vw;
  display: flex;
  flex-direction: column;
`;

const TitleWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  font-size: 36px;
  font-weight: 500;
`;

const RecommendationWrapper = styled.div`
  border: 1px solid #ffbc42;
  border-radius: 40px;
  width: 100%;
  margin: 20px;
  display: flex;
  padding: 20px;
  &:hover {
    transform: scale(1.01);
  }
`;

const AvatarWrapper = styled.div`
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Avatar = styled.img`
  height: 140px;
  width: 140px;
  border-radius: 70px;
`;

const Right = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  padding-left: 20px;
`;

const Name = styled.div`
  font-size: 24px;
  font-weight: 500;
`;

const Description = styled.div`
  font-size: 14px;
`;

const ListProgramLanguage = styled.div`
  display: flex;
`;

const ProgramLanguageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  height: 30px;
  background-color: ${props => props.color};
  margin: 5px;
  padding: 10px;
`;

const ProgramLanguage = styled.div`
  font-size: 12px;
  font-weight: 300;
`;

const VacanciesWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const VacanciesTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

const Vacancies = styled.div`
  font-weight: 300;
`;

const renderVacancies = () => {
  let vacancies = '';
  dataVacancies.map((item, key) => {
    if (key === dataVacancies.length - 1) {
      vacancies += item;
    } else {
      vacancies += item + ', '
    }
  });
  return vacancies;
};

const RecommendationScreen = () => {
  const state = useSelector();
  useEffect(() => {
    const resumesRef = 'skills';
    firebase
      .database()
      .ref(resumesRef)
      .on('value', snapshot => {
        if (snapshot.val()) {
          console.log(snapshot.val())
        }
      });
  })
  return (
    <Wrapper>
      <TitleWrapper>
        <Title>Our Recommendation</Title>
      </TitleWrapper>
      <RecommendationWrapper>
        <AvatarWrapper>
          <Avatar
            alt=''
            src='https://cdn.itviec.com/employers/sun-inc/logo/social/cDcdNbGCaVV5xgnmz8Vfv4ed/framgia-inc-logo.jpg' 
          />
        </AvatarWrapper>
        <Right>
          <Name>Sun* Inc</Name>
          <Description>Cùng những con người đam mê thử thách, chúng tôi tạo ra thay đổi tích cực cho xã hội thông qua các sản phẩm và lĩnh vực kinh doanh.
          </Description>
          <ListProgramLanguage>
            {dataLanguage.map((item, key) => {
              return (
                <ProgramLanguageWrapper color={dataColor[key]}>
                  <ProgramLanguage>{item}</ProgramLanguage>
                </ProgramLanguageWrapper> 
              )}
            )}
          </ListProgramLanguage>
          <VacanciesWrapper>
            <VacanciesTitle>Vacancies |</VacanciesTitle>
            <Vacancies>{renderVacancies()}</Vacancies>
          </VacanciesWrapper>
        </Right>
      </RecommendationWrapper>
      <RecommendationWrapper>
        <AvatarWrapper>
          <Avatar
            alt=''
            src='https://cdn.itviec.com/employers/sun-inc/logo/social/cDcdNbGCaVV5xgnmz8Vfv4ed/framgia-inc-logo.jpg' 
          />
        </AvatarWrapper>
        <Right>
          <Name>Sun* Inc</Name>
          <Description>Cùng những con người đam mê thử thách, chúng tôi tạo ra thay đổi tích cực cho xã hội thông qua các sản phẩm và lĩnh vực kinh doanh.
          </Description>
          <ListProgramLanguage>
            {dataLanguage.map((item, key) => {
              return (
                <ProgramLanguageWrapper color={dataColor[key]}>
                  <ProgramLanguage>{item}</ProgramLanguage>
                </ProgramLanguageWrapper> 
              )}
            )}
          </ListProgramLanguage>
          <VacanciesWrapper>
            <VacanciesTitle>Vacancies |</VacanciesTitle>
            <Vacancies>{renderVacancies()}</Vacancies>
          </VacanciesWrapper>
        </Right>
      </RecommendationWrapper>
      
    </Wrapper>
  );
};

export default RecommendationScreen;

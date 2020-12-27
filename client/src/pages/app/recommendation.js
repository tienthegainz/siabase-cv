/* eslint-disable guard-for-in */
import React, { useEffect, useState, useContext } from 'react';
// import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import DatabaseContext from '../../contexts/DatabaseContext';
import TopNavbar from '../../components/recommendation/TopNavbar';

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
  border: 1px solid #2bc2d9;
  border-radius: 40px;
  width: 100%;
  margin: 20px;
  display: flex;
  padding: 20px;
  &:hover {
    transform: scale(1.01);
  }
`;

const CompanyAvatarWrapper = styled.div`
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CompanyAvatar = styled.img`
  height: 140px;
  width: 140px;
`;

const Right = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  padding-left: 20px;
`;

const Name = styled.div`
  font-size: 30px;
  font-weight: 500;
`;

const Description = styled.div`
  font-size: 20px;
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
  font-size: 20px;
  font-weight: 300;
  color: white;
`;

const VacanciesWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const VacanciesTitle = styled.div`
  font-size: 25px;
  font-weight: 500;
  color: #ff9900;
`;

const Vacancies = styled.div`
  font-weight: 300;
  font-size: 20px;
`;

const RecommendationScreen = ({ id }) => {
  const { getResume, getCompanies } = useContext(DatabaseContext);
  const [recommendation, setRecommendation] = useState([]);

  const { t } = useTranslation();

  useEffect(() => {
    const getRecommendCompanies = async () => {
      const resume = await getResume(id);
      const skills = resume.skills.items.map(val => {
        return { language: val.name, level: val.level };
      });

      const allCompaniesObj = await getCompanies();

      const allCompanies = [];
      // eslint-disable-next-line guard-for-in
      for (const key in allCompaniesObj) {
        const item = { id: key, ...allCompaniesObj[key] };
        const langs = [];
        for (const Lkey in item.requirements) {
          const a = { language: Lkey, level: item.requirements[Lkey] };
          langs.push(a);
        }
        item.requirements = langs;
        allCompanies.push(item);
      }

      const recomendCompanies = allCompanies.filter(val => {
        const r = val.requirements;
        let ok = false;

        // eslint-disable-next-line array-callback-return
        r.some(element => {
          skills.some(skill => {
            if (
              skill.language === element.language &&
              skill.level === element.level
            )
              ok = true;
            return true;
          });
        });
        return ok;
      });

      setRecommendation(recomendCompanies);
    };

    getRecommendCompanies();
  }, []);

  return (
    <div style={{ padding: '10px 30px' }}>
      <TopNavbar />
      <Wrapper>
        <TitleWrapper>
          <Title>{t('recommendation.title')}</Title>
        </TitleWrapper>
        {recommendation.map((val, idx) => (
          <RecommendationWrapper
            key={idx}
            onClick={() => {
              window.open(val.url, '_blank');
            }}
          >
            <CompanyAvatarWrapper>
              <CompanyAvatar alt={idx} src={val.avatar} />
            </CompanyAvatarWrapper>
            <Right>
              <Name>{val.name}</Name>
              <Description>{val.description}</Description>
              <ListProgramLanguage>
                {val.requirements.map((item, key) => {
                  return (
                    <ProgramLanguageWrapper color={dataColor[key]}>
                      <ProgramLanguage>{item.language}</ProgramLanguage>
                    </ProgramLanguageWrapper>
                  );
                })}
              </ListProgramLanguage>
              <VacanciesWrapper>
                <VacanciesTitle>
                  {t('recommendation.vacancies')} |
                </VacanciesTitle>
                <Vacancies>
                  {val.requirements.map(item => {
                    return `${item.language} ${item.level}, `;
                  })}
                </Vacancies>
              </VacanciesWrapper>
            </Right>
          </RecommendationWrapper>
        ))}
      </Wrapper>
    </div>
  );
};

export default RecommendationScreen;

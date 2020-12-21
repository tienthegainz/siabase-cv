import { map } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

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

const AvatarWrapper = styled.div`
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Avatar = styled.img`
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

const ListCompanies = ({ companies }) => {
  const { t } = useTranslation();
  return map(companies, (val, idx) => {
    const { requirements } = val;
    const data = map(requirements, (value, key) => {
      return {
        language: key,
        level: value
      };
    });
    return (
      <RecommendationWrapper
        key={idx}
        onClick={() => {
          window.open(val.url, '_blank');
        }}
      >
        <AvatarWrapper>
          <Avatar alt={idx} src={val.avatar} />
        </AvatarWrapper>
        <Right>
          <Name>{val.name}</Name>
          <Description>{val.description}</Description>
          <ListProgramLanguage>
            {data.map((item, key) => {
              return (
                <ProgramLanguageWrapper color={dataColor[key]} key={key}>
                  <ProgramLanguage>{item.language}</ProgramLanguage>
                </ProgramLanguageWrapper>
              );
            })}
          </ListProgramLanguage>
          <VacanciesWrapper>
            <VacanciesTitle>{t('recommendation.vacancies')} |</VacanciesTitle>
            <Vacancies>
              {data.map(item => {
                return `${item.language} ${item.level}, `;
              })}
            </Vacancies>
          </VacanciesWrapper>
        </Right>
      </RecommendationWrapper>
    );
  });
};

export default ListCompanies;

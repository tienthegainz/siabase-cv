import { map } from 'lodash';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useDispatch } from '../../contexts/ResumeContext';
import SettingsContext from '../../contexts/SettingsContext';
import { languages } from '../../i18n';

const Wrapper = styled.div`
  margin-left: 20px;
  display: flex;
  justify-content: space-between;
`;

const Input = styled.input`
  width: 200px !important;
  font-family: Arial !important;
  font-size: 14px !important;
  font-weight: normal;
  color: #575757;
  margin-top: 5px !important;
  height: 30px;
  border-radius: 10px;
  width: 100%;
  padding-left: 20px;
  border: 1px solid #2bc2d9;

  &:focus {
    outline: none !important;
  }
`;

const Dropdown = styled.select`
  width: ${props => `${props.width}px`} !important;
  font-family: Arial !important;
  font-size: 14px !important;
  font-weight: normal;
  color: #575757;
  margin-top: 5px !important;
  height: 30px;
  border-radius: 10px;
  width: 100%;
  border: 1px solid #2bc2d9;
  &:focus {
    outline: none !important;
  }
`;

const SearchInput = ({ onChangePageSize, onSearch }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { language, setLanguage } = useContext(SettingsContext);
  const handleChangeLanguage = e => {
    const lang = e.target.value;
    setLanguage(lang);
    dispatch({ type: 'change_language', payload: lang });
    // dispatch({ type: 'update_skynet_synced_status' });
  };
  return (
    <Wrapper>
      <Input
        placeholder={t('companies.placeholder')}
        onChange={e => onSearch(e.target.value)}
      />
      <Dropdown onChange={e => onChangePageSize(e.target.value)} width={50}>
        <option value={3}>3</option>
        <option value={5}>5</option>
      </Dropdown>
      <Dropdown
        width={200}
        onChange={handleChangeLanguage}
        defaultValue={language}
      >
        {map(languages, item => {
          return <option value={item.code}>{item.name}</option>;
        })}
      </Dropdown>
    </Wrapper>
  );
};

export default SearchInput;

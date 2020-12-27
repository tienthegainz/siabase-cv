import { values, size, chunk, includes, lowerCase, filter } from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import DatabaseContext from '../../contexts/DatabaseContext';
import TopNavbar from '../../components/dashboard/TopNavbar';
import ListCompanies from '../../components/companies/list';
import Pagination from '../../components/companies/pagination';
import SearchInput from '../../components/companies/search';
import { useTranslation } from 'react-i18next';

const Container = styled.div`
  margin: 50px 20vw;
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 24px;
`;

const Companies = () => {
  const { getCompanies } = useContext(DatabaseContext);
  const { t } = useTranslation();
  const [pageSize, setPageSize] = useState(3);
  const [totalPages, setTotalPages] = useState(0);
  const [companies, setCompanies] = useState([]);
  const [allCompanies, setAllCompanies] = useState([]);
  const [current, setCurrent] = useState(0);
  const [currentCompanies, setCurrentCompanies] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getCompanies();
      const newData = chunk(values(data), pageSize);
      setTotalPages(size(newData));
      setCurrentCompanies(newData[0]);
      setCompanies(newData);
      setAllCompanies(values(data));
    };
    getData();
  }, [pageSize]);

  useEffect(() => {
    setCurrentCompanies(companies[current]);
  }, [current]);

  const onChangePageSize = value => {
    // eslint-disable-next-line radix
    setPageSize(parseInt(value));
    setCurrent(0);
  };

  const onNext = () => {
    if (current + 1 < totalPages) {
      setCurrent(current + 1);
    }
  };

  const onBack = () => {
    if (current - 1 >= 0) {
      setCurrent(current - 1);
    }
  };

  const onSelect = value => {
    setCurrent(value);
  };

  const onSearch = value => {
    const names = filter(allCompanies, item => {
      if (includes(lowerCase(item.name), lowerCase(value))) {
        return item;
      }
    });
    const newData = chunk(names, pageSize);
    setTotalPages(size(newData));
    setCurrentCompanies(newData[0]);
    setCompanies(newData);
    setCurrent(0);
  };

  return (
    <>
      <TopNavbar />
      <Container>
        <Title>
          <div className='text-primary-900'>{t('companies.title')}</div>
        </Title>
        <SearchInput onChangePageSize={onChangePageSize} onSearch={onSearch} />
        <ListCompanies companies={currentCompanies} />
        <Pagination
          totalPages={totalPages}
          current={current}
          onNext={onNext}
          onBack={onBack}
          onSelect={onSelect}
        />
      </Container>
    </>
  );
};

export default Companies;

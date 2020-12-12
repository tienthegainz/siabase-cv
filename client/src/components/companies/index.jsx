import { chunk } from 'lodash';
import firebase from 'gatsby-plugin-firebase';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TopNavbar from '../dashboard/TopNavbar';
import SearchInput from './search';
import ListCompanies from './list';
import Pagination from './pagination';

const Container = styled.div`
  margin: 50px 20vw;
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 24px;
`;

const CompaniesScreen = ({
  totalPages,
  allKeys,
  firstKey,
  pageSize = 3,
  onChangePageSize
}) => {
  const [companies, setCompanies] = useState([]);
  const [current, setCurrent] = useState(0);
  const [startAtKey, setStartAtKey] = useState(firstKey);
  const pageKeyArr = chunk(allKeys, pageSize);

  useEffect(() => {
    firebase
      .database()
      .ref(`companies`)
      .orderByKey()
      .startAt(startAtKey)
      .limitToFirst(pageSize)
      .once('value')
      .then(res => {
        setCompanies(res.val());
      });
  }, [current, pageSize]);

  const onNext = () => {
    if (current + 1 < totalPages) {
      setCurrent(current + 1);
      const currentPage = pageKeyArr[current + 1];
      setStartAtKey(currentPage[0]);
    }
  };

  const onBack = () => {
    if (current - 1 >= 0) {
      setCurrent(current - 1);
      const currentPage = pageKeyArr[current - 1];
      setStartAtKey(currentPage[0]);
    }
  };

  const onSelect = value => {
    const selectPage = pageKeyArr[value];
    setStartAtKey(selectPage[0]);
    setCurrent(value);
  };

  return (
    <>
      <TopNavbar />
      <Container>
        <Title>
          <div className='text-primary-900'>List Companies</div>
        </Title>
        <SearchInput onChangePageSize={onChangePageSize} />
        <ListCompanies companies={companies} />
        <Pagination
          companies={companies}
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

export default CompaniesScreen;

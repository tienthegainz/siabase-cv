import { values } from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import ListCompanies from '../../components/companies/list';
import Pagination from '../../components/companies/pagination';
import SearchInput from '../../components/companies/search';
import DatabaseContext from '../../contexts/DatabaseContext';

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
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    getCompanies().then(res => {
      setCompanies(values(res));
    });
  }, []);

  return (
    <Container>
      <Title>
        <div className='text-primary-900'>List Companies</div>
      </Title>
      <SearchInput />
      <ListCompanies companies={companies} />
      <Pagination companies={companies} />
    </Container>
  );
};

export default Companies;

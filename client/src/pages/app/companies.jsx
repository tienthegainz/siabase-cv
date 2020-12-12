import { values, size, map, first } from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import DatabaseContext from '../../contexts/DatabaseContext';
import CompaniesScreen from '../../components/companies';

const Companies = () => {
  const { getCompanies } = useContext(DatabaseContext);
  const [firstKey, setFirstKey] = useState('');
  const [allKeys, setAllKeys] = useState([]);
  const [pageSize, setPageSize] = useState(2);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    getCompanies().then(res => {
      const allCompany = values(res);
      const allKeyCompany = map(res, (value, key) => key);
      setAllKeys(allKeyCompany);
      setFirstKey(first(allKeyCompany));
      setTotalPages(Math.ceil(size(allCompany) / pageSize));
    });
  }, [pageSize]);

  const onChangePageSize = value => {
    // eslint-disable-next-line radix
    setPageSize(parseInt(value));
  };

  return (
    <CompaniesScreen
      totalPages={totalPages}
      allKeys={allKeys}
      firstKey={firstKey}
      pageSize={pageSize}
      onChangePageSize={onChangePageSize}
    />
  );
};

export default Companies;

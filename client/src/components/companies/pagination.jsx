import { chunk, map, size } from 'lodash';
import React, { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const ItemWrapper = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 15px;
  border: 1px solid #ff9500;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.active && '#ff9500'};
  margin-left: 10px;
  cursor: pointer;
`;

const Pagination = ({ companies, sizePage = 3 }) => {
  const totalElements = size(companies);
  const totalPages = Math.ceil(totalElements / sizePage);
  const newData = chunk(companies, sizePage);
  const [current, setCurrent] = useState(0);
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
  return (
    <Wrapper>
      <ItemWrapper onClick={onBack}>{'<'}</ItemWrapper>
      {map(newData, (item, index) => {
        return (
          <ItemWrapper active={index === current}>{index + 1}</ItemWrapper>
        );
      })}
      <ItemWrapper onClick={onNext}>{'>'}</ItemWrapper>
    </Wrapper>
  );
};

export default Pagination;

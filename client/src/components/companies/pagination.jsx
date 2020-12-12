import { map } from 'lodash';
import React from 'react';
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

  &:hover {
    background-color: #ff9500;
  }
`;

const Pagination = ({ totalPages, current, onNext, onBack, onSelect }) => {
  return (
    <Wrapper>
      <ItemWrapper onClick={onBack}>{'<'}</ItemWrapper>
      {map([...Array(totalPages)], (item, index) => {
        return (
          <ItemWrapper
            active={index === current}
            key={index}
            onClick={() => onSelect(index)}
          >
            {index + 1}
          </ItemWrapper>
        );
      })}
      <ItemWrapper onClick={onNext}>{'>'}</ItemWrapper>
    </Wrapper>
  );
};

export default Pagination;

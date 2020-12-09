import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 200px;
  margin-left: 20px;
`;

const Input = styled.input`
  font-family: Arial !important;
  font-size: 14px !important;
  font-weight: normal;
  color: #575757;
  margin-top: 5px !important;
  height: 30px;
  border-radius: 10px;
  width: 100%;
  padding-left: 20px;
  border: 1px solid #ff9500;

  &:focus {
    outline: none !important;
  }
`;

const SearchInput = () => {
  return (
    <Wrapper>
      <Input placeholder='Nhập tên công ty' />
    </Wrapper>
  );
};

export default SearchInput;

import React from 'react';
import styled from 'styled-components';

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
  border: 1px solid #ff9500;

  &:focus {
    outline: none !important;
  }
`;

const Dropdown = styled.select`
  width: 50px !important;
  font-family: Arial !important;
  font-size: 14px !important;
  font-weight: normal;
  color: #575757;
  margin-top: 5px !important;
  height: 30px;
  border-radius: 10px;
  width: 100%;
  border: 1px solid #ff9500;
  &:focus {
    outline: none !important;
  }
`;

const SearchInput = ({ onChangePageSize }) => {
  return (
    <Wrapper>
      <Input placeholder='Nhập tên công ty' />
      <Dropdown onChange={e => onChangePageSize(e.target.value)}>
        <option value={3}>3</option>
        <option value={5}>5</option>
      </Dropdown>
    </Wrapper>
  );
};

export default SearchInput;

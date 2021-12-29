import React from 'react';
import { Input } from 'antd';

interface SearchBarProps {
  onSearch: (text: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  return (
    <Input.Search
      allowClear
      placeholder="Search by task name..."
      enterButton
      size="large"
      onSearch={onSearch}
      style={{ marginBottom: 12 }}
      // loading
    />
  );
};

export default SearchBar;

import React from 'react';
import PropTypes from 'prop-types';
import { SearchBar } from 'react-native-elements';

function BarraBusca(props) {
  if (props.show) {
    return (<SearchBar
      returnKeyType="search"
      lightTheme
      onChangeText={props.onSearch}
      placeholder="Insira o termo de busca..."
    />);
  }
  return null;
}
BarraBusca.propTypes = {
  show: PropTypes.bool,
  onSearch: PropTypes.func,
};

module.exports = BarraBusca;

import React, { Component } from 'react';
import { Text, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { StyleProvider, Container, Header, Title, Content, Button, Left, Right, Body, Icon, List, ListItem, Thumbnail } from 'native-base';
import getTheme from './native-base-theme/components';
import BarraBusca from './BarraBusca';
import Lista from './Lista';

/*const list = [{ titulo: 'Altenbruck', descricao: 'A cerveja de Feliz', img: require('../img/altenbruck.png') },
                  { titulo: 'Maniba', descricao: 'Cerveja Maniba', img: require('../img/maniba.png') },
];*/
let img = require('../../img/beer.png');

export default class TelaPrincipal extends Component {
  constructor(props) {
    super(props);
    this.state = { showSearch: false, filteredList: [] };
    this.fetchPage = this.fetchPage.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  componentDidMount() {
    this.fetchList();
  }
  async getBeersFromApi() {
    let url = 'http://prost.herokuapp.com/api/v1/beer/rand';
    try {
      let response = await fetch(url);
      let responseJson = await response.json();
      return responseJson;
    } catch(error) {
      console.error(error);
    }
  }
  async fetchPage() {
    return new Promise(async (resolve, reject) => {
      let page = [];
      for(let i=0; i < 20; i++) {
        let beers = await this.getBeersFromApi();
        page.push({ titulo: beers.title, descricao : beers.brewery ? beers.brewery.title : '', img : this.img});
      }
      resolve(page);
    });
  }
  fetchList() {
    for(let x=0; x < 5; x ++) {
      this.fetchPage().then((page) => {
        let newList = this.state.filteredList.concat(page);
        this.setState({ filteredList: newList });
      });
    }
    alert("Buscando dados...");
  }
  toggleSearch() {
    setTimeout(() => {
      this.setState({ showSearch: !this.state.showSearch });
    }, 10);
  }
  handleSearch(text) {
    const filteredList = list.filter(
      (i) => i.titulo.toLowerCase().indexOf(text.toLowerCase()) !== -1);
    this.setState({ filteredList });
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <StyleProvider style={getTheme()}>
        <Container>
          <Header style={{ backgroundColor: '#FF9800' }}>
            <Left>
              <Button transparent onPress={this.props.openDrawer}>
                <Icon name="menu" />
              </Button>
            </Left>
            <Body>
              <Title>iBeer</Title>
            </Body>
            <Right>
              <Button transparent onPress={this.toggleSearch}>
                <Icon name="search" />
              </Button>
            </Right>
          </Header>
          <Content style={{ backgroundColor: 'white' }}>
            <BarraBusca show={this.state.showSearch} onSearch={this.handleSearch}/>
            <Lista content={this.state.filteredList}/>
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}
TelaPrincipal.propTypes = {
  openDrawer: PropTypes.func.isRequired,
};

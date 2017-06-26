import { Font, AppLoading } from 'expo';
import React, { Component } from 'react';
import {
  AppRegistry,
  Linking,
  Platform,
} from 'react-native';
import { StackNavigator } from 'react-navigation';;
import TelaLogin from './src/components/TelaLogin';
import TelaCadastro from './src/components/TelaCadastro';
import TelaPrincipal from './src/components/TelaPrincipal';
import MenuLateral from './src/components/MenuLateral';

export default class iBeer extends Component {
  constructor(props) {
    super(props);
    this.state = { isLogged: false, fontsAreLoaded: false };
  }

  async componentWillMount() {
    await Font.loadAsync({
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf')
    });
    this.setState({ fontsAreLoaded: true });
  }

  componentDidMount() {
    Linking.addEventListener('url', (response) => console.log(response));
  }

  handleLogin(user, callback) {
    this.setState({ isLogged: true, user }, callback);
  }

  render() {
    if (this.state.fontsAreLoaded) {
      return <App/>
    }
    else
      return <AppLoading />;
  }
}

const App = StackNavigator({
  Login: { screen: TelaLogin },
  Cadastro: { screen: TelaCadastro },
  Home: { screen: MenuLateral },
}, {
    initialRouteName: 'Login',
    mode: Platform.OS === 'ios' ? 'modal' : 'card',
  });


AppRegistry.registerComponent('iBeer', () => iBeer);

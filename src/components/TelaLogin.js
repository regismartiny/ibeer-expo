import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { Container, Content, Form, Item, Input, Label } from 'native-base';
import { SocialIcon, Button } from 'react-native-elements';
import Auth from '../modules/auth';
import secrets from '../modules/secrets';

export default class TelaLogin extends Component {
  static navigationOptions = {
    title: 'Login',
    header: null
  };
  constructor(props) {
    super(props);
    this.state = { isLoadingGoogle: false, isLoadingTwitter: false, isLoadingFacebook: false,
                    user: { username: 'bruno.luz@gmail.com', password: '12345' } };
    this.login = this.login.bind(this);
    this.loginCallback = this.loginCallback.bind(this);
  }
  login(user) {
    this.props.navigation.navigate('Home', { user })
  }

  loginCallback(response) {
    this.setState({ loading: false });
    console.log(response);
    if (response) {
      if (response.body && response.body.access_token !== null) {
        this.login({ name: 'Usuario', img: '' });
      } else if (response.user) {
        this.login(response.user);
      }
    }
  }
  socialLogin(type) {
    switch (type) {
      case 'facebook':
        this.setState({ isLoadingFacebook: true, loading: true });
        Auth.socialAuth('facebook', secrets.facebook, this.loginCallback);
        break;
      case 'google':
        this.setState({ isLoadingGoogle: true, loading: true });
        Auth.socialAuth('google', secrets.google, this.loginCallback);
        break;
      default: break;
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Content>
          <View style={{ flex: 1, height: 100, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 40 }}>iBeer</Text>
          </View>
          <Form style={{ paddingBottom: 40 }}>
            <Item floatingLabel>
              <Label>Usuário</Label>
              <Input onChangeText={(text) => this.setState({ user: { username: text } })} value={this.state.user.username} />
            </Item>
            <Item floatingLabel last>
              <Label>Senha</Label>
              <Input secureTextEntry onChangeText={(text) => this.setState({ user: { password: text } })} value={this.state.user.password} />
            </Item>
          </Form>
          <Button
            icon={{ name: 'cached' }} title="Entrar" buttonStyle={{ marginBottom: 5 }}
            Component={TouchableOpacity}
            onPress={() => Auth.ibeerAuth(this.state.user.username, this.state.user.password, this.loginCallback)}
          />
          <Button
            icon={{ name: 'cached' }} title="Cadastrar" buttonStyle={{ marginBottom: 40 }}
            Component={TouchableOpacity}
            onPress={()=>{navigate('Cadastro')}}
          />
          <SocialIcon
            title="Entrar com Facebook"
            button
            type="facebook"
            loading={this.state.loading && this.state.isLoadingFacebook}
            onPress={() => this.socialLogin('facebook')}
          />
          <SocialIcon
            title="Entrar com Google"
            button
            type="google"
            style={{ backgroundColor: '#DD4B39' }}
            loading={this.state.loading && this.state.isLoadingGoogle}
            onPress={() => this.socialLogin('google')}
          />
        </Content>
      </Container>
    );
  }
}
TelaLogin.propTypes = {

};

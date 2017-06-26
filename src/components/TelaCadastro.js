import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity, Alert, DatePickerAndroid, TextInputState } from 'react-native';
import { Container, Content, Form, Item, Input, Label } from 'native-base';
import { SocialIcon, Button } from 'react-native-elements';

export default class TelaCadastro extends Component {
  static navigationOptions = {
    title: 'Cadastro',
  };

  constructor(props) {
    super(props);
    this.state = { dtNasc: '' };
    this.handleCadastrar = this.handleCadastrar.bind(this);
    this.handleDateFocus = this.handleDateFocus.bind(this);
  }

  async handleDateFocus() {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: new Date(2000, 4, 25)
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        let date = day + '/' + (month + 1) + '/' + year;
        this.setState({ dtNasc: date });
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  }

  handleCadastrar() {
    alert('nome: ' + this.state.nome + '\nemail:' + this.state.email);
    this.props.onForward();
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container style={{ backgroundColor: '#FFF' }}>
        <Content>
          <Form style={{ paddingBottom: 40 }}>
            <Item floatingLabel>
              <Label>Nome</Label>
              <Input keyboardType="email-address" onChangeText={(text) => this.setState({ nome: text })}
                returnKeyType='next' blurOnSubmit={false} />
            </Item>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input onChangeText={(text) => this.setState({ email: text })} ref="email"
                returnKeyType='next' blurOnSubmit={false} />
            </Item>
            <Item floatingLabel>
              <Label>Senha</Label>
              <Input secureTextEntry={true} onChangeText={(text) => this.setState({ pass: text })} ref="pass"
                returnKeyType='next' blurOnSubmit={false} />
            </Item>
            <Item floatingLabel last>
              <Label>Data Nascimento</Label>
              <Input value={this.state.dtNasc} onFocus={this.handleDateFocus} ref="dt"
                returnKeyType='done' blurOnSubmit={false} />
            </Item>
          </Form>
          <Button icon={{ name: 'cached' }} title='Cadastrar' buttonStyle={{ marginBottom: 40 }}
            Component={TouchableOpacity}
            onPress={this.handleCadastrar} />
        </Content>
      </Container>
    );
  }
}

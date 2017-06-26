import { Alert } from 'react-native';
import * as simpleAuthProviders from 'react-native-simple-auth';

export default class Auth {

  static socialAuth(provider, opts, callback) {
    simpleAuthProviders[provider](opts)
      .then((info) => {
        callback(info);
      })
      .catch((error) => {
        Alert.alert('Erro de autorização', error.message);
        callback(false);
      });
  }

  static ibeerAuth(usuario, senha, callback) {
    const MOCK = true;

    if (!MOCK) {
    const url = 'http://jbosswildfly-luztech.rhcloud.com/ibeer-cadastro/rest/login';
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        usuario,
        senha,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        callback(responseJson);
      })
      .catch((error) => {
        Alert.alert('Erro de autorização', error.message);
        callback(false);
      });
    }else {
      callback({body:{access_token:'123456'}});
    }
  }
}

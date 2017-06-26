import React from 'react';
import PropTypes from 'prop-types';
import { Text, Alert } from 'react-native';
import { Button, Left, Right, Body, List, ListItem, Thumbnail } from 'native-base';


function Lista(props) {
  return (
    <List containerStyle={{ marginBottom: 20 }}>
      {
        !props.content ? null : props.content.map((l, i) => (
          <ListItem thumbnail key={i}>
            <Left>
              <Thumbnail square size={80} source={l.img} />
            </Left>
            <Body>
              <Text>{l.titulo}</Text>
              <Text note>{l.descricao}</Text>
            </Body>
            <Right>
              <Button transparent onPress={() => Alert.alert(`Pagina ${l.titulo}`)}>
                <Text>Ver</Text>
              </Button>
            </Right>
          </ListItem>
        ))
      }
    </List>);
}
Lista.propTypes = {
  content: PropTypes.array,
};

module.exports = Lista;

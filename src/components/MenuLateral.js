import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import TelaPrincipal from './TelaPrincipal';
import Drawer from 'react-native-drawer';

const list = [
  { avatar_url: require('../../img/outlets.png'), name: 'Cervejarias', subtitle: 'Lista de Cervejarias' },
  { avatar_url: require('../../img/beers.png'), name: 'Cervejas', subtitle: 'Lista de Cervejas' },
];


export default class MenuLateral extends Component {
  static navigationOptions = {
    title: 'Home',
    header: null
  };

  constructor() {
    super();
    this.handleOpenDrawer = this.handleOpenDrawer.bind(this);
    this.handleCloseDrawer = this.handleCloseDrawer.bind(this);
  }
  handleOpenDrawer() {
    this.drawer.open();
  }
  handleCloseDrawer() {
    this.drawer.close();
  }
  render() {
    const { params } = this.props.navigation.state;
    let drawerContent = (<View style={{ flex: 1, backgroundColor: '#FFF3E0' }}>
      <List containerStyle={{ marginBottom: 20 }}>
        <ListItem
          roundAvatar
          hideChevron
          titleStyle={{ fontSize: 18 }}
          avatar={params.user.img || ''}
          title={params.user.name || ''}
        />
      </List>
      <List containerStyle={{ marginBottom: 20 }}>
        {
          list.map((l, i) => (
            <ListItem
              roundAvatar
              onPress={this.handleCloseDrawer}
              avatar={l.avatar_url}
              key={i}
              title={l.name}
              subtitle={l.subtitle}
            />
          ))
        }
      </List>
    </View>);

    return (
      <Drawer
        ref={c => this.drawer = c}
        type="displace"
        captureGestures
        side="left"
        content={drawerContent}
        tapToClose
        acceptDoubleTap
        openDrawerOffset={0.4} // 40% gap on the right side of drawer
        panCloseMask={0.4}
        panThreshold={0.25}
        panOpenMask={0.05}
        negotiatePan
        closedDrawerOffset={-3}
        styles={drawerStyles}
        tweenHandler={(ratio) => ({
          main: { opacity: (2 - ratio) / 2 },
        })}
      >
        <TelaPrincipal openDrawer={this.handleOpenDrawer} navigation={this.props.navigation}/>
      </Drawer>
    );
  }
}
MenuLateral.propTypes = {
  
};

const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3 },
  main: { paddingLeft: 3 },
};

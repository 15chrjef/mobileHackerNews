import React from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import {
    Notifications
} from 'exponent';
import {
    StackNavigation,
    TabNavigation,
    TabNavigationItem
} from '@exponent/ex-navigation';
import {
  FontAwesome,
} from '@exponent/vector-icons';

const Colors =   {
  tintColor: '#2f95dc',
  tabIconDefault: '#888',
  tabIconSelected: '#fefefe',
  tabBar: '#FF5722',
  errorBackground: 'red',
  errorText: '#fff',
  warningBackground: '#EAEB5E',
  warningText: '#666804',
  noticeBackground: '#2f95dc',
  noticeText: '#fff',
}

export default class RootNavigation extends React.Component{
    render() {
        return (
            <TabNavigation
                tabBarHeight={56}
                initialTab='home'
                tabBarColor={Colors.tabBar}
                >
                <TabNavigationItem
                    id='home'
                    renderIcon={isSelected => this._renderIcon('newspaper-o', isSelected)}
                    >
                    <StackNavigation initialRoute='home'/>
                </TabNavigationItem>
                <TabNavigationItem
                    id='about'
                    renderIcon={isSelected => this._renderIcon('handshake-o', isSelected)}
                    >
                    <StackNavigation initialRoute='about'/>
                </TabNavigationItem>
            </TabNavigation>
        )
    }
     _renderIcon(name, isSelected) {
      return (
        <FontAwesome
          name={name}
          size={32}
          color={isSelected ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
      );
    }
}


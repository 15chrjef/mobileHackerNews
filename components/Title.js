import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
const width = Dimensions.get('window').width;

export default class Title extends React.Component {
  render() {
    return (
      <View style={styles.title}>
        <View style={styles.statusPadding}></View>
        <Text style={styles.titleText}>Hacker News App</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  titleText: {
    color: 'white',
    fontSize: 20
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF5722',
    flex: 1.2,
    width: width 
  },
  statusPadding: {
    padding: 10
  }
})
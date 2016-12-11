import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
const {height, width} = Dimensions.get('window');
import Title from '../components/Title'

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Title/>
        <View style={styles.body}>
          <Text>Body</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 10,
  }
});
import Exponent from 'exponent';
import React from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import Title from '../components/Title.js'
export default class AboutScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Title/>
        <View style={styles.body}>
          <Text>Profile</Text>
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
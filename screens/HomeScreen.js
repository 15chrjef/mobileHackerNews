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
import axios from 'axios'
export default class HomeScreen extends React.Component {
  constructor(){
    super()
    this.state = {
      stories: ''
    }
  }
   componentWillMount(){ 
     let self = this;
     fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
      .then((responseJson) => {
        return ((JSON.parse(responseJson._bodyInit)).slice(0,10))
      })
      .then( async function(stories) {
        let myStories = [];
        for(var i = 0; i < stories.length; i++) {
          await fetch(`https://hacker-news.firebaseio.com/v0/item/${stories[i]}.json?print=pretty`)
          .then(async (response) => {
            await myStories.push((response._bodyInit))
          })
        }
          console.log('myStories', myStories)
        self.setState({
          stories: myStories
        })  
        console.log(self.state)
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    if(this.state.stories !== ''){  
      console.log('stories', this.state.stories)
      return (
        <View style={styles.container}>
          <Title/>
          <View style={styles.body}>
            <View>
              <Text style={styles.screenHeader}>Top Stories</Text>
            </View>
            <View>
              <Text>
                {this.state.stories}
              </Text>
            </View>
          </View>
        </View>
      );
    } else {
      return (
           <View style={styles.container}>
          <Title/>
          <View style={styles.body}>
            <View>
              <Text style={styles.screenHeader}>Loading...</Text>
            </View>
          </View>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 10,
  },
  story: {
    width: width,
    height: 30
  },
  screenHeader: {
    fontSize: 20
  }
});
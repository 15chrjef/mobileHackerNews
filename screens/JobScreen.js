import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ListView,
  TouchableOpacity,
  Linking
} from 'react-native';
const {height, width} = Dimensions.get('window');
import Title from '../components/Title.js'

export default class JobScreen extends React.Component {
   constructor(){
    super()
    this.state = {
      stories: '' 
    }
  }
  goToLink(link){

  }
   componentWillMount(){ 
     let self = this;
     fetch('https://hacker-news.firebaseio.com/v0/jobstories.json?print=pretty')
      .then((response) => {
        return ((JSON.parse(response._bodyInit)).slice(0,10))
      })
      .then( async function(stories) {
        let myStories = [];
        for(var i = 0; i < stories.length; i++) {
          await fetch(`https://hacker-news.firebaseio.com/v0/item/${stories[i]}.json?print=pretty`)
          .then(async (response) => {
            await myStories.push((JSON.parse(response._bodyInit)))
          })
        }
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        self.setState({
          stories: ds.cloneWithRows(myStories)
        })  
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    if(this.state.stories !== ''){  
      return (
        <View style={styles.container}>
          <Title/>
          <View style={styles.body}>
            <View>
              <Text style={styles.screenHeader}>Job Stories</Text>
            </View>
            <View style={styles.news}>
              <ListView 
                dataSource={this.state.stories}
                renderRow={(rowData, sectionId, rowId) => (
                  <View style={styles.newsRow}>
                    <View style={styles.linkRow}>
                      <Text>{Number(rowId) + 1}. Title: </Text>
                      <TouchableOpacity 
                        onPress={function(){Linking.openURL(rowData.url).catch(err => console.error('An error occurred', err))}}
                        >
                        <Text style={styles.link}>
                           {rowData.title}
                        </Text>
                      </TouchableOpacity>
                    </View>
                      <Text>{`    `}Author: {rowData.by} Score: {rowData.score}</Text>
                  </View>
                )}
                />   
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
    alignItems: 'center'
  },
  story: {
    width: width,
    height: 30
  },
  screenHeader: {
    fontSize: 20
  },
  linkRow: {
    flexDirection: 'row'
  },
  news: {
    marginTop: 10,
    width: width * .9
  },
  newsRow: {
    marginTop: 10
  },
  link: {
    color: 'blue',
    textDecorationLine : 'underline'
  }
});
import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ListView,
  TouchableOpacity,
  Linking,
  WebView,
  StatusBar,
  RefreshControl,
} from 'react-native';
const {height, width} = Dimensions.get('window');
import Title from '../components/Title'
export default class HomeScreen extends React.Component {
  constructor(){
    super()
    this.state = {
      stories: '' ,
      webUrl: '',
      refreshing: false
    }
    this.fetchData = this.fetchData.bind(this)
    this._onRefresh = this._onRefresh.bind(this);
  }
  componentWillMount(){ 
    this.fetchData()
  }
  fetchData(){
    let self = this;
     fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
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
        if(self.state.refreshing === true) {
          self.setState({refreshing: false});
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  _onRefresh() {
    var self = this;
    this.setState({refreshing: true});
    this.fetchData()
  }
  render() {
    let self = this;
    if(this.state.stories !== '' && this.state.webUrl === ''){  
      return (
        <View style={styles.container}>
        <StatusBar   
          setBackgroundColor="black"
          barStyle="light-content"     
        />
          <Title/>
          <View style={styles.body}>
            <View>
              <Text style={styles.screenHeader}>Top Stories</Text>
            </View>
            <View style={styles.news}>
              <ListView 
                contentInset={{bottom:30}}
                dataSource={this.state.stories}
                renderFooter={() => <View style={styles.footer}></View>}
                refreshControl={
                  <RefreshControl
                    refreshing={self.state.refreshing}
                    onRefresh={self._onRefresh}
                  />
                }
                renderRow={(rowData, sectionId, rowId) => (
                  <View style={styles.newsRow}>
                    <View style={styles.linkRow}>
                      <Text >
                        {Number(rowId) + 1}. Title:{` `}
                      </Text>
                      <TouchableOpacity 
                        onPress={function(){ self.setState({webUrl: rowData.url}) }}
                        >
                        <Text style={styles.link}>
                          {rowData.title}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <Text>{`    `}Author: {rowData.by}{`  `} Score: {rowData.score}</Text>
                  </View>
                )}
                />   
            </View>
          </View>
        </View>
      );
    } else if ( this.state.webUrl !== '') {
      return (
        <View style={styles.container}>
         <WebView
            ref={'webview'}
            automaticallyAdjustContentInsets={false}
            style={styles.webView}
            source={{uri: this.state.webUrl}}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            decelerationRate="normal"
            startInLoadingState={true}
            scalesPageToFit={this.state.scalesPageToFit}
            />
          <TouchableOpacity style={styles.goBack} onPress={function(){ self.setState({
            webUrl: ''
          })}}>
            <Text>Go Back To App</Text>
          </TouchableOpacity>
        </View>
      )
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
    flexDirection: 'row',
    overflow: 'scroll',
  },
  news: {
    marginTop: 10,
    width: width * .9,
  },
  newsRow: {
    marginTop: 10  
  },
  link: {
    color: 'blue',
    textDecorationLine : 'underline',
    width: width * .7,
  },
  goBack: {
    backgroundColor: 'rgba(200, 200, 200, .9)',
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    flex: .07
  },
  webView: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    height: height,
    width: width
  },
  footer: {
    paddingBottom: 50
  }
});
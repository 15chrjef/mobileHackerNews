import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ListView,
  TouchableOpacity,
	RefreshControl
} from 'react-native';
const {height, width} = Dimensions.get('window');
import Title from '../components/Title.js'

export default class AskScreen extends React.Component {
	constructor(){
		super()
		this.state = {
			stories:'',
			refreshing: false
		}
		this._onRefresh = this._onRefresh.bind(this);
		this.fetchData = this.fetchData.bind(this);
	}
	componentWillMount(){ 
    this.fetchData()
  }
	fetchData(){
		var self = this;
		fetch('https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty')
		.then(function(response) {
			return 'askStoriesaskStoriesaskStories', JSON.parse(response._bodyInit).slice(0,10)
		})
		.then(async function(stories) {
			var askStories = [];
			for(var i = 0; i < stories.length; i++) {
				await fetch(`https://hacker-news.firebaseio.com/v0/item/${stories[i]}.json?print=pretty`)
				.then(async function(story) {
					await askStories.push(JSON.parse(story._bodyInit))
				})
			}
			const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
			self.setState({
				stories: ds.cloneWithRows(askStories)
			})
			if(self.state.refreshing === true) {
				self.setState({refreshing: false});
			}
		})
		.catch(function(err){
			console.log('errrorrr', err)
		})
	}
	_onRefresh() {
    var self = this;
    this.setState({refreshing: true});
    this.fetchData()
  }
	render(){
		let self = this;
		if(this.state.stories !== '') {
			return(
				<View style={styles.container}>
					<Title/>
					<View style={styles.body}>
						<Text style={styles.screenHeader}>Ask Stories</Text>
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
										<Text>{Number(rowId) + 1}).</Text> 
										<Text style={styles.title}>{rowData.title.slice(7)}</Text>
									</View>
									<Text>Additional Question: {rowData.text}</Text>
								</View>
							)}
						/>
					</View>
				</View>
			)
		} else {
			return (
				<View style={styles.container}>
					<Title/>
					<View style={styles.body}>
						<Text style={styles.screenHeader}>Loading...</Text>
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
		width: width * .8
  },
	title: {
		fontWeight: 'bold'
	},
  newsRow: {
    marginTop: 10,
		width: width * .9
  },
  link: {
    color: 'blue',
    textDecorationLine : 'underline'
  },
	footer: {
		paddingBottom: 30
	}
});
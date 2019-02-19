'use strict';
import React,{Component} from 'react';
import { StyleSheet, Text, View, FlatList, Image, Time, Date, String, Platform, Dimensions } from 'react-native';
import { List, ListItem, SearchBar, ActivityIndicator } from 'react-native-elements';
import moment from 'moment';

const {height,width} = Dimensions.get('window');

export default class FlatListDemo2 extends Component {

  static navigationOptions = {
    title: 'Facbook Like Feed',
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
      arrayHolder: [],
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const { page, seed } = this.state;
    const url = `https://api.androidhive.info/feed/feed.json`;
    this.setState({ loading: true });
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: page === 1 ? res.feed : [...this.state.data, ...res.feed],
          error: res.error || null,
          loading: false,
          refreshing: false
        });
        this.arrayHolder = res.feed;
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };
  
  calculateTime(timeEnd) {

    console.log(timeEnd);
    
    var timeNow = moment();

    var endDate = timeNow-timeEnd;
    
    var timeNow = moment();

    return moment(endDate).format('HH');
  }

  render() {
    return (

    <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
      
      <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', height:44, backgroundColor:'#3b5998', width:width}}>
        <Text style={{marginLeft:10, color:'white', fontSize:18, fontWeight:'bold'}}>Facebook Like Feed</Text>
        <Image source={require('./images/menu.png')} style={{height:25,width:25}}/>
      </View>

      <FlatList
        data={this.state.data}
        renderItem={({ item }) => (
          <View style={{backgroundColor: "#b3ccff"}}>
            
            <View style={{backgroundColor:'white', flexDirection:'row', marginLeft:10,marginRight:10,marginTop:10}}>
              <Image style={{width: 50, height: 50, marginLeft:10}}
                source={{uri: item.image}}
              />
              <View style={{marginLeft:10}}>
                <Text style={{fontSize:15, fontWeight:'bold'}}>{item.name}</Text>
                <Text style={{fontSize:13, color:'gray'}}>{this.calculateTime(item.timeStamp)} hours ago</Text>
              </View>              
            </View>
              
            <View style={{backgroundColor:'white', marginLeft:10,marginRight:10,marginBottom:10}}>
              <Text style={{textAlign:'justify',marginLeft:10,marginRight:10,marginTop:10}}>{item.status}</Text>
              <Image style={{width: width*.95, height: 100, marginTop:10}}
                source={{uri: item.profilePic}}
              />
            </View>
          </View>
        )}
        keyExtractor={item => item.id}        
        refreshing={this.state.refreshing}
      />
    </List>   
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

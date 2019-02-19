import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { List, ListItem, SearchBar, ActivityIndicator } from 'react-native-elements';
import { createStackNavigator, createAppContainer } from "react-navigation";

const {height,width} = Dimensions.get('window');

export default class PopulationTable extends Component {
  
  static navigationOptions = {
    title: 'Population Table',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  constructor(props) {
    super(props);

    this.state = {
      females: 0,
      country: 'nil',
      age:0,
      males: 0,
      year:2019,
      total:0,
      callUrl:'http://api.population.io:80/1.0/population',
      url1:'nil',

      loading: false,
      data: [],
      data2:'',
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
      arrayHolder: [],
    };
  }

  componentDidMount() {
    this.setState( {country: this.props.navigation.state.params.countryName} );

    const itemData = `${this.state.callUrl}/${this.state.year}/${this.props.navigation.state.params.countryName}`;
    this.state.callUrl = itemData;

    this.makeRemoteRequest2();

  }

  makeRemoteRequest2 = () => {
    const url = this.state.callUrl;
    fetch(url, {
         method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
         console.log(responseJson);
         this.setState({
            data: responseJson
         })
      })
      .catch((error) => {
         console.error(error);
      });    
  };

  makeRemoteRequest = () => {
    const { page, seed } = this.state;
    const url = this.state.callUrl;

    this.setState({ loading: true });
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: page === 1 ? res.countries : [...this.state.data, ...res.countries],
          error: res.error || null,
          loading: false,
          refreshing: false,
        });
        this.arrayHolder = res.countries;
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  }

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  }

  handleRefresh = () => {
    this.setState({ 
      page:1,
      refreshing:true,
      seed:this.state.seed+1 });
  }

  render() {

    return (
     
     <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
      <FlatList

        data={this.state.data}
        renderItem={({ item }) => (

        <View style={{backgroundColor:'#ffd699'}}>  
        
        <View style={{flexDirection:'row',   justifyContent:'space-evenly', height:30, width:width*0.8, left:width/2 - (width*0.8)/2,}}>
          <Text style={{color:'black', height:60, width:100, fontSize:15, fontWeight:'bold'}}>Age: </Text>
          <Text style={{color:'black', height:60, width:100, fontSize:15, fontWeight:'bold'}}>{`${item.age}`} </Text>
        </View>
        <View style={{flexDirection:'row',  justifyContent:'space-evenly', height:40, width:width*0.8, left:width/2 - (width*0.8)/2,}}>
          <Text style={{color:'black', height:60, width:100, fontSize:15, fontWeight:'bold'}}>Country: </Text>
          <Text style={{color:'black', height:60, width:100, fontSize:15, fontWeight:'bold'}}>{`${item.country}`} </Text>
        </View>
        <View style={{flexDirection:'row',  justifyContent:'space-evenly', height:30, width:width*0.8, left:width/2 - (width*0.8)/2,}}>
          <Text style={{color:'black', height:60, width:100, fontSize:15, fontWeight:'bold'}}>Females: </Text>
          <Text style={{color:'black', height:60, width:100, fontSize:15, fontWeight:'bold'}}>{`${item.females}`} </Text>
        </View>
        <View style={{flexDirection:'row',   justifyContent:'space-evenly', height:30, width:width*0.8, left:width/2 - (width*0.8)/2,}}>
          <Text style={{color:'black', height:60, width:100, fontSize:15, fontWeight:'bold'}}>Males: </Text>
          <Text style={{color:'black', height:60, width:100, fontSize:15, fontWeight:'bold'}}>{`${item.males}`} </Text>
        </View>
        <View style={{flexDirection:'row',  justifyContent:'space-evenly', height:30, width:width*0.8, left:width/2 - (width*0.8)/2,}}>
          <Text style={{color:'black', height:60, width:100, fontSize:15, fontWeight:'bold'}}>Total: </Text>
          <Text style={{color:'black', height:60, width:100, fontSize:15, fontWeight:'bold'}}>{`${item.total}`} </Text>
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-evenly', height:30, width:width*0.8, left:width/2 - (width*0.8)/2,}}>
          <Text style={{color:'black', height:60, width:100, fontSize:15, fontWeight:'bold'}}>Year: </Text>
          <Text style={{color:'black', height:60, width:100, fontSize:15, fontWeight:'bold'}}>{`${item.year}`} </Text>
        </View>

        </View>


          
        )}
        keyExtractor={item => item}
        ItemSeparatorComponent={this.renderSeparator}
        ListFooterComponent={this.renderFooter}
        refreshing={this.state.refreshing}
        onRefresh={this.handleRefresh}
      />
    </List>

    );
  }
}

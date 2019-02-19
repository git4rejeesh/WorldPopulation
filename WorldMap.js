'use strict';
import React,{Component} from 'react';
import { StyleSheet, Alert, Text, View, FlatList, Image, Platform } from 'react-native';
import { List, ListItem, SearchBar, ActivityIndicator } from 'react-native-elements';
import { createStackNavigator, createAppContainer } from "react-navigation";
import PopulationTable from './PopulationTable';

 class WorldMap extends Component {

  static navigationOptions = {
    title: 'World Map',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      textAlign: 'center',
      flex:1,
    },
    
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
    const url = `http://api.population.io:80/1.0/countries`;
    this.setState({ loading: true });
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: page === 1 ? res.countries : [...this.state.data, ...res.countries],
          error: res.error || null,
          loading: false,
          refreshing: false
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

  searchFilterFunction = text => {    
  const newData = this.arrayHolder.filter(item => {      
    const itemData = `${item}`;
     const textData = text.toUpperCase();
      
     return itemData.indexOf(textData) > -1;    
    });    
    this.setState({ data: newData });  
  };

  renderHeader = () => {
    return <SearchBar placeholder="Type Here..." 
            lightTheme round
            onChangeText={text => this.searchFilterFunction(text)}
            autoCorrect={true}  />;
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
          <ListItem
            
            title={`${item}`}
            titleStyle={{  fontWeight: 'bold' }}
            onPress={() => { this.props.navigation.navigate('PopulationTable', {countryName: `${item}`}) } }

            containerStyle={{ borderBottomWidth: 0 }}
          />
        )}
        keyExtractor={item => item}
        ItemSeparatorComponent={this.renderSeparator}
        ListHeaderComponent={this.renderHeader}
        ListFooterComponent={this.renderFooter}
        refreshing={this.state.refreshing}
        onRefresh={this.handleRefresh}
      />
    </List>   
    );
  }
}

const AppNavigator = createStackNavigator({  
  WorldMap:WorldMap,
  PopulationTable:PopulationTable,
});

export default createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
